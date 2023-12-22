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
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use('/api/movies', moviesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);

const errHandler = (err, req, res, next) => {
    /* if the error in development then send stack trace to display whole error,
    if it's in production then just send error message  */
    if(process.env.NODE_ENV === 'production') {
        return res.status(500).send(`Something went wrong!`);
    }
    res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};
app.use(errHandler);

const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title: "Web Dev 2 api doc"
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server',
            },
        ],
    },
    apis: ['./api/actors/index.js','./api/genres/index.js','./api/movies/index.js','./api/users/index.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});

