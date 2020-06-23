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


const App = () => {
  // const[cards, setCards] = useState([]);
  // const[errorMessage, setErrorMessage] = useState(null);
  // BASE_URL = "http://localhost:3000/movies/Psycho";


  useEffect(() => {
    axios.get("http://localhost:3000/movies/Psycho")
    .then((response) => {
      // const apiData = response.data;

      console.log("hey", response)

      // const cardObjects = apiData.map((cardWrapper, i) => {
      //   return {
      //     id: cardWrapper.card.id,
      //     text: cardWrapper.card.text,
      //     emoji: cardWrapper.card.emoji
      //   }
      // });
      // setCards(cardObjects);
      })
      .catch((error) => {
        console.log("error: ", error.message)
        // setErrorMessage(error.message);
      });
  }, []);

  return (
    <Router>
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

      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/search"><Search /></Route>
        <Route exact path="/library"><Library /></Route>
        <Route exact path="/customers"><Customers /></Route>
      </Switch>
    </Router>
  )
}

export default App;


// React Router - https://www.youtube.com/watch?v=hBm5M4u2jLs&amp;index=2