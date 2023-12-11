import React, {useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import MustWatchHead from './MustWatchCard'
import FavoriteHead from './FavoritesCard'
import StarHead from './StarCard'



export default function TemplateMovieCard({ movie, action, avatar }) {

    const { mustWatch, addToMustWatch } = useContext(MoviesContext);
    if (mustWatch.find((id) => id === movie.id)) {
        movie.mustWatch = true;
    } else {
        movie.mustWatch = false
    }

    const { favorites } = useContext(MoviesContext);
    if (favorites.find((id) => id === `${movie.id}`)) {
        movie.favorite = true;
    } else {
        movie.favorite = false
    }

    const { star, addToStar } = useContext(MoviesContext);
    if (star.find((id) => id === movie.id)) {
        movie.star = true;
    } else {
        movie.star = false
    }


    let header;

    switch (avatar) {
        case "mustWatch":
            header = <MustWatchHead movie={movie} />;
            break;
        case "favorite":
            header = <FavoriteHead movie={movie} />;
            break;
        case "popular":
            header = <StarHead movie={movie} />;
            break;
        default:
            break;
    }



    return (
        <Card sx={{ maxWidth: 345 }}>
            {header}
            <CardMedia
                sx={{ height: 500 }}
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p">
                            <CalendarIcon fontSize="small" />
                            {movie.release_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p">
                            <StarRateIcon fontSize="small" />
                            {"  "} {movie.vote_average}{" "}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {action(movie)}
                <Link to={`/movies/${movie.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}