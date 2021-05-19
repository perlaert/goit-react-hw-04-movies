import axios from 'axios';
import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import defaultMovieImg from '../components/defaultMovieImg.jpg';
import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';

class MovieDetailsPage extends Component {
  state = {
    movie: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=edaea771b09be1ce746ab8b68de11a9b`,
    );

    // console.log(response.data);

    this.setState({ movie: response.data });
  }

  render() {
    const { poster_path, title, release_date, vote_average, overview, genres } =
      this.state.movie;

    const year = new Date(Date(release_date)).getFullYear();

    const { match } = this.props;

    return (
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
