import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.query);

    this.setState({ query: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="Search movies"
          />
          <button type="submit">
            <span>Search</span>
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
