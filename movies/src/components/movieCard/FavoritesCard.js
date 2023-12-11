import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from '@mui/material/Avatar';


export default function FavoritesCard({ movie}) {


    console.log("????")
    console.log(movie.id)
    console.log(movie.favorite)
    return (
            <CardHeader
                avatar={
                    <div>
                        {movie.favorite ? (
                            <Avatar sx={{ backgroundColor: 'red' }}>
                                <FavoriteIcon />
                            </Avatar>
                        ) : null}
                    </div>
                }
                title={
                    <Typography variant="h5" component="p">
                        {movie.title}
                    </Typography>
                }
            />
    )
}