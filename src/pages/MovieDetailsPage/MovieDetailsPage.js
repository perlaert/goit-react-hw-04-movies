import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultMovieImg from '../../components/images/defaultMovieImg.jpg';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import moviesApi from '../../components/services/movies-api';
import Error from '../../components/Error/Error';
import route from '../../routes';
import style from './MovieDetailsPage.module.css';

class MovieDetailsPage extends Component {
  static props = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    movie: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie = () => {
    const { movieId } = this.props.match.params;
    moviesApi
      .fetchMovieById(movieId)
      .then(data => this.setState({ movie: data }))
      .catch(error =>
        this.setState({
          error,
        }),
      )
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    return history.push(route.home);

    // history.push(location?.state?.from || route.home);
  };

  render() {
    const { poster_path, title, release_date, vote_average, overview, genres } =
      this.state.movie;

    const year = new Date(release_date).getFullYear();

    const { match } = this.props;

    return (
      <div className={style.MovieDetails}>
        <button type="button" onClick={this.handleGoBack} className={style.btn}>
          Go back
        </button>
        {this.state.error && (
          <Error message="Something went wrong. Try again." />
        )}
        <div className={style.MovieCard}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : defaultMovieImg
            }
            alt={title}
          />
          <div className={style.decr}>
            <h1>
              {title}
              <span> ({year})</span>
            </h1>
            <p>User Score: {(vote_average * 100) / 10}%</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <ul className={style.GenresList}>
              {genres &&
                genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
            </ul>
          </div>
        </div>
        <div>
          <h2>Additional information</h2>
          <ul className={style.CastInfo}>
            <li>
              <Link to={`${match.url}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`${match.url}/reviews`}>Reviews</Link>
            </li>
          </ul>
          <Switch>
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={Reviews} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default MovieDetailsPage;
