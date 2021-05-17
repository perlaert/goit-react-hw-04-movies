import axios from 'axios';
import React, { Component } from 'react';

class HomeView extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    // const apiKey = 'edaea771b09be1ce746ab8b68de11a9b';

    // https://developers.themoviedb.org/3/trending/get-trending?api_key=edaea771b09be1ce746ab8b68de11a9b

    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=edaea771b09be1ce746ab8b68de11a9b',
    );

    console.log(response.data.results);

    this.setState({
      movies: response.data.results,
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <>
        <h1>Trending today</h1>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomeView;
