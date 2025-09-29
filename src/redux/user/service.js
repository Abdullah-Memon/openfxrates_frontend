import authAxiosInstance from '@/utils/authAxiosInstance'

export const loginApi = payload => {
  return authAxiosInstance
    .post('auth/login', payload)
    .then(res => {
      // Let the Redux action handle response validation
      // Just return the response as-is for successful HTTP requests
      return res
    })
    .catch(err => {
      // For HTTP error responses (400, 401, 500, etc.), re-throw the error
      // This ensures failed login attempts are properly caught by Redux action
      console.error('Login API Error:', err)
      throw err
    })
}

export const registerApi = payload => {
  return authAxiosInstance
    .post('auth/signup', payload)
    .then(res => res)
    .catch(err => {
      // Re-throw the error so it can be properly handled by Redux
      throw err
    })
}

export const getUserProfileApi = () => {
  return authAxiosInstance
    .get('auth/profile')
    .then(res => res)
    .catch(err => {
      // Re-throw the error so it can be properly handled by Redux
      throw err
    })
}