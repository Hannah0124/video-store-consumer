import React from 'react'
import PropTypes from 'prop-types';

// selectMovieCallback={props.selectMovieCallback}
const Movie = (props) => {

  const onSelectMovie = (event) => {
    // console.log("event: ", event.target.value);
    return props.movieCallback({id: props.id, title: props.title, overview: props.overview, imageURL: props.imageUrl, releaseDate: props.releaseDate});
  };


  return (
    <div>
      <img src={props.imageUrl} alt={props.title} />
      <h1>{props.title}</h1>
      <p>{props.overview}</p>
      <p>{props.releaseDate}</p>

      <button onClick={onSelectMovie}>{props.buttonText}</button>
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
