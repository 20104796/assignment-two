import {getActorMovieCredits} from '../../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import {Typography, Paper, List, ListItem, ListItemText, Card, CardHeader, CardContent} from '@mui/material';
import CardMedia from "@mui/material/CardMedia";

function ActorDetailMoviesPage({ name, movieId }) {

    const { data: movie, error, isLoading, isError } = useQuery(
        ["movieDetails", { actorName: name, movieId }],
        () => getActorMovieCredits(name, movieId)
    );

    console.log(movie)

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <Typography variant="h5" color="error">{error.message}</Typography>;
    }

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Card>
                <CardHeader title={movie.title} />
                <CardMedia
                    component="img"
                    height="400"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <CardContent>
                    <Typography variant="h6">Overview</Typography>
                    <Typography variant="body1">{movie.overview}</Typography>
                    <Typography variant="h6">Release Date</Typography>
                    <Typography variant="body1">{movie.release_date}</Typography>
                    <Typography variant="h6">Vote Average</Typography>
                    <Typography variant="body1">{movie.vote_average}</Typography>
                    <Typography variant="h6">Vote Count</Typography>
                    <Typography variant="body1">{movie.vote_count}</Typography>
                </CardContent>
            </Card>
        </Paper>
    );
}

export default ActorDetailMoviesPage;
