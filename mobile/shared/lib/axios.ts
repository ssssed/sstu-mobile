import axios from "axios";

export const BASE_URL = 'http://10.0.2.2:8000/api'

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})