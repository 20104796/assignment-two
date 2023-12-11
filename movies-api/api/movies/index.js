import express from 'express';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import {
    getUpcomingMovies,
    getTopRatedMovies,
    getMovies,
    getNowPlayingMovies,
    getPopularMovies
} from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const movies = await movieModel.find();
    res.status(200).json(movies);
}));


router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/now_playing', asyncHandler(async (req, res) => {
    const topRatedMovies = await getNowPlayingMovies();
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/discover', asyncHandler(async (req, res) => {
    const movies = await getMovies();
    res.status(200).json(movies);
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const movies = await getPopularMovies();
    res.status(200).json(movies);
}));


router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(await response.json());
        }

        const movieData = await response.json();
        res.status(200).json(movieData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));


router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error(await response.json());
        }
        const imagesData = await response.json();
        res.status(200).json(imagesData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

router.get('/tmdb/movie/:id/reviews', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(await response.json());
        }

        const reviewsData = await response.json();
        res.status(200).json(reviewsData.results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;