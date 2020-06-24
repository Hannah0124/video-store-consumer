import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from './doge-rentals-logo.png';


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
  const[selectedCustomer, setSelectedCustomer] = useState({name: "N/A"});
  const[selectedMovie, setSelectedMovie] = useState({title: "N/A"});
  const[errorMessage, setErrorMessage] = useState(null);
  const[rentalInfo, setRentalInfo] = useState({
    customer: null,
    movie: null,
    checkoutDate: null,
    dueDate: null,
    returned: false
  });

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

  const selectCustomerCallback = (clickedCustomer) => {
    const newCustomer = clickedCustomer
    setSelectedCustomer(newCustomer);      
  }

  // Date - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  // Add date - https://stackoverflow.com/questions/3818193/how-to-add-number-of-days-to-todays-date

  const makeRental = () => {  // movieInfo, customerInfo
    const checkoutDate = new Date();

    const dueDate = new Date(new Date().getTime() + (7 * 24 * 3600 * 1000));

    const newRental = {...rentalInfo}

    newRental.checkoutDate = checkoutDate; 
    newRental.dueDate = dueDate; 
    newRental.movie = selectedMovie;
    newRental.customer = selectedCustomer;

    // useEffect(() => { 
      if (selectedMovie.title && selectedCustomer.id) {
        axios.post(BASE_URL + "rentals/" + selectedMovie.title + "/check-out?customer_id=" + selectedCustomer.id + "&due_date=" + dueDate)
          .then((response) => {
            setRentalInfo(newRental);
            // setCustomers

            setSelectedCustomer({name: "N/A"});
            setSelectedMovie({title: "N/A"});
  
            console.log("response: ", response.data)
            console.log('newRental ', newRental);    
          })
          .catch((error) => {
            // setErrorMessage("error: " + error.cause);
            console.log("failed to save rental: " + error);
          })    
        }
      // }, [customers])
    }
    
  const onFormSubmit = (event) => {
    event.preventDefault();

    // props.findMoviesCallback(query);
    // props.searchMoviesCallback(query);
    makeRental();

    // setQuery({
    //   text: ""
    // });
  };

  // Find - reference
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const selectMovie = (movieInfo) => {
    const currentMovie = movies.find((movie) => {
      return movie.id === movieInfo.id
    });

    console.log('currentMovie ', currentMovie);

    setSelectedMovie(currentMovie);
    makeRental(currentMovie, selectedCustomer);
    // return selectedMovie;
  };

  const addMovie = (movieInfo) => {
    console.log(movieInfo);
    axios.post(BASE_URL + "movies?" + 
      "title=" + movieInfo.title + 
      "&overview=" + movieInfo.overview + 
      "&release_date=" + movieInfo.releaseDate + 
      "&image_url=" + movieInfo.imageURL + 
      "&external_id=" + movieInfo.id
      ).then((response) => {
        let moviesCopy = [...movies];        
        moviesCopy.push({
          id: response.data.id,
          imageUrl: response.data.image_url,
          overview: response.data.overview,
          releaseDate: response.data.release_date,
          title: response.data.title
        });

        setMovies(moviesCopy);
      })
      .catch((error) => {
        setErrorMessage("Failed to add movie: " + error.cause);
      })  
  };

  const removeMovie = () => {
    setSelectedMovie({title: "N/A"});
  };

  const removeCustomer = () => {
    setSelectedCustomer({name: "N/A"});
  };

  return (
    <Router>
      {errorMessage &&
      <div className="alert">
        <h2>{errorMessage}</h2>
      </div>}

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          <img src={logo} alt="dog" className="navbar__logo" />
          Doge Rentals
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to="/" className="nav-link" href="#">Home</Link>
            </li>
            <li class="nav-item">
              <Link to="/search" className="nav-link">Search</Link>
            </li>
            <li class="nav-item">
              <Link to="/library" className="nav-link">Library</Link>
            </li>
            <li class="nav-item">
              <Link to="/customers" className="nav-link">Customers</Link>
            </li>
          </ul>
        </div>
        <form className="navbar-nav selected__items" onSubmit={onFormSubmit}>
          <div className="text-center m-2 selected__item">
            Selected Customer
            <div className="selected__text" onClick={removeCustomer}>
              <span>{selectedCustomer.name} </span>
            </div> 
          </div> 
          <div className="text-center m-2 selected__item">
            Selected Movie 
            <div className="selected__text" onClick={removeMovie}>
              <span>{selectedMovie.title} </span>
            </div> 
          </div> 
          <input type="submit" value="Rent" className="align-self-center text-center btn btn-primary btn-sm selected__submit" onSubmit={onFormSubmit}/>   
        </form>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/search">
          <Search 
            movies={movies}
            addMovieCallback={addMovie}
          />
        </Route>
        <Route exact path="/library">
          <Library 
            // baseUrl={BASE_URL} 
            movies={movies}
            selectMovieCallback={selectMovie}
            // selectedMovie={selectedMovie}
          />
        </Route>
        <Route exact path="/customers">
          <Customers 
            baseUrl={BASE_URL} 
            // customers={customers}
            selectCustomerCallback={selectCustomerCallback}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;


// React Router - https://www.youtube.com/watch?v=hBm5M4u2jLs&amp;index=2