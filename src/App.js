import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar/AppBar';
import routes from './routes';
import Loader from 'react-loader-spinner';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import(
    './pages/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page" */
  ),
);

class App extends Component {
  render() {
    return (
      <>
        <AppBar />
        <Suspense
          fallback={
            <Loader
              type="BallTriangle"
              color="#e1e2ed"
              height={80}
              width={80}
              className="loader"
            />
          }
        >
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route path={routes.movieDetails} component={MovieDetailsPage} />
            <Route path={routes.movies} component={MoviesPage} />
            <Route component={HomePage} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
