import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

export default class ProfileEdit extends Component {


    state={
      intro:'',
      occupation:'',
      interests:'',
      age:'',
      errors:{}
    }
  

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();

    const profileFields = {...this.state}

    console.log(profileFields)

    axios
    .post('/api/profile', profileFields)
    .then(profile => {
      window.location.href = '/myProfile';
    })
    .catch(err => {
      this.setState({ errors: err.response.data });
      console.log(err.response.data ) 
    })
  }

  render() {
    const {errors} = this.state;

    return (
      <div>
      <h2 className="aytchetwo">Create and Edit Your Profile!</h2>
      <form onSubmit={this.onSubmit} className="prof-input">
        <div className="form-group">
          <label htmlFor="intro">Self intro</label>
          <input 
          type="text" 
          className="form-control" 
          id="intro"
          name="intro" 
          placeholder="Write something about yourself :-)" 
          value={this.state.intro}
          onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="occupation">Occupation</label>
          <input 
          type="text" 
          className="form-control" 
          id="occupation"
          name="occupation"
          value={this.state.occupation}
          onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="interests">Interests</label>
          <input 
          type="text" 
          className={classnames('form-control', {
            'is-invalid': errors.interests
          })} 
          id="interests" 
          name='interests'
          value={this.state.interests}
          onChange={this.onChange}/>
          {errors.interests && (<div className="invalid-feedback">{errors.interests}</div>)}  
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input 
          type="text" 
          className="form-control" 
          id="Age" 
          name="age"
          value={this.state.age}
          onChange={this.onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Done</button>
      </form>
      </div>
    )
  }
}
