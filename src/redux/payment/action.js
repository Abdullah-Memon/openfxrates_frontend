import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPaymentPlansApi } from './service'
import toast from 'react-hot-toast'

export const getPaymentPlansAction = createAsyncThunk(
  'payment/getPlans',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPaymentPlansApi()
      
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        return { status: res.status, data: res.data.data }
      } else {
        const errorMessage = res?.data?.message || 'Failed to fetch payment plans'
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = 'Network error occurred while fetching payment plans'
      toast.error(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)