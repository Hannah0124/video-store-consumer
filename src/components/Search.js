import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import MovieGrid from './MovieGrid';

const Search = (props) => {
  const BASE_URL = "http://localhost:3000/";
  
  const [query, setQuery] = useState({});
  const [movies, setMovies] = useState([]);

  // let movieComponents = [];
    
  const onSearch = query => {    
    axios.get(BASE_URL + "movies?query=" + query)
      .then((response) => {
        if (response.data.length === 0) {
          console.log("no movies found");
        } else {
          let moviesCopy = response.data.map(movie => {
            return movie;
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
    const queryCopy = query;
    queryCopy[event.target.name] = event.target.value;
    setQuery(queryCopy);
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
    setQuery({});
  }
  
  return (
    // after making search, can add a movie from results to rental library (local API)
    <div>
      <form className="" onSubmit={onSubmit}>
      <header className="">Search the Database</header>
        <div className="">
          <input
            className=""
            type="text"
            name="text"
            placeholder="search here"
            value={query.text}
            onChange={onInputChange}
          />
          <input type="submit" value="Search" className="" onSubmit={onSubmit}/>
        </div>
      </form>
      <MovieGrid
        moviesList={movies}
      />
    </div>
  )}

export default Search