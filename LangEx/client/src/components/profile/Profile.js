import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Profile extends Component {

  state = {
    user: {}
  }

  componentWillMount(){
    const { id } = this.props.match.params

    axios
    .get(`/api/profile/user/${id}`)
    .then(profile => {
      const x = profile.data;
       this.setState({user: x})
    })
    .catch(err => {
      console.log(err.response.data ) 
    })

  }
  
  render() {



    // let { profileFields } = this.state;
    // console.log(this.state)
    // console.log(profileFields)

    let {user} = this.state.user
    if (!user) return <p>LOADING</p>


    return (
      <div>
        <div>
        <div className='profile-div'>
          <div className="still-trying">
            <img src={user.imageUrl} alt="profile pic" className="pring" />
            <h2>{user.name}</h2>
            <div className="language-grid">
              <p>Native Language:<b>{user.language}</b></p>
               <p> Learning:   <b>{user.language2}</b></p>
               <Link to="/chat" className="still-btn btn btn-lg btn-light">Chat</Link>
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
      </div>
    )
  }
}

export default Profile