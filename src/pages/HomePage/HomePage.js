import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import moviesApi from '../../services/movies-api';
import Error from '../../components/Error/Error';
import Button from '../../components/Button/Button';
import defaultMovieImg from '../../components/images/defaultMovieImg.jpg';
import MoviePreview from '../../components/MoviePreview/MoviePreview';
import style from '../../styles/base.module.css';

class HomePage extends Component {
  static props = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    movies: [],
    error: null,
    isLoading: false,
    fetchLength: 0,
    page: 1,
  };

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (page !== prevState.page) {
      this.fetchMovies();
    }
  }

  fetchMovies = () => {
    const { page } = this.state;

    this.setState({ isLoading: true });
    moviesApi
      .fetchTrendingMovies(page)
      .then(results => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
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

  getNextPage = event => {
    event.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { movies, error, isLoading, fetchLength } = this.state;
    const shouldPenderLoadMoreBtn = movies.length > 0 && !isLoading;

    const { match, location } = this.props;

    return (
      <>
        <div className={style.MoviesPage}>
          <h1>Trending today</h1>
          {error && <Error message="Something went wrong. Try again." />}
          <ul className={style.MovieGallery}>
            {movies.map(movie => (
              <li key={movie.id} className={style.MovieGalleryItem}>
                <Link
                  to={{
                    pathname: `${match.url}movies/${movie.id}`,
                    state: {
                      from: location,
                    },
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
              color="##e1e2ed"
              height={80}
              width={80}
              className="loader"
            />
          )}

          {shouldPenderLoadMoreBtn && fetchLength === 20 && (
            <Button onClick={this.getNextPage} />
          )}
        </div>
      </>
    );
  }
}

export default HomePage;
