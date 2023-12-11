import dotenv from 'dotenv';
import express from 'express';
import './db';
import moviesRouter from './api/movies';
import actorsRouter from './api/actors';
import usersRouter from './api/users';
import reviewsRouter from './api/reviews';
import genresRouter from './api/genres';
import authenticate from './authenticate';
import cors from 'cors';

dotenv.config();


const errHandler = (err, req, res, next) => {
    /* if the error in development then send stack trace to display whole error,
    if it's in production then just send error message  */
    if(process.env.NODE_ENV === 'production') {
        return res.status(500).send(`Something went wrong!`);
    }
    res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use('/api/movies', moviesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/actors', actorsRouter);

app.use('/api/users', usersRouter);

app.use('/api/reviews', reviewsRouter);

app.use(errHandler);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});

