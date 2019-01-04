import React, { Component } from 'react'


class Login extends Component {

  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email:this.state.email,
      password:this.state.password,
    }
    console.log(user)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="logForm">
            <div className="form-group">
              <label for="email">Email address</label>
              <input
              type="email" 
              className="form-control" 
              name="email"
              value={this.state.name}
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
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;