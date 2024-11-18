// import axios from 'axios';

// const API = axios.create({          // This creates a new Axios instance with the specified baseURL.
//   baseURL: 'http://localhost:5000'  // Base URL of our backend API
// });  

// export const login = (formData) => {
//     API.post('/auth/login', formData);  // This sends a POST request to the endpoint /auth/login with formData as the request body using the previously created Axios instance.
// }

// export const signup = (formData) => {
//     API.post('/auth/register', formData);
// }

const baseURL = 'http://localhost:5000';

export const signup = (formData) => {
  return fetch(`${baseURL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Signup error from api:', error);
    throw error; // Re-throw the error to be caught in action creators
  });
};

export const login = (formData) => {
  return fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Login error from api:', error);
    throw error; // Re-throw the error to be caught in action creators
  });
};