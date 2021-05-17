import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeView from './views/HomeView';
import MoviesView from './views/MoviesView';

class App extends Component {
  render() {
    return (
      <>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              className="NavLink"
              activeClassName="NavLink--active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className="NavLink"
              activeClassName="NavLink--active"
            >
              Movies
            </NavLink>
          </li>
        </ul>

        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/movies" component={MoviesView} />
          <Route component={HomeView} />
        </Switch>
      </>
    );
  }
}

export default App;
