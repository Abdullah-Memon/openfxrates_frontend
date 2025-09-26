
import { createAsyncThunk } from '@reduxjs/toolkit'
import { requestOtpApi, verifyOtpEmailApi } from './service'

import toast from 'react-hot-toast'

export const requestOtpAction = createAsyncThunk(
  'otp/request',
  async (payload, { rejectWithValue }) => {
    try {
      
      // Validate required fields
      if (!payload.email || !payload.otp_purpose) {
        const errorMessage = 'Email and OTP purpose are required'
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      }

      const res = await requestOtpApi(payload)
      
      if (res.status === 200 || res.status === 201) {
        const message = res.data?.message || 'OTP sent successfully to your email'
        toast.success(message)
        return { 
          status: res.status, 
          data: res.data,
          email: payload.email,
          otp_purpose: payload.otp_purpose
        }
      } else {
        const errorMessage = res.data?.message || 'Failed to send OTP. Please try again.'
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Network error occurred while sending OTP'
      toast.error(errorMessage)
      console.log('Error in requestOtpAction:', error)
      return rejectWithValue(errorMessage)
    }
  }
)

export const verifyOtpEmailAction = createAsyncThunk(
  'otp/verifyEmail',
  async (payload, { rejectWithValue }) => {
    try {
      
      // Validate required fields
      if (!payload.email || !payload.code || !payload.otp_purpose) {
        const errorMessage = 'Email, OTP code, and purpose are required'
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      }

      const res = await verifyOtpEmailApi(payload)
      
      if (res.status === 200) {
        const message = res.data?.message || 'OTP verified successfully'
        toast.success(message)
        return { 
          status: res.status, 
          data: res.data,
          email: payload.email,
          otp_purpose: payload.otp_purpose,
          verified: true
        }
      } else {
        const errorMessage = res.data?.message || 'Invalid or expired OTP. Please try again.'
        toast.error(errorMessage)
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Network error occurred during OTP verification'
      toast.error(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

