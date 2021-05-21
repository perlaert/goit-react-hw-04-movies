import React, { Component } from 'react';
import style from './SearchBar.module.css';

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
      <div className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="Search movie"
            className={style.SearchFormInput}
          />
          <button className={style.SearchFormButton} type="submit"></button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
