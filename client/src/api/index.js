import axios from "axios";
//for local -> http://localhost:5000

// creating axio calls to backend API 
// Set config defaults when creating the instance
export const baseURL='http://localhost:4000';
const API = axios.default.create({
    baseURL: baseURL
  });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export default API;