import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import logout from '../../utils/logout';

 class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    logout()
    window.location.href = '/';
  }
  

  render() {

    const authLinks = (
      <div className="navbar-nav">
        <a href="localhost:3000" onClick={this.onLogoutClick} className="nav-item nav-link">Logout</a>
        <Link className="nav-item nav-link" to="/myProfile">Profile</Link>
        <Link className="nav-item nav-link" to="/search">Search Users</Link>
      </div>
    );

    const guestLinks = (
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
        <Link className="nav-item nav-link" to="/register">Sign Up</Link>
      </div>
    );

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">SlangSwap</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      {localStorage.jwtToken ? authLinks : guestLinks}
      </div>
    </nav>
    )
  }
}

export default Navbar