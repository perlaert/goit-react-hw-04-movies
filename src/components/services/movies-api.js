import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const apiKey = '90996ae54f24edbe7886996fac12fc31';

const fetchMovies = ({ searchQuery = '', currentPage = 1 }) => {
  return axios
    .get(
      `/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`,
    )
    .then(response => response.data.results);
};

const fetchTrendingMovies = page => {
  return axios
    .get(`/trending/movie/day?api_key=${apiKey}&page=${page}`)
    .then(response => response.data.results);
};

const fetchMovieById = movieId => {
  return axios
    .get(`/movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.data);
};

const fetchMovieCast = movieId => {
  return axios
    .get(`/movie/${movieId}/credits?api_key=${apiKey}`)
    .then(response => response.data.cast);
};

const fetchMovieReviews = movieId => {
  return axios
    .get(`/movie/${movieId}/reviews?api_key=${apiKey}`)
    .then(response => response.data.results);
};

export default {
  fetchMovies,
  fetchTrendingMovies,
  fetchMovieById,
  fetchMovieCast,
  fetchMovieReviews,
};
