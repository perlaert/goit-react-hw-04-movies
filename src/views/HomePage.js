import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=edaea771b09be1ce746ab8b68de11a9b',
    );

    this.setState({
      movies: response.data.results,
    });
  }

  render() {
    const { movies } = this.state;
    // console.log(this.props.match.url);
    return (
      <>
        <h1>Trending today</h1>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
