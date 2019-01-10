import setAuthToken from './setAuthToken'

const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
};

export default logout