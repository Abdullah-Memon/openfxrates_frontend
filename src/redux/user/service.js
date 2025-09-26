import authAxiosInstance from '@/utils/authAxiosInstance'

export const loginApi = payload => {
  return authAxiosInstance
    .post('auth/login', payload)
    .then(res => res)
    .catch(err => err?.response)
}

export const registerApi = payload => {
  return authAxiosInstance
    .post('auth/signup', payload)
    .then(res => res)
    .catch(err => err?.response)
}

export const getUserProfileApi = () => {
  return authAxiosInstance
    .get('auth/profile')
    .then(res => res)
    .catch(err => err?.response)
}