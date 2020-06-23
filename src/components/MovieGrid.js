import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Movie from './Movie';
// import NewCardForm from './NewCardForm';

const MovieGrid = props => {

  const allMovies = (props.moviesList.map((movie) => {
    return (
      <section key={movie.external_id}>
        <Movie 
          id={movie.external_id}
          imageUrl={movie.image_url}
          overview={movie.overview}
          releaseDate={movie.release_date}
          title={movie.title}
          // deleteCardCallback={deleteMovie}
        />
      </section>
    );
  }));

  return (
    <div className="">
      {/* {props.errorMessage ? <ul className="validation-errors-display"><li className="validation-errors-display__list">{props.errorMessage}</li></ul> : ''} */}
      {allMovies}
    </div>
  )
}

export default MovieGrid;
