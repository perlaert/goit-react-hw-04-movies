import axios from 'axios';

const fetchMovies = ({ searchQuery = '', currentPage = 1 }) => {
  const apiKey = 'edaea771b09be1ce746ab8b68de11a9b';
  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`,
    )
    .then(response => response.data.results);
};

export default { fetchMovies };
