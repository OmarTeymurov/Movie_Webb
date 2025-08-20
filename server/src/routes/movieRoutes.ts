
import { Router } from 'express';
import { getMovies, getMovieById, createMovieReview, deleteMovie } from '../controllers/movieController';

const router = Router();

router.route('/').get(getMovies);
router.route('/:id').get(getMovieById).delete(deleteMovie);
router.route('/:id/reviews').post(createMovieReview);

export default router;