import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar/AppBar';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <>
        <AppBar />
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route path={routes.movieDetails} component={MovieDetailsPage} />
          <Route path={routes.movies} component={MoviesPage} />
          <Route component={HomePage} />
        </Switch>
      </>
    );
  }
}

export default App;
