import { createSlice } from '@reduxjs/toolkit'
import { getPaymentPlansAction } from './action'

const initialState = {
  plans: [],
  isLoading: false,
  error: null
}

export const PaymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearPlans: (state) => {
      state.plans = []
    }
  },
  extraReducers: builder => {
    // Get payment plans cases
    builder
      .addCase(getPaymentPlansAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getPaymentPlansAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.plans = payload.data
        state.error = null
      })
      .addCase(getPaymentPlansAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
  }
})

export const { clearError, clearPlans } = PaymentSlice.actions
export default PaymentSlice.reducer