import React from 'react';
import PropTypes from 'prop-types';
import style from './MoviePreview.module.css';

const MoviePreview = ({ movieImg, title }) => {
  return (
    <div>
      <div className={style.MoviePreview_thumb}>
        <img src={movieImg} alt={title} />
      </div>
      <div>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

MoviePreview.protoType = {
  movieImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MoviePreview;
