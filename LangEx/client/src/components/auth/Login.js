import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import setAuthToken from '../../utils/setAuthToken';


class Login extends Component {

  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      errors: {}
    }
  }

  componentDidMount(){
    if(localStorage.jwtToken){
      this.props.history.push('/myProfile')
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

    axios
      .post('/api/users/login', user)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token); 

        window.location.href = '/myProfile';
      })
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="logForm">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
              type="email" 
              className={classnames('form-control', {
                'is-invalid': errors.email
              })} 
              name="email"
              value={this.state.name}
              onChange={this.onChange}
              aria-describedby="emailHelp"
              placeholder="Enter email" />
              {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}  
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
              type="password" 
              className={classnames('form-control', {
                'is-invalid': errors.password
              })}
              name="password"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Password" />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}  
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;