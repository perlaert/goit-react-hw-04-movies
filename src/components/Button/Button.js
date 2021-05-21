import style from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button type="button" className={style.Button} onClick={onClick}>
      Load more
    </button>
  );
};

Button.protoTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
