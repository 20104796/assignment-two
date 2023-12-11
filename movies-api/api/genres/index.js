import express from 'express';
import Genre from './genreModel';
import asyncHandler from 'express-async-handler';
import { getGenres } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
}));


router.get('/tmdb/genres', async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;