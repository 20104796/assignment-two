import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getTopRatedMovies } from "../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TopRatedPage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('discoverNew', getTopRatedMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;


    const star = movies.filter(m => m.star)
    localStorage.setItem('topRated', JSON.stringify(star))

    return (
        <PageTemplate
            title='Top Rated Movies'
            movies={movies}
            avatar = 'popular'
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};
export default TopRatedPage;