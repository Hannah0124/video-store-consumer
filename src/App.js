import React, { Component } from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
// import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import './App.css';

import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import Customers from './components/Customers';


const App = () => {
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
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/library" component={Library} />
        <Route exact path="/customers" component={Customers} />
      </Switch>
    </Router>
  );
};

export default App;


// React Router - https://www.youtube.com/watch?v=hBm5M4u2jLs&amp;index=2