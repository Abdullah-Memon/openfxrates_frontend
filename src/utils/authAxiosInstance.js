// For authentication APIs (login, register, etc.)
import axios from 'axios'
import { getGetBackendServerLink } from './baseUrl'

const authAxiosInstance = axios.create({
  baseURL: getGetBackendServerLink(),
  headers: {
    'Content-Type': 'application/json'
  }
})

authAxiosInstance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

authAxiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export default authAxiosInstance