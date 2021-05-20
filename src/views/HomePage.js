import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moviesApi from '../components/services/movies-api';
import Error from '../components/Error/Error';
import Loader from 'react-loader-spinner';

class HomePage extends Component {
  state = {
    movies: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    moviesApi
      .fetchTrendingMovies()
      .then(results =>
        this.setState({
          movies: results,
        }),
      )
      .catch(error =>
        this.setState({
          error,
        }),
      )
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { movies, error, isLoading } = this.state;
    const shouldPenderLoadMoreBtn = movies.length > 0 && !isLoading;

    return (
      <>
        <h1>Trending today</h1>
        {error && <Error message="Something went wrong. Try again." />}
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>

        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={80}
            width={80}
            className="loader"
          />
        )}

        {shouldPenderLoadMoreBtn && (
          <button type="button" onClick={this.fetchMovies}>
            Load more
          </button>
        )}
      </>
    );
  }
}

export default HomePage;
