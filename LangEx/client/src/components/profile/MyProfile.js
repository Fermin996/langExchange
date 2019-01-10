import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link }from 'react-router-dom';

class MyProfile extends Component {

  state = {
    user: {}
  }


  componentDidMount(){

    axios
    .get(`/api/profile`)
    .then(profile => {
      const user = profile.data;
       this.setState({user})
       
    })
    .catch(err => {
      console.log(err.response.data ) 
    })
  }

  
  render() {

    var loggedUser = jwt_decode(localStorage.jwtToken)

    return (
      <div>
        <div className='profile-div'>
          <div className="still-trying">
            <img src={loggedUser.imageUrl} alt="profile pic" className="pring" />
            <h2>{loggedUser.name}</h2>
            <div className="language-grid">
              <p>Native Language: <b>{loggedUser.language}</b></p>
               <p> Learning:   <b>{loggedUser.language2}</b></p>
               <Link to="/myProfile/edit" className="still-btn btn btn-lg btn-light">Edit</Link>
            </div>
          </div>
        </div>
        <div className="intro-style">
          <h2>Self-Intro</h2>
          <p>{this.state.user.intro}</p>
        </div>
        <div className="prof-boxes">
          <div className="occ-div">
            <h2>Occupation</h2>
            <p>{this.state.user.occupation}</p>
          </div>
          <div className="int-div">
            <h2>Interests</h2>
            <p>{this.state.user.interests}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MyProfile