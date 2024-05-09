import axios from "axios";

export const request = axios.create({
  baseURL: 'http://10.0.2.2:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})