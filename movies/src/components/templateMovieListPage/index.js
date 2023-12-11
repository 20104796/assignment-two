import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import PrimarySearchAppBar from '../PrimarySearchBar';
import {Pagination} from "@mui/material"; // 导入搜索栏组件


function MovieListPageTemplate({ movies, title, action, avatar }) {
    console.log(movies)
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);
    const [searchValue, setSearchValue] = useState(""); // 新增搜索框的值


    //----

    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        });
    //

    const [page, setPage] = useState(1); // 当前页码
    const moviesPerPage = 5; // 每页显示的电影数量
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    displayedMovies = displayedMovies.slice(startIndex, endIndex);
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };




    // add here
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    const [sortBy, setSortBy] = useState("rating-desc");




    if (sortBy === "rating-asc") {
        displayedMovies.sort((a, b) => a.vote_average - b.vote_average);
    } else if (sortBy === "rating-desc") {
        displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (searchValue) {
        displayedMovies = displayedMovies.filter((movie) => {
            const searchInput = searchValue.toLowerCase();
            return movie.original_title.toLowerCase().includes(searchInput);
        });
    }

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else if (type === "genre") setGenreFilter(value);
        else if (type === "sort") setSortBy(value);
    };


    return (
        <>
        <Grid container sx={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Header title={title} />
                <PrimarySearchAppBar handleSearchChange={handleSearchChange} />
            </Grid>

            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        sortBy={sortBy}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies} avatar = {avatar}></MovieList>
            </Grid>
        </Grid>
            <Pagination
                count={Math.ceil(movies.length / moviesPerPage)}
                page={page}
                onChange={handlePageChange}
            />
        </>
    );
}
export default MovieListPageTemplate;