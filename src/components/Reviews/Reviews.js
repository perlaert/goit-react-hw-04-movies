import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moviesApi from '../services/movies-api';
import Error from '../Error/Error';

class Reviews extends Component {
  static props = {
    match: PropTypes.object.isRequired,
  };

  state = {
    reviews: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails = () => {
    const { movieId } = this.props.match.params;
    moviesApi
      .fetchMovieReviews(movieId)
      .then(results => this.setState({ reviews: results }))
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
    const { reviews, error } = this.state;
    return (
      <div>
        <h2>Оброз фильма</h2>
        {error && <Error message="Something went wrong. Try again." />}
        <ul>
          {reviews.length > 0
            ? reviews.map(review => (
                <li key={review.id}>
                  <h3>Author: {review.author}</h3>
                  <p>{review.content}</p>
                </li>
              ))
            : "We don't have any reviews for this movie"}
        </ul>
      </div>
    );
  }
}

export default Reviews;
