import React, { Component } from 'react'
import axios from 'axios';

class Register extends Component {

  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:''
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email:this.state.email,
      password:this.state.password,
      password2:this.state.password2,
      language:this.state.language,
      language2:this.state.language2,
      country:this.state.country
    }
    axios.post('/api/users/register', newUser)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  render() {
    return (
      <div>
        <form className="regForm" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="name">Name</label>
              <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Name" />
            </div>
            
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input 
              type="email"
               className="form-control" 
               name="email" 
               value={this.state.email}
               onChange={this.onChange}
               aria-describedby="emailHelp" 
               placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label for="password">Password</label>
              <input 
              type="password" 
              className="form-control" 
              name="password"
              value={this.state.password} 
              onChange={this.onChange}
              placeholder="Password" />
            </div>

            <div className="form-group">
              <label for="password2">Repeat Password</label>
              <input 
              type="password" 
              className="form-control" 
              name="password2" 
              value={this.state.password2} 
              onChange={this.onChange}            
              placeholder="Repeat Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>        
      </div>
    )
  }
}

export default Register;