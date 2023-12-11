import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MovieUpcomingPage from "./pages/movieUpcomingPage";
import MovieNowPlayingPage from "./pages/movieNowPlayingPage";
import MovieTopRatedPage from "./pages/movieTopRatedPage";
import MovieRecommendationPage from "./pages/MovieRecommendationPage";
import ActorDetailPage from "./pages/actorDetailPage";
import ActorDetailMoviePage from "./pages/actorDetailMoviePage"
import Header from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PopularMoviePage from "./pages/moviePopularPage";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthContextProvider>
                <Header />
                <MoviesContextProvider>
                <Routes>
                    <Route path="/user/login" element={<LoginPage />} />
                    <Route path="/user/signup" element={<SignupPage />} />
                    <Route path="/actors/:name/:movieId" element={<ActorDetailMoviePage />} />
                    <Route path="/actors/:name" element={<ActorDetailPage />} />
                    <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                    <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
                    <Route path="/movies/popular" element={<PopularMoviePage />} />
                    <Route path="/movies/upcoming" element={<MovieUpcomingPage />} />
                    <Route path="/movies/now-Playing" element={<MovieNowPlayingPage />} />
                    <Route path="/movies/topRated" element={<MovieTopRatedPage />} />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/movies/:id/recommendation" element={<MovieRecommendationPage />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                    </Route>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={ <Navigate to="/" /> } />
                </Routes>
                </MoviesContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
