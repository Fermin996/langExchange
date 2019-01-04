const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data){
  let errors = {};

  data.interests = !isEmpty(data.interests) ? data.interests: '';

  console.log(data.interests)

  if(Validator.isEmpty(data.interests)){
    errors.interests = 'Interests field required';
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  };
}