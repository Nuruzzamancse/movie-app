import { Request, Response, NextFunction } from "express";
import Favorite from "../models/Favorite";
import Movie from "../models/Movie";
import asyncHandler from "../utils/asyncHandler";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

// @desc    Add movie to favorites
// @route   POST /api/v1/favorites
// @access  Private
export const addFavorite = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { movieId } = req.body;

    // Check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      movie: movieId,
    });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ success: false, message: "Movie already in favorites" });
    }

    const favorite = await Favorite.create({
      user: req.user.id,
      movie: movieId,
    });

    const favoriteData = await Favorite.findById(favorite._id).populate(
      "movie"
    );

    res.status(201).json({ success: true, data: favoriteData });
  }
);

// @desc    Remove movie from favorites
// @route   DELETE /api/v1/favorites/:id
// @access  Private
export const removeFavorite = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const favorite = await Favorite.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!favorite) {
      return res
        .status(404)
        .json({ success: false, message: "Favorite not found" });
    }

    await favorite.deleteOne();

    res.status(200).json({ success: true, data: {} });
  }
);

// @desc    Get user's favorites
// @route   GET /api/v1/favorites
// @access  Private
export const getFavorites = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const favorites = await Favorite.find({ user: req.user.id }).populate(
      "movie"
    );

    res
      .status(200)
      .json({ success: true, count: favorites.length, data: favorites });
  }
);
