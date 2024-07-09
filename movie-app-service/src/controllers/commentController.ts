import { Request, Response, NextFunction } from "express";
import Comment from "../models/Comment";
import Movie from "../models/Movie";
import asyncHandler from "../utils/asyncHandler";

interface User {
  id: string;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

// @desc    Add comment to a movie
// @route   POST /api/v1/movies/comments?movieId={movieId}
// @access  Private
export const addComment = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { movieId } = req.query;
    const { text } = req.body;

    // Check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    const comment = await Comment.create({
      text,
      movie: movieId,
      user: req.user.id,
    });

    const commentData = await Comment.findById(comment._id).populate({
      path: "user",
      select: "name",
    });

    res.status(201).json({ success: true, data: commentData });
  }
);

// @desc    Get comments for a movie
// @route   GET /api/v1/movies/comments?movieId={movieId}
// @access  Public
export const getMovieComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { movieId } = req.query;

    const comments = await Comment.find({ movie: movieId }).populate({
      path: "user",
      select: "name",
    });

    res
      .status(200)
      .json({ success: true, count: comments.length, data: comments });
  }
);

// @desc    Update comment
// @route   PUT /api/v1/comments/:id
// @access  Private
export const updateComment = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // Make sure user is comment owner
    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this comment",
      });
    }

    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: comment });
  }
);

// @desc    Delete comment
// @route   DELETE /api/v1/comments/:id
// @access  Private
export const deleteComment = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // Make sure user is comment owner or admin
    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this comment",
      });
    }

    await comment.deleteOne();

    res.status(200).json({ success: true, data: {} });
  }
);