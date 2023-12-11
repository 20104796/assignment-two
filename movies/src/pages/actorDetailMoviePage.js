import React from 'react';
import { useParams } from 'react-router-dom';
import ActorDetailMovies from "../components/actorDetailMovies";

function ActorDetailMoviePage() {
    const { name, movieId } = useParams();

    return (
        <>
            <ActorDetailMovies name={name} movieId = {movieId}/>
        </>
    );
}

export default ActorDetailMoviePage;
