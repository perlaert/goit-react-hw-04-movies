import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import defaultMovieImg from '../components/images/defaultMovieImg.jpg';
import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';
import moviesApi from '../components/services/movies-api';
import Error from '../components/Error/Error';

class MovieDetailsPage extends Component {
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

  render() {
    const { poster_path, title, release_date, vote_average, overview, genres } =
      this.state.movie;

    const year = new Date(Date(release_date)).getFullYear();

    const { match } = this.props;

    return (
      <div>
        <button
          type="button"
          onClick={() => this.props.history.push('/movies')}
        >
          Go back
        </button>
        {this.state.error && (
          <Error message="Something went wrong. Try again." />
        )}
        <div>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : defaultMovieImg
            }
            alt={title}
          />
          <h1>
            {title}
            <span> ({year})</span>
          </h1>
          <p>User Score: {(vote_average * 100) / 10}%</p>
        </div>
        <div>
          <h2>Overview</h2>
          <p>{overview}</p>
        </div>
        <div>
          <h2>Genres</h2>
          <ul>
            {genres &&
              genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
          </ul>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul>
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
