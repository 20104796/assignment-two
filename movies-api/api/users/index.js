import express from 'express';
import User from './userModel';
import Movie from '../movies/movieModel'
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

/**
 * @swagger
 * /api/users/:
 *   post:
 *     tags:
 *       - "Users"
 *     summary: Register or authenticate a user
 *     description: Handles user registration or authentication based on query parameter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully registered or authenticated.
 *       400:
 *         description: Username and password are required.
 *       500:
 *         description: Internal server error.
 */
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

/**
 * @swagger
 * /api/users/favourites/add/{userName}:
 *   post:
 *     tags:
 *       - "Users"
 *     summary: Add a movie to user's favourites
 *     description: Add a movie to the favourites list of a specified user.
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         description: Username of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie added to favourites successfully.
 *       401:
 *         description: User not authenticated.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/favourites/add/:userName', asyncHandler(async (req, res) => {
    const userName = req.params.userName; // 从URL路径中获取用户ID
    const   movieId   = req.body.id;
    try {
        const user = await User.findByUserName(userName); // 等待查询完成
        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not authenticated.' });
        }

        const movie = await Movie.findByMovieDBId(movieId);
        if (!movie) {
            return res.status(404).json({ success: false, msg: 'Movie not found.' });
        }

        if (typeof user.favourites === 'undefined') {
            user.favourites=[]
        }

        if (!user.favourites.includes(movie.id)) {
            user.favourites.push(movie.id);
        }

        await user.save();
        res.status(200).json({ success: true, msg: user.favourites });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: 'Internal server error.' });
    }

}));


/**
 * @swagger
 * /api/users/favourites/get/{userName}:
 *   get:
 *     tags:
 *       - "Users"
 *     summary: Retrieve user's favourite movies
 *     description: Get a list of favourite movies for a specified user.
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         description: Username of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of favourites.
 *       401:
 *         description: User not authenticated.
 *       500:
 *         description: Internal server error.
 */
router.get('/favourites/get/:userName', asyncHandler(async (req, res) => {
    const userName = req.params.userName; // 从URL路径中获取用户ID
    const user = await User.findByUserName(userName); // 等待查询完成
    if (!user) {
        return res.status(401).json({ success: false, msg: 'User not authenticated.' });
    }
    console.log(user.favourites)
    res.status(200).json(user.favourites);
}));

/**
 * @swagger
 * /api/users/favourites/remove/{userName}:
 *   post:
 *     tags:
 *       - "Users"
 *     summary: Remove a movie from user's favourites
 *     description: Remove a specific movie from the favourites list of a user.
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         description: Username of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie removed from favourites successfully.
 *       401:
 *         description: User not authenticated.
 *       500:
 *         description: Internal server error.
 */
router.post('/favourites/remove/:userName', asyncHandler(async (req, res) => {

    const userName = req.params.userName; // 从URL路径中获取用户ID
    const  movieId  = req.body.id;

    try {
        const user = await User.findByUserName(userName); // 等待查询完成
        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not authenticated.' });
        }

        user.favourites = user.favourites.filter(favourite => favourite !== movieId);

        await user.save();
        res.status(200).json({ success: true, msg: user.favourites });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: 'Internal server error.' });
    }

}));


/**
 * @swagger
 * /api/users/{username}:
 *   put:
 *     tags:
 *       - "Users"
 *     summary: Update user's password
 *     description: Change the password for a specified user.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password successfully updated.
 *       400:
 *         description: New password is required or does not meet complexity requirements.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:username', asyncHandler(async (req, res) => {
    const { username } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ success: false, msg: 'New password is required.' });
    }

    const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordValidator.test(newPassword)) {
        return res.status(400).json({ success: false, msg: 'Password does not meet complexity requirements.' });
    }

    try {
        const user = await User.findByUserName(username);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found.' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, msg: 'Password successfully updated.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

async function registerUser(req, res) {
    //console.log(req.body)
    await User.create(req.body);
    //console.log("successful login")
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    console.log(user)
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

export default router;