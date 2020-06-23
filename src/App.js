import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
// import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';

import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import Customers from './components/Customers';

const BASE_URL = "http://localhost:3000/";

const App = (props) => {
  const[movies, setMovies] = useState([]);
  const[movieResults, setMovieResults] = useState([]);
  const[selectedMovies, setSelectedMovies] = useState([]);
  const[selectedCustomer, setSelectedCustomer] = useState();
  const[selectedCustomerName, setSelectedCustomerName] = useState();
  const[errorMessage, setErrorMessage] = useState(null);

  // "http://localhost:3000/movies/Psycho";

  useEffect(() => {
    axios.get(BASE_URL + "movies/")
    
    .then((response) => {
      const apiData = response.data;
      // console.log("library:", apiData);

      const movieObjects = apiData.map((movie, i) => {
        // console.log("movie: ", movie);
        return {
          // externalId: movie.external_id,
          id: movie.id,
          imageUrl: movie.image_url,
          overview: movie.overview,
          releaseDate: movie.release_date,
          title: movie.title
        }
      });
      setMovies(movieObjects);
      })

      .catch((error) => {
        // console.log("error: ", error.message)
        setErrorMessage(error.message);
      });
  }, [movieResults]);

  const onClickCallback = (clickedCustomer) => {
    const newCustomer = clickedCustomer
    setSelectedCustomer(newCustomer);  
    setSelectedCustomerName(newCustomer.name);  
  }

  return (
    <Router>
      {errorMessage &&
      <div className="validation-errors-display__list">
        <h2>{errorMessage}</h2>
      </div>}

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/library">Library</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
        </ul>
      </nav>

      <h2>Selected Customer: {selectedCustomerName}</h2>

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/search">
          <Search 
            movies={movies}
          />
        </Route>
        <Route exact path="/library">
          <Library 
            // baseUrl={BASE_URL} 
            movies={movies}
          />
        </Route>
        <Route exact path="/customers">
          <Customers 
            baseUrl={BASE_URL} 
            onClickCallback={onClickCallback}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;


// React Router - https://www.youtube.com/watch?v=hBm5M4u2jLs&amp;index=2