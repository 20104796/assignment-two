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


/**
 * @swagger
 * /api/movies/tmdb/upcoming:
 *   get:
 *     tags:
 *       - "Movies"
 *     summary: Retrieve upcoming movies from TMDB
 *     description: Use to request a list of upcoming movies.
 *     responses:
 *       200:
 *         description: A list of upcoming movies
 *       500:
 *         description: Internal Server Error
 */

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));


/**
 * @swagger
 * /api/movies/tmdb/top_rated:
 *   get:
 *     tags:
 *       - "Movies"
 *     summary: Retrieve top rated movies from TMDB
 *     description: Use to request a list of top rated movies.
 *     responses:
 *       200:
 *         description: A list of top rated movies
 *       500:
 *         description: Internal Server Error
 */

router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

/**
 * @swagger
 * /api/movies/tmdb/now_playing:
 *   get:
 *     tags:
 *       - "Movies"
 *     summary: Retrieve now playing movies from TMDB
 *     description: Use to request a list of movies that are currently playing in theaters.
 *     responses:
 *       200:
 *         description: A list of now playing movies
 *       500:
 *         description: Internal Server Error
 */
router.get('/tmdb/now_playing', asyncHandler(async (req, res) => {
    const topRatedMovies = await getNowPlayingMovies();
    res.status(200).json(topRatedMovies);
}));


/**
 * @swagger
 * /api/movies/tmdb/discover:
 *   get:
 *     tags:
 *       - "Movies"
 *     summary: Discover movies from TMDB
 *     description: Use to request a list of movies based on various criteria.
 *     responses:
 *       200:
 *         description: A list of discovered movies
 *       500:
 *         description: Internal Server Error
 */

router.get('/tmdb/discover', asyncHandler(async (req, res) => {
    const movies = await getMovies();
    res.status(200).json(movies);
}));


/**
 * @swagger
 * /api/movies/tmdb/popular:
 *   get:
 *     tags:
 *       - "Movies"
 *     summary: Retrieve popular movies from TMDB
 *     description: Use to request a list of popular movies.
 *     responses:
 *       200:
 *         description: A list of popular movies
 *       500:
 *         description: Internal Server Error
 */

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const movies = await getPopularMovies();
    res.status(200).json(movies);
}));


/**
 * @swagger
 * /api/movies/tmdb/movie/{id}:
 *   get:
 *     tags:
 *       - "Movies"
 *     summary: Retrieve detailed information of a specific movie
 *     description: Use to request detailed information about a specific movie by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the movie
 *       500:
 *         description: Internal Server Error
 */
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



/**
 * @swagger
 * /api/movies/tmdb/movie/{id}/images:
 *   get:
 *     tags:
 *       - "Movies"
 *     summary: Retrieve images of a specific movie
 *     description: Use to request images related to a specific movie by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Images of the movie
 *       500:
 *         description: Internal Server Error
 */
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