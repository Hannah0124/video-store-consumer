import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import logo from './doge-rentals-logo.png';
// import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';

import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import Customers from './components/Customers';
import CustomerDetails from './components/CustomerDetails';

const BASE_URL = "http://localhost:3000/";

const App = (props) => {
  const[movies, setMovies] = useState([]);
  const[customers, setCustomers] = useState([]);

  // const[movieResults, setMovieResults] = useState([]);
  // const[selectedMovies, setSelectedMovies] = useState([]);

  const[selectedCustomer, setSelectedCustomer] = useState({name: "N/A"});
  const[selectedMovie, setSelectedMovie] = useState({title: "N/A"});
  
  const[errorMessage, setErrorMessage] = useState("");
  const[flash, setFlash] = useState({text: "", type: ""});
  const[rentalInfo, setRentalInfo] = useState({
    customer: null,
    movie: null,
    checkoutDate: null,
    dueDate: null,
    returned: false
  });
  const[rentals, setRentals] = useState([]);

  const addCustomers = () => {
    axios.get(BASE_URL + "customers/")
    .then((response) => {
      const customerObjects = response.data.map((customer, i) => {
        return {
          id: customer.id,
          name: customer.name,
          accountCredit: customer.account_credit,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          postalCode: customer.postal_code,
          moviesCheckedOutCount: customer.movies_checked_out_count,
          phone: customer.phone,
          registeredAt: customer.registered_at,
        }
      });
      setCustomers(customerObjects);
    })
    .catch((error) => {
      setFlash({text: `Failed to add customers: ${error.response.data.errors}`, type: "failure"});

      setTimeout(() => {
        setFlash({text: "", type: ""});
      }, 3000);
    });
  }

  const addMovies = () => {
    axios.get(BASE_URL + "movies/")
    .then((response) => {
      const apiData = response.data;
      const movieObjects = apiData.map((movie, i) => {
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
      setFlash({text: `Failed to add movie: ${error.response.data.errors}`, type: "failure"});

      setTimeout(() => {
        setFlash({text: "", type: ""});
      }, 3000);
    });
  }

  // on initial load, add customers and movies from API
  useEffect(addCustomers, []);
  useEffect(addMovies, []);


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


    if (selectedMovie.title && selectedCustomer.id) {
      axios.post(BASE_URL + "rentals/" + selectedMovie.title + "/check-out?customer_id=" + selectedCustomer.id + "&due_date=" + dueDate)
        .then((response) => {
          setRentalInfo(newRental);

          // TODO
          const rentalsCopy = [...rentals];
          rentalsCopy.push(newRental);
          setRentals(rentalsCopy);


          addCustomers();

          // TODO
          // setSelectedCustomer({name: "N/A"});
          // setSelectedMovie({title: "N/A"});
          setFlash({text: `${selectedMovie.title} has been checked out to ${selectedCustomer.name}!`, type: "success"});
          
          setTimeout(() => {
            setFlash({text: "", type: ""});
          }, 3000);

          console.log("response: ", response.data)
          console.log('newRental ', newRental);    
        })
        .catch((error) => {
          setFlash({text: `Failed to add rental: ${error.response.data.errors}`, type: "failure"});

          setTimeout(() => {
            setFlash({text: "", type: ""});
          }, 3000);
        })    
      }
    }
    
  const onFormSubmit = (event) => {
    event.preventDefault();
    makeRental();
  };

  // Find - reference
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const selectMovie = (movieInfo) => {
    const currentMovie = movies.find((movie) => {
      return movie.id === movieInfo.id
    });

    setSelectedMovie(currentMovie);
    // makeRental(currentMovie, selectedCustomer); do we need this here?
  };

  const selectCustomerCallback = (clickedCustomer) => {
    const newCustomer = clickedCustomer
    setSelectedCustomer(newCustomer);      
  }

  const addMovie = (movieInfo) => {
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

        addMovies();
        setMovies(moviesCopy);

        setFlash({text: `${movieInfo.title} has been added to the rental library!`, type: "success"})

        setTimeout(() => {
          setFlash({text: "", type: ""});
        }, 3000);
      })
      .catch((error) => {          
        setFlash({text: `Failed to add movie: ${error.response.data.errors}`, type: "failure"});

        setTimeout(() => {
          setFlash({text: "", type: ""});
        }, 3000);
      }
    )  
  };

  const removeMovie = () => {
    setSelectedMovie({title: "N/A"});
  };

  const removeCustomer = () => {
    setSelectedCustomer({name: "N/A"});
  };


  // const returnRental = (customerId) => {
  //   const currentCustomer = customers.find((customer) => {
  //     customer.id === customerId;
  //   });

  //   const currentRental = rentals.find((rental) => {
  //     console.log('rental ', rental);
  //     rental.customerId === customerId;
  //   });

  //   const rentalCopy = currentRental;
  //   rentalCopy.returned = true;


  // };

  return (
    <Router>
      {/* {errorMessage &&
      <div className="alert">
        <h2>{errorMessage}</h2>
      </div>} */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link href="/" className="navbar-brand">
          <img src={logo} alt="dog" className="navbar__logo" />
          Doge Rentals
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link">Search</Link>
            </li>
            <li className="nav-item">
              <Link to="/library" className="nav-link">Library</Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className="nav-link">Customers</Link>
            </li>
            <li className="nav-item">
              <Link to="/customerdetails" className="nav-link">Customer Details</Link>
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

      {flash.text && <p className={"flash-" + flash.type}>{flash.text}</p>}
      
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
            movies={movies}
            selectMovieCallback={selectMovie}
          />
        </Route>
        <Route exact path="/customers">
          <Customers 
            baseUrl={BASE_URL} 
            customers={customers}
            selectCustomerCallback={selectCustomerCallback}
          />
        </Route>
        <Route path={`/customerdetails`}>
          <CustomerDetails 
            customers={customers}
            customer={selectedCustomer}
            // rentals={rentals}
            // returnRentalCallback={returnRental}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;


// React Router - https://www.youtube.com/watch?v=hBm5M4u2jLs&amp;index=2