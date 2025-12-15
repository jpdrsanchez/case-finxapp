import axios from 'axios'

export const finxappClient = axios.create({
  baseURL: 'https://finxapp.com/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
