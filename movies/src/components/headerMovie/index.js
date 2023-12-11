import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MovieHeader = (props) => {
    const movie = props.movie;
    const reco = props.reco
    const navigate = useNavigate();

    return (
        <Paper
            component="div"
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                padding: 1.5,
                margin: 0,
            }}
        >
            <IconButton aria-label="go back" onClick={() => navigate(-1)} >
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {reco !== "Recommendation" && movie.title}
                {reco !== "Recommendation" ? (
                    <a href={movie.homepage}>
                        <HomeIcon color="primary" />
                    </a>
                ) : (
                    <>
                        <div>Recommendation</div>
                        <Link to={`/movies/${movie.id}`}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: "1.8rem", // 设置字体大小
                                    fontStyle: 'italic', // 斜体
                                }}
                            >
                                Go back to movie detail
                            </Typography>
                        </Link>
                    </>
                )}
                <br />
                {reco !== "Recommendation"? (
                    <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span>
                ) : null}
            </Typography>

            <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default MovieHeader;