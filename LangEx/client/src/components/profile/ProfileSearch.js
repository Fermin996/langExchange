import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode';

class ProfileSearch extends Component {

  state = {
    users: {userList:[]}
  }


  componentDidMount(){

    axios.get('/api/profile/all')
    .then(profiles => {
      this.setState({
        userList: profiles.data
      })
    })
    .catch(err => {
      console.log(err.response.data) 
    })
  }

  onChange = (e) => {
   
    this.state.userList.forEach(user => {

      

      if(e.target.value !== '' && e.target.value === user.user.language){
        return 
      }else{
        console.log('working')
        console.log(user.user)
        return user.user = null;
      }
    })
  }


  render() {

    if(!this.state.userList) return <p>LOADING</p>

    const decoded = jwt_decode(localStorage.jwtToken)
    var loggedUser = decoded;

    return (
      <div>
        {this.state.userList.map((user, index) => {
          if(user.user.language === loggedUser.language2){
          return (
            <div className="card" key={user._id}>
            <img src={user.user.imageUrl} className="card-adjust" alt="profile pic" />
              <div className="card-body">
                <h5 className="card-title"><Link to={`/profile/${user.user._id}`}>{user.user.name}</Link></h5>
                <p className="card-text">{user.intro}</p>
              </div>
            </div>
          )
         }else{
           return(<p key={user._id}></p>)
         }
        })}
      </div>
    )
  }
}

export default ProfileSearch
