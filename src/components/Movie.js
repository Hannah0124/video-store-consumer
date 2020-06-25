import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

const Movie = (props) => {
  const onSelectMovie = () => {
    return props.movieCallback({id: props.id, title: props.title, overview: props.overview, imageURL: props.imageUrl, releaseDate: props.releaseDate});
  };

  return (
    <div className="movie-container col-3 text-center mb-3 p-3">
      <div className="flipper">
        <div className="front">
          <div className="">
            <img src={props.imageUrl} alt={props.title} className="movie-poster mb-3" /> 
            <h3 className="movie-title">{props.title}</h3>
            <p className="release-date"><strong>Released</strong>: {props.releaseDate}</p>
          </div>
        </div>
        <div className="back d-flex flex-column mx-auto">
          <img src={props.imageUrl} alt={props.title} className="image-background mx-auto" /> 
          <div className="back-container p-3">
            <div className="back-inside-container">
              <p className="movie-overview">{props.overview}</p>
              <button className="button-bg" onClick={onSelectMovie}>{props.buttonText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  movieCallback: PropTypes.func.isRequired
};

export default Movie;
