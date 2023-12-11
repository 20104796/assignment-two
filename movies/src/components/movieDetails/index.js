import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { getMovies, getMovieCast } from '../../api/tmdb-api';
import { useQuery } from 'react-query';
import Spinner from '../../components/spinner';
import Pagination from "@mui/material/Pagination";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!

    //important
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [drawerOpen, setDrawerOpen] = useState(false);

    /**
    const [cast, setCast] = useState([]);

    useEffect(() => {
        getMovieCast(movie.id) // Pass the movie ID to the function
            .then((data) => {
                if (data.cast) {
                    setCast(data.cast);
                }
            })
            .catch((error) => {
                console.error("Error fetching cast data:", error);
            });
    }, [movie.id]);

    */
    const { data, error, isLoading, isError } = useQuery(
        ["cast", { movieId: movie.id }],
        () => getMovieCast(movie.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const castList = data.cast;
    const totalCast = castList.length;
    const pageCount = Math.ceil(totalCast / rowsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = page * rowsPerPage;
    const displayedCast = castList.slice(startIndex, endIndex);


    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper
                component="ul"
                sx={{...root}}
            >
                <li>
                    <Chip label="Genres" sx={{...chip}} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{...chip}} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={{...root}}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count}`}
                />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>

            <Paper component="ul" sx={{...root}}>
                <li>
                    <Chip label="Production Countries" sx={{...chip}} color="primary" />
                </li>
                {movie.production_countries.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{...chip}} />
                    </li>
                ))}
            </Paper>

            <Paper component="ul" sx={{...root}}>
                <Link to={`/movies/${movie.id}/recommendation`} style={{ textDecoration: 'none' }}>
                    <Paper component="ul" sx={{ ...root }}>
                        <Chip label="More Recommendation" sx={{ ...chip, backgroundColor: 'lightgreen' }} color="primary" />
                    </Paper>
                </Link>
            </Paper>

            <br></br>
            <Typography variant="h5" component="h3">
                More Details
            </Typography>


            <Typography variant="h5" component="h3">
                Actors
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Actor</TableCell>
                            <TableCell>Character</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedCast.map((actor) => (
                            <TableRow key={actor.id}>
                                <TableCell>
                                    <Link to={`/actors/${actor.name}`} style={{ textDecoration: 'none' }}>
                                        {console.log(actor.name)}
                                        {actor.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{actor.character}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                sx={{ marginTop: 2 }}
            />

            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: "1em",
                    right: "1em",
                }}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {/* Add your MovieReviews component here */}
            </Drawer>
        </>
    );
};
export default MovieDetails ;