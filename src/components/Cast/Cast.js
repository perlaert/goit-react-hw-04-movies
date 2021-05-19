import axios from 'axios';
import React, { Component } from 'react';
import defaultCastImg from './defaultCastImg.jpeg';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=edaea771b09be1ce746ab8b68de11a9b`,
    );

    this.setState({ cast: response.data.cast });
  }
  render() {
    return (
      <div>
        <h2>Aктерский состав</h2>
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
