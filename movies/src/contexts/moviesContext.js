import React, { useState, useEffect, useContext  } from "react";
import { AuthContext } from "./authContext";
import { addMovieToFavourites, getFavouriteMovies, removeMovieFromFavourites } from '../api/tmdb-api';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [star,setStar] = useState( [] )
    const [mustWatch,setMustWatch] = useState( [] )
    const [favorites, setFavorites] = useState( [] )
    const [myReviews, setMyReviews] = useState( {} )
    const userContext = useContext(AuthContext)
    const userName = userContext.userName

    useEffect(() => {
        if (userContext.isAuthenticated) {
            getFavouriteMovies(userName).then((favourites) => {
                setFavorites(favourites);
            });
            console.log(favorites)
        }
        else {
            setFavorites([])
        }
    }, [ userContext.isAuthenticated, userName])

    const addToFavorites = (movie) => {
        const movieId = `${movie.id}`
        let newFavorites = [];
        console.log("hhh")
        console.log(movieId)

        addMovieToFavourites(movieId,userName);
        if (!favorites.includes(movieId)){
            newFavorites = [...favorites, movieId];
        }
        else{
            newFavorites = [...favorites];
        }
        console.log(newFavorites)
        setFavorites(newFavorites)
    };

    // We will use this function in a later section
    const removeFromFavorites = (movie) => {
        const movieId = `${movie.id}`
        removeMovieFromFavourites(movieId,userName);
        setFavorites( favorites.filter(
            (mId) => mId !== movieId
        ) )
    };

    const addToStar = (movie) => {
        let newStar = [];
        if (!star.includes(movie.id)){
            newStar = [...star, movie.id];
        }
        else{
            newStar = [...star];
        }
        setStar(newStar)
    };
    const removeFromStar = (movie) => {
        setStar( star.filter(
            (mId) => mId !== movie.id
        ) )
    };



    const addToMustWatch = (movie) => {
        let newMustWatch = [];
        if (!mustWatch.includes(movie.id)){
            newMustWatch = [...mustWatch, movie.id];
        }
        else{
            newMustWatch = [...mustWatch];
        }
        setMustWatch(newMustWatch)
    };


    const removeFromMustWatch = (movie) => {
        setMustWatch( mustWatch.filter(
            (mId) => mId !== movie.id
        ) )
    };





    //下面一起一起的 使用{}的原因是 本身是 有多重数据类型

    const addReview = (movie, review) => {
        setMyReviews( {...myReviews, [movie.id]: review } )
    };
    //console.log(myReviews);


    return (
        <MoviesContext.Provider
            value={{
                favorites,
                mustWatch,
                star,
                addToStar,
                removeFromStar,
                addToFavorites,
                removeFromFavorites,
                addReview,
                addToMustWatch,
                removeFromMustWatch,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;