import axios from 'axios';

const http = axios.create({
  baseURL:'https://ateliware-backend-dev-hiring.herokuapp.com/',
  timeout:30000,
})

console.log(http.get('/repos'));