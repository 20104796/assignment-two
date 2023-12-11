import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const AddToFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const userContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToFavorites = (e) => {
        if (!userContext.isAuthenticated) {
            return navigate("/user/login");
        }
        e.preventDefault();
        //const id = movie.id
        //console.log(id)
        context.addToFavorites(movie);
    };

    return (
        <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavoritesIcon;