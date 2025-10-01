'use client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { ValidationSchemas } from '@/utils/validations';
import getCompanyLogo from "@/helper/Logo";
import { requestOtpAction, verifyOtpEmailAction } from '@/redux/otp/action';
import { getOtpPurposeOptions } from '@/utils/enums';
import { setUserInfoReducer, logoutAction } from '@/redux/user/slice';

const VerificationMainPage = ({purpose, onClose, onSuccess}) => {
  // Steps: 'GET_OTP' -> 'VERIFY_OTP'
  const [currentStep, setCurrentStep] = useState('GET_OTP');
  const [email, setEmail] = useState('');
  const [getOtpLoading, setGetOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(true); // Default true to show "Go Back" if we can't determine
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.otp);

  const validationSchema = ValidationSchemas.otpVerification();

  // Helper function to get purpose-specific content
  const getPurposeContent = () => {
    switch (purpose) {
      case getOtpPurposeOptions().EMAIL_VERIFICATION:
        return {
          title: 'Verify Your Email',
          getOtpDescription: 'We will send a 6-character verification code to your registered email address. Click the button below to receive your verification code.',
          verifyDescription: 'We have sent a 6-character verification code to your email address. Please enter it below to verify your account.',
          successMessage: 'Email verified successfully!'
        };
      case getOtpPurposeOptions().FORGOT_PASSWORD:
        return {
          title: 'Reset Your Password',
          getOtpDescription: 'We will send a 6-character verification code to your registered email address. Click the button below to receive your password reset code.',
          verifyDescription: 'We have sent a 6-character verification code to your email address. Please enter it below to reset your password.',
          successMessage: 'Code verified successfully!'
        };
      case getOtpPurposeOptions().UPDATE_PASSWORD:
        return {
          title: 'Update Your Password',
          getOtpDescription: 'We will send a 6-character verification code to your registered email address. Click the button below to receive your verification code.',
          verifyDescription: 'We have sent a 6-character verification code to your email address. Please enter it below to update your password.',
          successMessage: 'Code verified successfully!'
        };
      default:
        return {
          title: 'Verify Your Account',
          getOtpDescription: 'We will send a 6-character verification code to your registered email address. Click the button below to receive your verification code.',
          verifyDescription: 'We have sent a 6-character verification code to your email address. Please enter it below to verify your account.',
          successMessage: 'Verification successful!'
        };
    }
  };

  const content = getPurposeContent();

  // Get email from localStorage on component mount
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        if (parsedUserInfo.email) {
          setEmail(parsedUserInfo.email);
        }
        // Check email verification status
        setIsEmailVerified(parsedUserInfo.email_verified !== false);
      } catch (error) {
        console.error('Error parsing userInfo from localStorage:', error);
      }
    }
  }, []);

  // Handle logout for unverified users
  const handleLogout = () => {
    dispatch(logoutAction());
    router.push('/sign-in');
  };

  // Timer effect for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const formik = useFormik({
    initialValues: {
      otp: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      if (currentStep === 'VERIFY_OTP') {
        const verifyPayload = {
          email: email,
          code: values.otp,
          otp_purpose: purpose
        };

        try {
          const result = await dispatch(verifyOtpEmailAction(verifyPayload)).unwrap();
          
          console.log('Verification successful:', result);

          // Update userInfo in localStorage and Redux to mark email as verified
          try {
            const storedUserInfo = localStorage.getItem('userInfo');
            if (storedUserInfo) {
              const userData = JSON.parse(storedUserInfo);
              userData.email_verified = true;
              
              // Update localStorage
              localStorage.setItem('userInfo', JSON.stringify(userData));
              
              // Update Redux state
              dispatch(setUserInfoReducer(userData));
            }
          } catch (updateError) {
            console.error('Failed to update email verification status:', updateError);
          }

          // Call onSuccess callback if provided (for modal usage)
          if (onSuccess) {
            onSuccess();
          } else {
            // For route usage, redirect to dashboard
            router.push('/');
          }
        } catch (error) {
          console.error('Verification failed:', error);
        }
      }
    }
  });

  // Handle Get OTP functionality
  const handleGetOTP = async () => {
    if (!email) {
      console.error('Email not found in localStorage');
      return;
    }

    setGetOtpLoading(true);
    
    try {
      const getOtpPayload = {
        email: email,
        otp_purpose: purpose
      };

      

      const result = await dispatch(requestOtpAction(getOtpPayload)).unwrap();
      
        console.log('OTP sent successfully:', result);

      // Move to verify step on success
      setCurrentStep('VERIFY_OTP');
      
      // Start 30-second timer for resend
      setResendTimer(30);
      setCanResend(false);
      
    } catch (error) {
      console.error('Get OTP failed:', error);
    } finally {
      setGetOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      console.error('Email not found');
      return;
    }

    try {
      const resendPayload = {
        email: email,
        otp_purpose: purpose
      };

      await dispatch(requestOtpAction(resendPayload)).unwrap();
      
      // Restart 30-second timer
      setResendTimer(30);
      setCanResend(false);
      
    } catch (error) {
      console.error('Resend OTP failed:', error);
    }
  };

  return (
    <section className='auth bg-base d-flex flex-wrap align-items-center justify-content-center min-h-100vh'>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link href='/' className='mb-40 max-w-290-px'>
              {getCompanyLogo()}
            </Link>
            
            {currentStep === 'GET_OTP' ? (
              <>
                <h4 className='mb-12'>{content.title}</h4>
                <p className='mb-32 text-secondary-light text-lg'>
                  {content.getOtpDescription}
                </p>
                
                <div className="d-flex flex-column gap-3">
                  <button
                    type='button'
                    onClick={handleGetOTP}
                    disabled={getOtpLoading || !email}
                    className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12'
                  >
                    {getOtpLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending Code...
                      </>
                    ) : (
                      "Get OTP"
                    )}
                  </button>
                  
                  {!email && (
                    <p className="text-danger text-sm text-center mb-2">
                      Email not found. Please login again.
                    </p>
                  )}
                  
                  {onClose && (
                    <button
                      type='button'
                      onClick={onClose}
                      className='btn btn-outline-secondary text-sm btn-sm px-12 py-16 w-100 radius-12'
                    >
                      Cancel
                    </button>
                  )}
                  
                  {isEmailVerified ? (
                    <button
                      type='button'
                      onClick={() => router.back()}
                      className='btn btn-outline-primary text-sm btn-sm px-12 py-16 w-100 radius-12'
                    >
                      Go Back
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={handleLogout}
                      className='btn text-sm btn-sm px-12 py-16'
                    >
                      <Icon icon="solar:logout-2-outline" className="me-1" />
                      Logout
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <h4 className='mb-12'>{content.title}</h4>
                <p className='mb-32 text-secondary-light text-lg'>
                  {content.verifyDescription}
                </p>
                
                <form onSubmit={formik.handleSubmit}>
                  <div className='mb-20'>
                    <label className='form-label text-neutral-600 fw-semibold text-lg mb-8'>
                      Enter Verification Code
                    </label>
                    <div className='icon-field'>
                      <span className='icon top-50 translate-middle-y'>
                        <Icon icon='material-symbols:security' />
                      </span>
                      <input
                        type='text'
                        name='otp'
                        value={formik.values.otp}
                        onChange={(e) => {
                          // Convert to uppercase and limit to alphanumeric characters
                          const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                          formik.setFieldValue('otp', value);
                        }}
                        onBlur={formik.handleBlur}
                        className={`form-control h-56-px bg-neutral-50 radius-12 text-center fw-semibold text-lg letter-spacing-4 ${
                          formik.touched.otp && formik.errors.otp ? 'is-invalid' : ''
                        }`}
                        placeholder='XXXXXX'
                        maxLength='6'
                        autoComplete='one-time-code'
                        style={{ letterSpacing: '0.5rem' }}
                        required
                      />
                      {formik.touched.otp && formik.errors.otp && (
                        <div className="invalid-feedback d-block">{formik.errors.otp}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="d-flex flex-column gap-3">
                    <button
                      type='submit'
                      disabled={isLoading || !formik.isValid || formik.values.otp.length !== 6}
                      className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12'
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Verifying Code...
                        </>
                      ) : (
                        "Verify Code"
                      )}
                    </button>
                    
                    {onClose && (
                      <button
                        type='button'
                        onClick={onClose}
                        className='btn btn-outline-secondary text-sm btn-sm px-12 py-16 w-100 radius-12'
                      >
                        Cancel
                      </button>
                    )}
                    
                    {isEmailVerified ? (
                      <button
                        type='button'
                        onClick={() => router.back()}
                        className='btn btn-outline-primary text-sm btn-sm px-12 py-16 w-100 radius-12'
                      >
                        Go Back
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={handleLogout}
                        className='btn btn-outline-danger text-sm btn-sm px-12 py-16 w-100 radius-12'
                      >
                        <Icon icon="solar:logout-2-outline" className="me-1" />
                        Logout
                      </button>
                    )}
                  </div>
                  
                  <div className="text-center mt-20">
                    <p className="text-secondary-light text-sm mb-12">
                      Didn't receive the code?
                    </p>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={!canResend || isLoading}
                      className={`btn btn-outline-primary text-sm px-16 py-8 radius-8 ${
                        !canResend ? 'opacity-50' : ''
                      }`}
                    >
                      {canResend ? (
                        'Resend Code'
                      ) : (
                        `Resend Code (${resendTimer}s)`
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationMainPage;
