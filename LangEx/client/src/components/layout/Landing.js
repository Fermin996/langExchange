import React, { Component } from 'react'
import { Link }from 'react-router-dom';

class Landing extends Component {
  render() {

    const guestLand = (
      <div className="centrify text-center">
              <h1 className="display-3">SlangSwap
              </h1>
              <p className="lead">Learn a Language, Connect Internationally</p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
              <Link to="/login" className="btn btn-lg btn-light">Login</Link>
            </div>
    );

    const authLand = (
      <div className="centrify-alt text-center">
              <h1 className="display-5">Want to Practice a Language?
              </h1>
              <p className="lead">Find A Language partner to practice with!</p>
              <hr />
              <Link to="/search" className="btn btn-lg btn-info mr-2">Search</Link>
            </div>
    );

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              {localStorage.jwtToken ? authLand : guestLand}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;