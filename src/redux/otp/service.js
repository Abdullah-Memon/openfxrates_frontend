
import authAxiosInstance from '@/utils/authAxiosInstance'

export const requestOtpApi = (payload) => {
  return authAxiosInstance
    .post('otp/request', payload)
    .then(res => res)
    .catch(err => err?.response)
}

export const verifyOtpEmailApi = (payload) => {
  return authAxiosInstance
    .post('otp/verify/email', payload)
    .then(res => res)
    .catch(err => err?.response)
}