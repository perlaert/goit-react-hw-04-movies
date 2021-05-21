import React from 'react';
import style from './MoviePreview.module.css';

const MoviePreview = ({ movieImg, title }) => {
  return (
    <div class="card">
      <div className={style.MoviePreview_thumb}>
        <img src={movieImg} alt={title} class="img-card" />
      </div>
      <div class="cardBody">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default MoviePreview;
