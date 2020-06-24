import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './Movie.css';
import { createPopper } from '@popperjs/core';


// selectMovieCallback={props.selectMovieCallback}
const Movie = (props) => {
  const onSelectMovie = (event) => {
    return props.movieCallback({id: props.id, title: props.title, overview: props.overview, imageURL: props.imageUrl, releaseDate: props.releaseDate});
  };

  return (
    <div class="movie-container col-3 text-center mb-3 p-3">
      <div class="flipper">
        <div class="front">
          <div className="">
            <img src={props.imageUrl} alt={props.title} className="movie-poster mb-3" /> 
            <h3 className="movie-title">{props.title}</h3>
            <p className="release-date"><strong>Released</strong>: {props.releaseDate}</p>
          </div>
        </div>
        <div class="back p-4 d-flex flex-column">
          <p className="movie-overview">{props.overview}</p>
          <button className="button-bg" onClick={onSelectMovie}>{props.buttonText}</button>
        </div>
      </div>
    </div>
  )
}

// // TODO
// Movie.propTypes = {
//   id: PropTypes.number.isRequired,
//   imageUrl: PropTypes.string,
//   overview: PropTypes.string,
//   releaseDate: PropTypes.string,  
//   title: PropTypes.string.isRequired
// };

export default Movie;
