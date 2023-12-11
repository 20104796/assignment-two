# TMDB Movie App

A ReactJS application for exploring movies with Material UI components and Firebase authentication.
Youtube Videos for this work: https://youtu.be/X8KLEjhkqCw
## Overview

This project is a web application that allows users to discover, explore, and interact with movie data from TMDB. It offers various features and functionalities for a seamless movie-watching experience.

### Features

- Browse the latest, top-ranked, and popular films.
- Get movie recommendations based on the selected genre.
- Access actor information and explore their filmography.
- Sort movies by ranking in ascending or descending order.
- Use a search bar to filter movies by name.
- Authenticate using Firebase (e.g., email: 111@gmail.com, password: 111111).
- See actors and their roles through a user-friendly Material UI form in the selected movie.
- Implement pagination for a cleaner display of movie lists.

## Setup Requirements

Clone the repo and follow these setup steps to run the app locally.
In the movie directory, you can run:
### `npm install`
Download relative packages

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## API Endpoints

The app uses the following TMDB API endpoints:

- Details of movie that actor involved in  -- `/actors/:name/:movieId`  -- `https://api.themoviedb.org/3/movie/${movieId}`
- Actor Information -- `/actors/:name` -- `https://api.themoviedb.org/3/search/person?query=${encodedActorName}`
- Information about high ranked movies -- `/movies/top-Ranted` --`https://api.themoviedb.org/3/movie/top_rated`
- Movie list that is playing in cinema now -- `/movies/now-Playing` --`https://api.themoviedb.org/3/movie/now_playing`
## Routing

The app features the following routes:

- `/movies/:id/recommendation` - Shows recommended movies based on the selected genre.
- `/movies/now-playing` - Displays currently playing films.
- `/movies/top-rated` - Shows top-ranked films.
- `/movies/popular` - Displays popular films.

Public and protected aspects of the app are clearly defined for user convenience.

## Independent Learning

During the development of this project, I independently researched and implemented various technologies and techniques not covered in the lectures or labs. Here are some of the highlights:

- **Firebase Authentication**: Used Firebase for third-party authentication.
- **Material UI Components**: Integrated Material UI components to enhance the user interface.
- **Pagination**: Implemented a pagination system for better organization of movie lists.

For more details and source code references, please refer to the project's source code and the following online resources (articles/blogs).
