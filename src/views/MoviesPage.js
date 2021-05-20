import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import moviesApi from '../components/services/movies-api';
import Loader from 'react-loader-spinner';
import Error from '../components/Error/Error';

class MoviesPage extends Component {
  state = {
    searchQuery: '',
    movies: [],
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchMovies();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      movies: [],
      currentPage: 1,
    });
  };

  fetchMovies = () => {
    const { searchQuery, currentPage } = this.state;

    const options = {
      currentPage,
      searchQuery,
    };

    this.setState({
      isLoading: true,
    });

    moviesApi
      .fetchMovies(options)
      .then(results => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
          currentPage: prevState.currentPage + 1,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
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
    const { movies, isLoading, error } = this.state;
    const shouldPenderLoadMoreBtn = movies.length > 0 && !isLoading;

    return (
      <div>
        <SearchBar onSubmit={this.onChangeQuery}></SearchBar>
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
      </div>
    );
  }
}

export default MoviesPage;
