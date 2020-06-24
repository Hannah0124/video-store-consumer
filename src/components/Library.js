import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';

import Movie from './Movie';

const Library = (props) => {

  const movieComponents = props.movies.map((movie) => {
    return (
      <section key={movie.id}>
        <Movie 
          id={movie.id}
          imageUrl={movie.imageUrl}
          overview={movie.overview}
          releaseDate={movie.releaseDate}
          title={movie.title}
          buttonText={"Select movie"}
          movieCallback={props.selectMovieCallback}
          // addMovieCallback={props.addMovieCallback}
        />
      </section>
    );
  });


  return (
    // can see a list of all movies in the rental library - make a call to the internal video store API?

    // can select a movie from the rental library
    // selection will then be visible across the app - use a state to store this info?
    <div className="library-container">
      <h1 className="library-title">Library</h1>
      <div className="movie">{movieComponents}</div>
    </div>
  );
};


// TODO

// Library.propTypes = {
//   baseUrl: PropTypes.string.isRequired,
  // movies: PropTypes.array.isRequired
// };

export default Library;