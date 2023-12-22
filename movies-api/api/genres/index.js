import express from 'express';
import Genre from './genreModel';
import asyncHandler from 'express-async-handler';
import { getGenres } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
}));

/**
 * @swagger
 * /api/genres/tmdb/genres:
 *   get:
 *    tags:
 *     - Genres
 *    summary: Get genres of all kinds of movies
 *    description: Get all genres
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "Genres not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 *
 */
router.get('/tmdb/genres', async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;