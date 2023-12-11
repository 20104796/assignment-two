import React from "react";
import { useParams } from 'react-router-dom';
import MovieRecommendations from "../components/recommendsDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const MovieRecommendationPage = (props) => {
    const { id } = useParams();
    const { data: movie, error, isLoading, isError } = useQuery(
        ["movie", { id: id }],
        getMovie
    );


    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }



    const genreNames = [];
    movie.genres.forEach((genre) => {
        genreNames.push(genre.name);
    });

    return (
        <>
            {movie ? (
                <>
                    <PageTemplate movie={movie} reco={"Recommendation"}>
                        <MovieRecommendations genreNames={genreNames} id={id}/>
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MovieRecommendationPage;

