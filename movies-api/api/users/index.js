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


//獲取
router.get('/favourites/get/:userName', asyncHandler(async (req, res) => {
    const userName = req.params.userName; // 从URL路径中获取用户ID
    const user = await User.findByUserName(userName); // 等待查询完成
    if (!user) {
        return res.status(401).json({ success: false, msg: 'User not authenticated.' });
    }
    console.log(user.favourites)
    res.status(200).json(user.favourites);
}));

//移除
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


// Update password
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