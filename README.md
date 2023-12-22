# Assignment 2 - Web API.

Name: Yuanzhe Yang

Video: https://youtu.be/APJOHH6HDfk

## Features.

+ Added additional API endpoints that utilize parameterized paths.
+ The frontend now exclusively utilizes APIs that are handled through the backend system.
+ The backend, Movies-API, now facilitates the authentication process.
+ Certain pages have been updated to necessitate authentication for data retrieval. (Introduction of secure routes.)
+ Employed Swagger for comprehensive API documentation.
## Setup requirements.

open one terminal  
`cd movies-api`  
`npm install`  
`npm run dev`  
open another terminal  
`cd movies`  
`npm install`  
`npm start`

## API Configuration

+ create a `.env` file in the movies-api folder as below:
   ______________________
  NODE_ENV=development  
  PORT=8080   
  HOST=localhost  
  MONGO_DB=YourMongoURL  
  SEED_DB=True  
  SECRET=YourJWTSecret  
  REACT_APP_TMDB_KEY=YourTMDBApiKey
   ______________________

## API Design

When this movies-api server is running, you can visit this api server's document by visiting http://localhost:8080/api-docs/#/

### [Actors](movies-api/api/actors/index.js)
+ `/api/actor/tmdb/movie/{movieId}/cast` | GET | Retrieves information about the actors who take part in a specific movie.
+ `/api/actor/tmdb/actor/{actorName}` | GET | Retrieves details by actor's name.
+ `/api/actor/tmdb/movie/{movieId}` | GET | Retrieves the actor's movie details for a specific movie ID.

### [Genres](movies-api/api/genres/index.js)
+ `/api/genres/tmdb/genres` | GET | Retrieves all movie genres.

### [Movies](movies-api/api/movies/index.js)
+ `/api/movies/tmdb/upcoming` | GET | Retrieves upcoming movies from TMDB.
+ `/api/movies/tmdb/top_rated` | GET | Retrieves top rated movies from TMDB.
+ `/api/movies/tmdb/now_playing` | GET | Retrieves movies that are currently playing in theaters from TMDB.
+ `/api/movies/tmdb/discover` | GET | Discovers movies based on different criteria from TMDB.
+ `/api/movies/tmdb/popular` | GET | Retrieves popular movies from TMDB.
+ `/api/movies/tmdb/movie/{id}` | GET | Retrieves detailed information of a specific movie by ID.
+ `/api/movies/tmdb/movie/{id}/images` | GET | Retrieves images related to a specific movie by ID.

### [Users](movies-api/api/users/index.js)
+ `/api/users/` | POST | Registers or authenticates a user. The body should include username and password.
+ `/api/users/favourites/add/{userName}` | POST | Adds a movie to the user's favourites list.
+ `/api/users/favourites/get/{userName}` | GET | Retrieves the user's favourite movies.
+ `/api/users/favourites/remove/{userName}` | POST | Removes a movie from the user's favourites list.
+ `/api/users/{username}` | PUT | Updates a single user's information, such as password.

## Security and Authentication

+ Authentication is utilized to manage user sessions like the favorite page.
+ Favourite Movies Page (/movies/favorites/)

## Integrating with React App

+ All front-end APIs are now using movies-api
+ When a user attempts to access a protected page, they are redirected to the login page.

## Independent learning (if relevant)
Swagger learning --
    https://swagger.io/
    https://www.youtube.com/watch?v=5aryMKiBEKY 
    https://www.youtube.com/watch?v=dhMlXoTD3mQ&t=888s 
