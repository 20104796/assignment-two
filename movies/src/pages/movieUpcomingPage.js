import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies} from "../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const UpcomingMoviePage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('discoverNew', getUpcomingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const mustWatch = movies.filter(m => m.mustWatch)
    localStorage.setItem('upcoming', JSON.stringify(mustWatch))

    return (
        <PageTemplate
            title='Upcoming Movies'
            movies={movies}
            avatar = 'mustWatch'
            action={(movie) => {
                return <AddToMustWatchIcon movie={movie} />
            }}
        />
    );
};
export default UpcomingMoviePage;