import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from './reviewModel'
import { getMovieReviews } from '../tmdb-api';

const router = express.Router();
let Regex = /^[1-9][0-9]*$/;

router.get('/movie/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Regex.test(id)) {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
    else {
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
    }
}));

router.post('/movie/:id/reviews/:username', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const userName = req.params.username;
    const movieReviews = await Review.find({author: userName, movieId: id});
    if (movieReviews.length === 0 || movieReviews === null){
        req.body.id = new Date();
        req.body.author = userName;
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        Review.create(req.body);
        res.status(201).json(req.body);
    }
    else if (movieReviews.length > 0) {
        req.body.updated_at = new Date();
        const result = await Review.updateOne({
            movieId: req.params.id,
        }, req.body);
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'Review Updated Sucessfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to Update Review' });
        }
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
}));
export default router;