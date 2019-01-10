import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import logout from './utils/logout';
import jwt_decode from 'jwt-decode';


import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Chat from './components/chat/Chat'
import ProfileEdit from './components/profile/ProfileEdit'
import Profile from './components/profile/Profile'
import ProfileSearch from './components/profile/ProfileSearch'
import MyProfile from './components/profile/MyProfile'

import './App.css';

if (localStorage.jwtToken) {

  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    logout()

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/chat" component={ Chat } />
              <Route exact path="/myProfile" component={ MyProfile } />
              <Route exact path="/myProfile/edit" component={ ProfileEdit } />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/search' component={ProfileSearch} />
            </div>
            <Footer />
          </div>
        </Router>
    );
  }
}

export default App;
