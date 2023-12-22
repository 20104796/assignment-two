import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from './reviewModel'
import { getMovieReviews } from '../tmdb-api';

const router = express.Router();

/**
 * @swagger
 * /api/reviews/movie/{id}/reviews:
 *   get:
 *     summary: Retrieve reviews for a specific movie
 *     description: Get a list of reviews for a movie by its ID. This includes reviews stored in our database as well as reviews from TMDB.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to retrieve reviews for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response containing combined reviews from local database and TMDB.
 *       404:
 *         description: The resource you requested could not be found.
 */
router.get('/movie/:id/reviews', asyncHandler(async (req, res) => {
        const movieReviews = await Review.find({movieId: id});
        const movieReviewsFromTmdb = await getMovieReviews(id);
        const movieReviewsCombined = movieReviews.concat(movieReviewsFromTmdb.results);
        if(id){
            res.status(200).json(movieReviewsCombined);
        } else {
            res.status(404).json({
                message: 'The resource you requested could not be found.',
                status_code: 404
            });
        }
}));

export default router;