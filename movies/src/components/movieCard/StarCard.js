import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Avatar from '@mui/material/Avatar';


export default function StarCard({ movie}) {


    return (
        <CardHeader
            avatar={
                <div>
                    {movie.star ? (
                        <Avatar sx={{ backgroundColor: 'blue' }}>
                            <StarIcon />
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