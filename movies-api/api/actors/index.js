import express from 'express';
import asyncHandler from 'express-async-handler';
import {getMovieCast, getActorDetails, getActorMovieDetails} from '../tmdb-api';

const router = express.Router();
let Regex = /^[1-9][0-9]*$/;

router.get('/tmdb/movie/:movieId/cast', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const cast = await getMovieCast(movieId);
        res.status(200).json(cast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/tmdb/actor/:actorName', async (req, res) => {
    try {
        const actorName = req.params.actorName;
        const actorDetails = await getActorDetails(actorName);
        res.status(200).json(actorDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/tmdb/movie/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        console.log(movieId)
        const movieDetails = await getActorMovieDetails(movieId);
        res.status(200).json(movieDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ------------
router.get('/tmdb/actor/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!Regex.test(id)) {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
    else {
        const person = await getPerson(id);
        res.status(200).send(person);
    }
}));

router.get('/tmdb/actor/:id/images', asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!Regex.test(id)) {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
    else {
        const images = await getPersonImages(id);
        res.status(200).send(images);
    }
}));

router.get('/tmdb/person/actor/combined_credits', asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!Regex.test(id)) {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
    else {
        const combined_credits = await getPersonCombinedCredit(id);
        res.status(200).send(combined_credits);
    }
}));

export default router;