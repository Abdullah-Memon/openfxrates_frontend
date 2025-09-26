import authAxiosInstance from '@/utils/authAxiosInstance'

export const getPaymentPlansApi = () => {
  return authAxiosInstance
    .get('payment/plans')
    .then(res => res)
    .catch(err => err?.response)
}