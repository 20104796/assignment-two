export const addMovieToFavourites = async (movieId, username) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/favourites/add/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { id: movieId })
        });

        // 检查响应状态
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding movie to favourites:', error);
        throw error;
    }
};

export const getFavouriteMovies = (username) => {
    return fetch(`http://localhost:8080/api/users/favourites/get/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
};

export const removeMovieFromFavourites = (movieId,username) => {
    return fetch(`http://localhost:8080/api/users/favourites/remove/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { id: movieId })
        }).then(res => res.json())
};



export const login = (username, password) => {
    //console.log("hhhhhhhhh")
    return fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const addFavourite = (username, id) => {
    return fetch(`http://localhost:8080/api/users/${username}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ id })
    }).then(res => res.json())
};

export const getFavourites = async (username) => {
    return fetch(`http://localhost:8080/api/users/${username}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const deleteFavourite = (username, movie) => {
    return fetch(`http://localhost:8080/api/users/${username}/movie/${movie.id}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post'
    }).then(res => res.json())
};

export const getActorMovieCredits = async (actorName,movieId) => {
    console.log(movieId)
    try {
        const response = await fetch(`http://localhost:8080/api/actors/tmdb/movie/${movieId}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching movie details:', error);
        throw error;
    }
};



export const getMovieCast = async (movieId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/actors/tmdb/movie/${movieId}/cast`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching movie cast:', error);
        throw error;
    }
};


export const getActorDetails = async (actorName) => {
    try {
        const response = await fetch(`http://localhost:8080/api/actors/tmdb/actor/${encodeURIComponent(actorName)}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching actor details:', error);
        throw error;
    }
};



export const getMovies = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/api/movies/tmdb/discover', {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching movies:', error);
        throw error; // 这里你可以选择抛出错误或者进行其他处理
    }
};


export const getMovie = async (args) => {
    const [, idPart] = args.queryKey;
    const movieId  = idPart.id;
    try {
        const response = await fetch(
            `http://localhost:8080/api/movies/tmdb/movie/${movieId}`, {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`An error occurred while fetching movie with ID ${movieId}:`, error);
        throw error;
    }
};


//Add new function-- Popular here
export const getPopularMovies = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/api/movies/tmdb/popular', {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching movies:', error);
        throw error;
    }
};

export const getTopRatedMovies = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/api/movies/tmdb/top_rated', {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching movies:', error);
        throw error;
    }
};


export const getNowPlayingMovies = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/api/movies/tmdb/now_playing', {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching movies:', error);
        throw error;
    }
};


export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/api/movies/tmdb/upcoming', {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching movies:', error);
        throw error;
    }
};


export const getGenres = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/genres/tmdb/genres', { method: 'GET' });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('An error occurred while fetching genres:', error);
        throw error;
    }
};


export const getMovieImages = async (args) => {
    const [, idPart] = args.queryKey;
    const movieId  = idPart.id;

    try {
        const response = await fetch(
            `http://localhost:8080/api/movies/tmdb/movie/${movieId}/images`, {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`An error occurred while fetching images for movie with ID ${movieId}:`, error);
        throw error;
    }
};



export const getMovieReviews = async (movieId) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/movies/tmdb/movie/${movieId}/reviews`, {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`An error occurred while fetching reviews for movie with ID ${movieId}:`, error);
        throw error;
    }
};