import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Search.css';

import Movie from './Movie';

const Search = (props) => {
  const BASE_URL = "https://doge-rental.herokuapp.com/";
  
  const [query, setQuery] = useState({text: ""});
  const [movies, setMovies] = useState([]);
    
  const onSearch = query => {    
    axios.get(BASE_URL + "movies?query=" + query)
      .then((response) => {
        if (response.data.length === 0) {
          console.log("no movies found");
        } else {
          let moviesCopy = response.data.map(movie => {
            return (
              // <section key={movie.external_id}>
                <Movie 
                  key={movie.external_id}
                  id={movie.external_id}
                  imageUrl={movie.image_url}
                  overview={movie.overview}
                  releaseDate={movie.release_date}
                  title={movie.title}
                  buttonText={"Add movie"}
                  movieCallback={props.addMovieCallback}
                />
              // </section>
            );
          });
          setMovies(moviesCopy);
        }
      })
      .catch((error) => {
        // setErrorMessage("error: " + error.cause);
        console.log("failed search: " + error);
      })    
    }
    
  const onInputChange = event => {
    setQuery({text: event.target.value});
  }

  const onSubmit = event => {
    event.preventDefault();

    // to ensure users can never send a bad request
    if (query.text === "") {
      alert("To make a search, please enter some text!");
      return;
    };    

    onSearch(query.text);

    // clear text fields for next submission
    setQuery({text: ""});
  }
  
  return (
    // after making search, can add a movie from results to rental library (local API)
    <div className="search-container container">
      <form className="" onSubmit={onSubmit}>
      <header className="search-box-title">Search the Database</header>
        <div className="search-box-container">
          <input
            className="search-box"
            type="text"
            name="text"
            placeholder="search here"
            value={query.text}
            onChange={onInputChange}
          />
          <input type="submit" value="Search" className="search-btn" onSubmit={onSubmit}/>
        </div>
      </form>
      <div className="all-movies justify-content-center container">
        {movies}
      </div>
    </div>
  )};



Search.propTypes = {
  movies: PropTypes.array.isRequired,
  addMovieCallback: PropTypes.func.isRequired
};


export default Search;