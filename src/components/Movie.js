import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './Movie.css';
import { createPopper } from '@popperjs/core';


// selectMovieCallback={props.selectMovieCallback}
const Movie = (props) => {

  const[movieFront,setmovieFront] = useState("active");
  const[movieBack,setmovieBack] = useState("inactive");
  const[toggled,setToggled] = useState(false);

  const onSelectMovie = (event) => {
    return props.movieCallback({id: props.id, title: props.title, overview: props.overview, imageURL: props.imageUrl, releaseDate: props.releaseDate});
  };

  const toggleView = () => {
    (movieFront === "active") ? setmovieFront("inactive") : setmovieFront("active");
    (movieBack === "active") ? setmovieBack("inactive") : setmovieBack("active");
  }

  return (
    <div className="movie-card p-3 col-3 text-center align-self-center" key={props.id} onMouseEnter={toggleView} onMouseLeave={toggleView}>
      <div className="flipper">
        <div className={movieFront + " movie-front col-12"}>
          <img src={props.imageUrl} alt={props.title} className="movie-poster mb-3" /> 
          <h3 className="movie-title">{props.title}</h3>
          <p className="release-date"><strong>Released</strong>: {props.releaseDate}</p>
        </div>
        <div className={movieBack + " movie-back col-12 align-self-center p-3"}>
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
