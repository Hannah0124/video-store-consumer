import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import Customers from './components/Customers';


const App = () => {
  return (
    <div>
      {/* navigation for home, movie search, movie library, customer list */}
      {/* movie and customer selection will be visible across each page as you navigate the app */}
      {/* if customer & movie are selected, can check out selected movie for the selected customer (checkout is between ONE movie and ONE customer) */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/library" component={Library} />
        <Route exact path="/customers" component={Customers} />
      </Switch>
    </div>
  );
};

export default App;


// React Router - https://www.youtube.com/watch?v=hBm5M4u2jLs&amp;index=2