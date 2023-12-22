import express from 'express';
import asyncHandler from 'express-async-handler';
import {getMovieCast, getActorDetails, getActorMovieDetails} from '../tmdb-api';

const router = express.Router();
let Regex = /^[1-9][0-9]*$/;


/**
 * @swagger
 * /api/actor/tmdb/movie/{movieId}/cast:
 *   get:
 *    tags:
 *       - "Actors"
 *    summary: Information about the actors who take part in movie
 *    description: Get list of actor
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "movieId"
 *       description: the id of movie
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *
 */

router.get('/tmdb/movie/:movieId/cast', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const cast = await getMovieCast(movieId);
        res.status(200).json(cast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/actor/tmdb/actor/{actorName}:
 *   get:
 *     tags:
 *       - "Actors"
 *     summary: Retrieve actor details by name
 *     description: Use to request details about a specific actor by their name.
 *     parameters:
 *       - in: path
 *         name: actorName
 *         required: true
 *         description: Name of the actor to retrieve details for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response containing details about the actor.
 *       500:
 *         description: Internal Server Error
 */
router.get('/tmdb/actor/:actorName', async (req, res) => {
    try {
        const actorName = req.params.actorName;
        const actorDetails = await getActorDetails(actorName);
        res.status(200).json(actorDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



/**
 * @swagger
 * /api/actor/tmdb/movie/{movieId}:
 *   get:
 *     tags:
 *       - "Actors"
 *     summary: Get the actor's movie details
 *     description: Use to request details about a movie in which the selected actor plays.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response containing details about the movie.
 *       500:
 *         description: Internal Server Error
 */
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



export default router;