const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data){
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name: '';
  data.email = !isEmpty(data.email) ? data.email: '';
  data.password = !isEmpty(data.password) ? data.password: '';
  data.password2 = !isEmpty(data.password2) ? data.password2: '';
   data.language = !isEmpty(data.language) ? data.language: '';
  data.language2 = !isEmpty(data.language2) ? data.language2: '';
  data.country = !isEmpty(data.country) ? data.country: '';

  if(!Validator.isLength(data.name, { min:3, max:30 })){
    errors.name = 'Name must be between 3 and 30 characters';
  }

  if(Validator.isEmpty(data.name)){
    errors.name = 'Name field required';
  }

  if(Validator.isEmpty(data.email)){
    errors.email = 'Email field required';
  }

  if(!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid'
  }
  
  if(!Validator.isLength(data.password, { min:6, max:30 })){
    errors.password = 'Password must be at least 6 characters';
  }

  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field required';
  }

  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords must match'
  }

  if(Validator.isEmpty(data.language)){
    errors.language = 'Native language field required';
  }

  if(Validator.isEmpty(data.language2)){
    errors.language2 = 'Languge of practice required';
  }

  if(Validator.isEmpty(data.country)){
    errors.country = 'Country field required';
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  };
}

