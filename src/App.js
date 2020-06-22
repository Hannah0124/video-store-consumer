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