import style from './Error.module.css';
import PropTypes from 'prop-types';

const Error = ({ message }) => {
  return <div className={style.error}>{message}</div>;
};

Error.protoTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
