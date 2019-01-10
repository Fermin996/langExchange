import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames'

class Register extends Component {

  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      language:'',
      language2:'',
      country:'',
      errors:{}
    }
  }

  componentDidMount(){
    if(localStorage.jwtToken){
      console.log('worked')
      this.props.history.push('/dash')
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {...this.state}

    axios
      .post('/api/users/register', newUser)
      .then(res => {
        this.props.history.push('/login') 
      })
      .catch(err => this.setState({ errors: err.response.data }));
    //this.props.registerUser(newUser)

  }

  render() {

    const { errors } = this.state;

    return (
      <div>
        <form className="regForm" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
              type="text" 
              className={classnames('form-control', {
                'is-invalid': errors.name
              })} 
              name="name" 
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Name" />
              {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}  
            </div>
            
            <div className="form-group">
              <label>Email address</label>
              <input 
              type="email"
              className={classnames('form-control', {
                'is-invalid': errors.email
              })}  
               name="email" 
               value={this.state.email}
               onChange={this.onChange}
               aria-describedby="emailHelp" 
               placeholder="Enter email" />
               {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}  
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
              type="password" 
              className={classnames('form-control', {
                'is-invalid': errors.password
              })} 
              name="password"
              value={this.state.password} 
              onChange={this.onChange}
              placeholder="Password" />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}  
            </div>

            <div className="form-group">
              <label>Repeat Password</label>
              <input 
              type="password" 
              className={classnames('form-control', {
                'is-invalid': errors.password2
              })}  
              name="password2" 
              value={this.state.password2} 
              onChange={this.onChange}            
              placeholder="Repeat Password" />
              {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}  
            </div>

            <div className="form-group">
              <label>Native Language</label>
              <input 
              type="text" 
              className={classnames('form-control', {
                'is-invalid': errors.language
              })}  
              name="language" 
              value={this.state.language}
              onChange={this.onChange}
              placeholder="Native Language" />
              {errors.language && (<div className="invalid-feedback">{errors.language}</div>)}  
            </div>

            <div className="form-group">
              <label>I want to Practice</label>
              <input 
              type="text" 
              className={classnames('form-control', {
                'is-invalid': errors.language2
              })} 
              name="language2" 
              value={this.state.language2}
              onChange={this.onChange}
              placeholder="Type the language you want to practice" />
              {errors.language2 && (<div className="invalid-feedback">{errors.language2}</div>)}  
            </div>

            <div className="form-group">
              <label>Country of Origin</label>
              <input 
              type="text" 
              className={classnames('form-control', {
                'is-invalid': errors.country
              })} 
              name="country" 
              value={this.state.country}
              onChange={this.onChange}
              placeholder="ex: United States" />
              {errors.country && (<div className="invalid-feedback">{errors.country}</div>)}  
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>        
      </div>
    )
  }
}

// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors
// })

export default Register;