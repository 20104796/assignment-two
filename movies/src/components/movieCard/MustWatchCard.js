import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Avatar from '@mui/material/Avatar';


export default function MustWatchCard({ movie}) {


    return (
        <CardHeader
            avatar={
                <div>
                    {movie.mustWatch ? (
                        <Avatar sx={{ backgroundColor: 'orange' }}>
                            <PlaylistAddIcon />
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