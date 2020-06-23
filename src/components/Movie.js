import React from 'react'
import PropTypes from 'prop-types';


const Movie = (props) => {
  return (
    <div>
      <img src={props.imageUrl} alt={props.title} />
      <h1>{props.title}</h1>
      <p>{props.overview}</p>
      <p>{props.releaseDate}</p>

      <button>Select Movie</button>
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
