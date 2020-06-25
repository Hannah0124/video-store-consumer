import React from 'react';
import PropTypes from 'prop-types';
import './Library.css';

import Movie from './Movie';

const Library = (props) => {

  const movieComponents = props.movies.map((movie) => {
    return (
      <Movie 
        key={movie.id}
        id={movie.id}
        imageUrl={movie.imageUrl}
        overview={movie.overview}
        releaseDate={movie.releaseDate}
        title={movie.title}
        buttonText={"Select movie"}
        movieCallback={props.selectMovieCallback}
      />
    );
  });


  return (
    // can see a list of all movies in the rental library - make a call to the internal video store API?

    // can select a movie from the rental library
    // selection will then be visible across the app - use a state to store this info?
    <div className="library-container container">
      <h1 className="library-title">Library</h1>
      <div className="all-movies justify-content-center">{movieComponents}</div>
    </div>
  );
};


Library.propTypes = {
  movies: PropTypes.array.isRequired,
  selectMovieCallback: PropTypes.func.isRequired,
};

            

export default Library;