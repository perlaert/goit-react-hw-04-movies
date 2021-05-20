import React, { Component } from 'react';
import defaultCastImg from './defaultCastImg.jpg';
import moviesApi from '../services/movies-api';
import Error from '../Error/Error';

class Cast extends Component {
  state = {
    cast: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails = () => {
    const { movieId } = this.props.match.params;
    moviesApi
      .fetchMovieCast(movieId)
      .then(cast => this.setState({ cast: cast }))
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
    return (
      <div>
        <h2>Aктерский состав</h2>
        {this.state.error && (
          <Error message="Something went wrong. Try again." />
        )}
        <ul>
          {this.state.cast.map(item => (
            <li key={item.id}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
                    : defaultCastImg
                }
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Cast;
