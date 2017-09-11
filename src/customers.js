import axios from 'axios';
import apiURL from './api.js';

export function getCustomerList () {
  return axios.get(apiURL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function postCustomer (newUser) {
  return axios.post(apiURL, newUser)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getCustomer (id) {
  return axios.get(apiURL + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function updateCustomer (id, customerObj) {
  return axios.patch(apiURL + id, customerObj)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function deleteCustomer (id) {
  return axios.delete(apiURL + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
