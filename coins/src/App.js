import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'
import './App.css';

import Navbar from './components/Navbar'
import Home from './components/Home'
import Coins from './components/Coins'
import SingleCoin from './components/SingleCoin'
import Register from './components/Register'
import Login from './components/Login'
import Portfolio from './components/Portfolio'
import SinglePortfolio from './components/SinglePortfolio'

function App() {
  return (

    <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login}/>
      <Route exact path="/coins" component={Coins} />
      <Route path="/coins/:id" component={SingleCoin} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard/:userID" component={Portfolio} />
      <Route path="/portfolio/:portID" component={SinglePortfolio} />
    </Switch>

  </BrowserRouter>
  );
}

export default App;
