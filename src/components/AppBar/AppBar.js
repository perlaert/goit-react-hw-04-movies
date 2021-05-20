import Navigation from '../Navagation/Navigation';
import style from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={style.AppBar}>
      <Navigation />
    </header>
  );
};

export default AppBar;
