import axios from 'axios';
import React, { Component } from 'react';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=edaea771b09be1ce746ab8b68de11a9b`,
    );

    this.setState({ reviews: response.data.results });
  }
  render() {
    const { reviews } = this.state;
    return (
      <div>
        <h2>Оброз фильма</h2>
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
