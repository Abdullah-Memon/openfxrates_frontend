// For protected APIs that require authentication
import axios from 'axios'
import Cookies from 'js-cookie'
import { getGetBackendServerLink } from './baseUrl'

const axiosInstance = axios.create({
  baseURL: getGetBackendServerLink(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear all auth data
      Cookies.remove('authToken')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userData')
      sessionStorage.clear() // Clear all session data
      
      // Force reload to clear all application state and redirect to login
      window.location.href = '/sign-in'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance