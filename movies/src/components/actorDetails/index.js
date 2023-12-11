import React from 'react';
import { getActorDetails } from '../../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import {Link} from "react-router-dom";

function ActorDetailsPage({ name }) {
    const { data: actor, error, isLoading, isError } = useQuery(
        ["actorName", { actorName: name }],
        () => getActorDetails(name)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <Typography variant="h5" color="error">{error.message}</Typography>;
    }

    const actorInfo = actor.results[0];
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4">Actor Details</Typography>
            <Typography variant="h6">Name: {actorInfo.name}</Typography>
            <Typography variant="body1">Gender: {actorInfo.gender === 1 ? 'Female' : 'Male'}</Typography>
            <Typography variant="body1">Known For Department: {actorInfo.known_for_department}</Typography>
            <Typography variant="body1">Popularity: {actorInfo.popularity}</Typography>
            <Typography variant="h6">Known For:</Typography>
            <List>
                {actorInfo.known_for.map((movie, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={
                                <Link to={`/actors/${name}/${movie.id}`}>
                                    {movie.title || movie.name}
                                </Link>
                            }
                            secondary={
                                <>
                                    <Typography variant="body2">Overview: {movie.overview}</Typography>
                                    <Typography variant="body2">Release Date: {movie.release_date || movie.first_air_date}</Typography>
                                    <Typography variant="body2">Vote Average: {movie.vote_average}</Typography>
                                    <Typography variant="body2">Vote Count: {movie.vote_count}</Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default ActorDetailsPage;
