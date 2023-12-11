import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import StarIcon from '@mui/icons-material/Star';

const AddToStarIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToStar= (e) => {
        e.preventDefault();
        context.addToStar(movie);
    };

    return (
        <IconButton aria-label="add to stars" onClick={handleAddToStar}>
            <StarIcon color="primary" fontSize="large" />
        </IconButton>
    );
}

export default AddToStarIcon;