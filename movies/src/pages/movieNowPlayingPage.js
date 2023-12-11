import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getNowPlayingMovies} from "../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const NowPlayingMoviePage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('discoverNew', getNowPlayingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;


    const star = movies.filter(m => m.star)
    localStorage.setItem('nowPlaying', JSON.stringify(star))

    return (
        <PageTemplate
            title='NowPlaying Movies'
            movies={movies}
            avatar = 'popular'
            action={(movie) => {
                return <AddToMustWatchIcon movie={movie} />
            }}
        />
    );
};
export default NowPlayingMoviePage;