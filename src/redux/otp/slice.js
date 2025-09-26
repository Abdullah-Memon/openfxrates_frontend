/**
 * OTP Redux Slice
 * Manages OTP state including request, verification, and status tracking
 */

import { createSlice } from '@reduxjs/toolkit'
import { 
  requestOtpAction, 
  verifyOtpEmailAction, 
} from './action'
import { getOtpPurposeOptions } from '@/utils/enums'

const OTP_PURPOSE = getOtpPurposeOptions()

const initialState = {
  // Loading states
  isRequestingOtp: false,
  isVerifyingOtp: false,
  isResendingOtp: false,
  isCheckingStatus: false,
  
  // Error states
  requestError: null,
  verificationError: null,
  resendError: null,
  statusError: null,
  
  // OTP data
  otpData: {
    email: null,
    otp_purpose: null,
    requestedAt: null,
    expiresAt: null,
    attemptsLeft: null,
    isVerified: false,
    canResend: true,
    resendCooldown: 0
  },
  
  // Verification status
  verificationStatus: {
    [OTP_PURPOSE.EMAIL_VERIFICATION]: {
      isVerified: false,
      verifiedAt: null
    },
    [OTP_PURPOSE.FORGOT_PASSWORD]: {
      isVerified: false,
      verifiedAt: null
    },
    [OTP_PURPOSE.UPDATE_PASSWORD]: {
      isVerified: false,
      verifiedAt: null
    }
  },
  
  // UI helpers
  showOtpInput: false,
  resendTimer: 0
}

export const OtpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    // Clear all OTP data
    clearOtpData: (state) => {
      state.otpData = initialState.otpData
      state.requestError = null
      state.verificationError = null
      state.resendError = null
      state.showOtpInput = false
      state.resendTimer = 0
    },
    
    // Clear specific error
    clearOtpError: (state, { payload }) => {
      const errorType = payload || 'all'
      if (errorType === 'all') {
        state.requestError = null
        state.verificationError = null
        state.resendError = null
        state.statusError = null
      } else {
        state[`${errorType}Error`] = null
      }
    },
    
    // Set OTP input visibility
    setShowOtpInput: (state, { payload }) => {
      state.showOtpInput = payload
    },
    
    // Update resend timer
    updateResendTimer: (state, { payload }) => {
      state.resendTimer = payload
      state.otpData.canResend = payload <= 0
    },
    
    // Reset verification status for specific purpose
    resetVerificationStatus: (state, { payload }) => {
      if (payload && state.verificationStatus[payload]) {
        state.verificationStatus[payload] = {
          isVerified: false,
          verifiedAt: null
        }
      }
    },
    
    // Set OTP data manually (for testing or special cases)
    setOtpData: (state, { payload }) => {
      state.otpData = { ...state.otpData, ...payload }
    }
  },
  extraReducers: builder => {
    // =================================================================
    // REQUEST OTP CASES
    // =================================================================
    builder
      .addCase(requestOtpAction.pending, (state) => {
        state.isRequestingOtp = true
        state.requestError = null
      })
      .addCase(requestOtpAction.fulfilled, (state, { payload }) => {
        state.isRequestingOtp = false
        state.requestError = null
        state.otpData = {
          ...state.otpData,
          email: payload.email,
          otp_purpose: payload.otp_purpose,
          requestedAt: new Date().toISOString(),
          expiresAt: payload.data?.expires_at || null,
          attemptsLeft: payload.data?.attempts_left || 3,
          isVerified: false,
          canResend: false,
          resendCooldown: payload.data?.resend_cooldown || 60
        }
        state.showOtpInput = true
        state.resendTimer = payload.data?.resend_cooldown || 60
      })
      .addCase(requestOtpAction.rejected, (state, { payload }) => {
        state.isRequestingOtp = false
        state.requestError = payload
        state.showOtpInput = false
      })

    // =================================================================
    // VERIFY OTP EMAIL CASES
    // =================================================================
    builder
      .addCase(verifyOtpEmailAction.pending, (state) => {
        state.isVerifyingOtp = true
        state.verificationError = null
      })
      .addCase(verifyOtpEmailAction.fulfilled, (state, { payload }) => {
        state.isVerifyingOtp = false
        state.verificationError = null
        
        // Update OTP data
        state.otpData.isVerified = true
        
        // Update verification status for the specific purpose
        if (state.verificationStatus[payload.otp_purpose]) {
          state.verificationStatus[payload.otp_purpose] = {
            isVerified: true,
            verifiedAt: new Date().toISOString()
          }
        }
        
        // Hide OTP input after successful verification
        state.showOtpInput = false
      })
      .addCase(verifyOtpEmailAction.rejected, (state, { payload }) => {
        state.isVerifyingOtp = false
        state.verificationError = payload
        
        // Decrement attempts if provided
        if (state.otpData.attemptsLeft > 0) {
          state.otpData.attemptsLeft -= 1
        }
      })

    // =================================================================
  }
})

// Export actions
export const {
  clearOtpData,
  clearOtpError,
  setShowOtpInput,
  updateResendTimer,
  resetVerificationStatus,
  setOtpData
} = OtpSlice.actions

// Export selectors
export const otpSelectors = {
  // Loading states
  selectIsRequestingOtp: (state) => state.otp.isRequestingOtp,
  selectIsVerifyingOtp: (state) => state.otp.isVerifyingOtp,
  selectIsResendingOtp: (state) => state.otp.isResendingOtp,
  selectIsCheckingStatus: (state) => state.otp.isCheckingStatus,
  selectIsAnyOtpLoading: (state) => 
    state.otp.isRequestingOtp || 
    state.otp.isVerifyingOtp || 
    state.otp.isResendingOtp || 
    state.otp.isCheckingStatus,
  
  // Error states
  selectRequestError: (state) => state.otp.requestError,
  selectVerificationError: (state) => state.otp.verificationError,
  selectResendError: (state) => state.otp.resendError,
  selectStatusError: (state) => state.otp.statusError,
  selectAnyOtpError: (state) => 
    state.otp.requestError || 
    state.otp.verificationError || 
    state.otp.resendError || 
    state.otp.statusError,
  
  // OTP data
  selectOtpData: (state) => state.otp.otpData,
  selectCurrentEmail: (state) => state.otp.otpData.email,
  selectCurrentPurpose: (state) => state.otp.otpData.otp_purpose,
  selectIsOtpVerified: (state) => state.otp.otpData.isVerified,
  selectCanResendOtp: (state) => state.otp.otpData.canResend,
  selectAttemptsLeft: (state) => state.otp.otpData.attemptsLeft,
  
  // Verification status
  selectVerificationStatus: (state) => state.otp.verificationStatus,
  selectIsEmailVerified: (state) => state.otp.verificationStatus[OTP_PURPOSE.EMAIL_VERIFICATION]?.isVerified || false,
  selectIsForgotPasswordVerified: (state) => state.otp.verificationStatus[OTP_PURPOSE.FORGOT_PASSWORD]?.isVerified || false,
  selectIsUpdatePasswordVerified: (state) => state.otp.verificationStatus[OTP_PURPOSE.UPDATE_PASSWORD]?.isVerified || false,
  
  // UI helpers
  selectShowOtpInput: (state) => state.otp.showOtpInput,
  selectResendTimer: (state) => state.otp.resendTimer
}

export default OtpSlice.reducer