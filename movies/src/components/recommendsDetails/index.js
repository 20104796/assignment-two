import React from "react";
import {useQuery} from "react-query";
import {getGenres, getMovies} from "../../api/tmdb-api";
import Spinner from "../spinner";
import MovieList from "../movieList";
import { Grid, Typography, Box } from '@mui/material';
import AddToFavoritesIcon from "../cardIcons/addToFavorites";


const RecommendationPage = (props) => {
    const { data: dat, error: err, isLoad, isErr } = useQuery("genres", getGenres);
    const genreNames = props.genreNames;
    const id = props.id;


    const {  data, error, isLoading, isError }  = useQuery('discover', getMovies);

    if (isLoading||isLoad) {
        return <Spinner />
    }

    if (isError||isErr) {
        return <h1>{error.message}</h1>
    }


    const mov = data.results;

    //----- 将genre从英文转化成数字
    const genres = dat.genres;
    const correspondingGenreIds = [];

    for (const nameToFind of genreNames) {
        const matchingGenre = genres.find(genre => genre.name === nameToFind);
        if (matchingGenre) {
            correspondingGenreIds.push(matchingGenre.id);
        } else {
            correspondingGenreIds.push(null); // 或者其他你认为合适的默认值
        }
    }
    //-----

    //挑出genre相同的
    const newMov = mov.filter(item => {
        return item.genre_ids.some(genre_id => correspondingGenreIds.includes(genre_id)) && parseInt(item.id) !== parseInt(id);
    });

    return (
        <Grid container sx={{ padding: '20px' }}>
            <Grid item container spacing={5}>
                <Grid item xs={12}>
                <Box display="block" mb={2}>
                    <Typography     variant="h5"
                                    component="h1"
                                    sx={{
                                        fontSize: '50px', // 设置字体大小
                                        fontStyle: 'italic', // 斜体
                                        color: 'lightgreen', // 字体颜色
                                        backgroundColor: 'gray', // 背景颜色
                                        padding: '8px', // 内边距，可根据需要调整
                                        borderRadius: '4px', // 边框圆角，可根据需要调
                                        }}
                                         >
                        According to the film you choose, we recommend following films
                    </Typography>
                </Box>
                </Grid>
                <MovieList
                    movies={newMov}
                    avatar = {"favorite"}
                    action={(newMov) => {
                        return <AddToFavoritesIcon movie={newMov}/>
                    }}
                ></MovieList>
            </Grid>
        </Grid>
    );
};

export default RecommendationPage;
