import { NavLink } from 'react-router-dom';
import routes from '../../routes';

const Navigation = () => {
  return (
    <div>
      <nav>
        <NavLink
          exact
          to={routes.home}
          className="NavLink"
          activeClassName="NavLink--active"
        >
          Home
        </NavLink>

        <NavLink
          to={routes.movies}
          className="NavLink"
          activeClassName="NavLink--active"
        >
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
