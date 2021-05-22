import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import queryString from 'query-string';
import SearchBar from '../../components/SearchBar/SearchBar';
import moviesApi from '../../components/services/movies-api';
import Error from '../../components/Error/Error';
import MoviePreview from '../../components/MoviePreview/MoviePreview';
import defaultMovieImg from '../../components/images/defaultMovieImg.jpg';
import Button from '../../components/Button/Button';
import style from '../../components/styles/base.module.css';

class MoviesPage extends Component {
  static props = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    searchQuery: '',
    movies: [],
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    const { search, pathname } = this.props.location;

    const queryParams = queryString.parse(search);
    // console.log(queryParams);
    // console.log(queryParams.query);

    if (search && pathname) {
      this.setState({ searchQuery: queryParams.query });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery && searchQuery !== '') {
      this.fetchMovies();
    }
  }

  onChangeQuery = query => {
    const { history, location } = this.props;

    this.setState({
      searchQuery: query,
      movies: [],
      currentPage: 1,
      fetchLength: 0,
    });

    history.push({
      pathname: location.pathname,
      search: `?query=${query}`,
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
          fetchLength: results.length,
        }));

        // window.scrollTo({
        //   top: document.documentElement.scrollHeight,
        //   behavior: 'smooth',
        // });
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
    const { movies, isLoading, error, fetchLength } = this.state;
    const shouldPenderLoadMoreBtn =
      movies.length > 0 && !isLoading && fetchLength === 20;
    const { match, location } = this.props;

    return (
      <div>
        <SearchBar onSubmit={this.onChangeQuery}></SearchBar>
        {error && <Error message="Something went wrong. Try again." />}
        <div className={style.MoviesPage}>
          <ul className={style.MovieGallery}>
            {movies.map(movie => (
              <li key={movie.id} className={style.MovieGalleryItem}>
                <Link
                  to={{
                    pathname: `${match.url}/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  <MoviePreview
                    movieImg={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : defaultMovieImg
                    }
                    title={movie.title}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {isLoading && (
            <Loader
              type="BallTriangle"
              color="#e1e2ed"
              height={80}
              width={80}
              className="loader"
            />
          )}

          {shouldPenderLoadMoreBtn && <Button onClick={this.fetchMovies} />}
        </div>
      </div>
    );
  }
}

export default withRouter(MoviesPage);
