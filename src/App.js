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
  const[selectedCustomer, setSelectedCustomer] = useState({});
  const[selectedMovie, setSelectedMovie] = useState({});
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

      <div>
        <form className="" onSubmit={onFormSubmit}>
        {/* <header className="">Search the Database</header> */}
        
          <div>
            <h2>Selected Customer: {selectedCustomer.name}</h2>
            <button className="">Remove Customer</button>
          </div>

          <div>
            <h2>Selected Movie: {selectedMovie.title}</h2>
            <button className="">Remove Movie</button>
          </div>

          <input type="submit" value="Make Rental" className="" onSubmit={onFormSubmit}/>   

        </form>
      </div>

      

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