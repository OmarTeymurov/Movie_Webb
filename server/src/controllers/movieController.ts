import type { Request, Response, NextFunction } from 'express';
import { Movie } from '../models/movieModel';

// Higher-order function to handle async routes and catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const getMovies = asyncHandler(async (req: Request, res: Response) => {
  const movies = await Movie.find({});
  res.json(movies);
});

export const getMovieById = asyncHandler(async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id).populate('reviews.user', 'name');
  if (!movie) {
    return res.status(404).json({ message: "Film tapılmadı" });
  }
  res.json(movie);
});

export const createMovieReview = asyncHandler(async (req: Request, res: Response) => {
  const { rating, comment, userId } = req.body;
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Film tapılmadı" });
  }

  const review = {
    user: userId,
    rating: Number(rating),
    comment,
  };

  movie.reviews.push(review as any);

  // Calculate new average rating
  const totalRating = movie.reviews.reduce((acc, item) => acc + item.rating, 0);
  movie.rating = totalRating / movie.reviews.length;
  
  await movie.save();
  res.status(201).json({ message: "Şərh əlavə edildi" });
});

export const deleteMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Film tapılmadı" });
  }
  
  await movie.deleteOne();
  res.json({ message: "Film silindi" });
});