import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getPopularMovies} from "../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";
import AddToStarIcon from "../components/cardIcons/addToStar";

const PopularMoviePage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('discoverNew', getPopularMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;


    const star = movies.filter(m => m.star)
    localStorage.setItem('popular', JSON.stringify(star))

    return (
        <PageTemplate
            title='Popular Movies'
            movies={movies}
            avatar = 'popular'
            action={(movie) => {
                return <AddToStarIcon movie={movie} />
            }}
        />
    );
};
export default PopularMoviePage;