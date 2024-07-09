import { Request, Response, NextFunction } from "express";
import Movie from "../models/Movie";
import asyncHandler from "../utils/asyncHandler";

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getMovies = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const movies = await Movie.find();
    res.status(200).json({ success: true, count: movies.length, data: movies });
  }
);

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
export const getMovie = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, data: movie });
  }
);

// @desc    Create new movie
// @route   POST /api/movies
// @access  Private (Admin only)
export const createMovie = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const movie = await Movie.create(req.body);
    res.status(201).json({ success: true, data: movie });
  }
);

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private (Admin only)
export const updateMovie = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: movie });
  }
);

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private (Admin only)
export const deleteMovie = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    await movie.deleteOne();
    res.status(200).json({ success: true, data: {} });
  }
);
