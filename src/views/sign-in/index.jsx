'use client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { loginAction } from '@/redux/user/action';
import { clearError } from '@/redux/user/slice';
import { ValidationSchemas } from '@/utils/validations';
import getCompanyLogo from "@/helper/Logo";

const SignInMainPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.authUser);

  const validationSchema = ValidationSchemas.signIn();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const loginPayload = {
        email: values.email,
        password: values.password
      };

      const result = await dispatch(loginAction(loginPayload));
      
      if (loginAction.fulfilled.match(result)) {
        // Login successful - reset form and redirect
        resetForm();
        setShowPassword(false);

        // if user's email is not verified, redirect to verification page
        if (result?.payload?.data?.email_verified === false) {
          router.push('/verification/email');
          return;
        }
        router.push('/');
      } else if (loginAction.rejected.match(result)) {
        // Login failed - error message already shown by toast
        // Keep user on login page, form will show error state
        console.log('Login attempt failed, staying on login page');
      }
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className='auth bg-base d-flex flex-wrap align-items-center justify-content-center min-h-100vh'>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link href='/' className='mb-40 max-w-290-px'>
              {getCompanyLogo()}
            </Link>
            <h4 className='mb-12'>Sign In to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome back! please enter your detail
            </p>
          </div>
          {/* {error && (
            <div className="alert alert-danger mb-20" role="alert">
              <Icon icon="mage:warning" className="me-2" />
              {error}
            </div>
          )} */}
          <form onSubmit={formik.handleSubmit}>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                name='email'
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  // Clear any existing errors when user starts typing
                  if (error) {
                    dispatch(clearError());
                  }
                }}
                onBlur={formik.handleBlur}
                className={`form-control h-56-px bg-neutral-50 radius-12 ${
                  formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                }`}
                placeholder='Email'
                required
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formik.values.password}
                  onChange={(e) => {
                    formik.handleChange(e);
                    // Clear any existing errors when user starts typing
                    if (error) {
                      dispatch(clearError());
                    }
                  }}
                  onBlur={formik.handleBlur}
                  className={`form-control h-56-px bg-neutral-50 radius-12 ${
                    formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                  }`}
                  id='your-password'
                  placeholder='Password'
                  required
                />
              </div>
              <span
                className={`toggle-password ${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                onClick={togglePasswordVisibility}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback d-block">{formik.errors.password}</div>
              )}
            </div>
            <div className=''>
              <div className='d-flex justify-content-between gap-2'>
                <div className='form-check style-check d-flex align-items-center'>
                  <input
                    className='form-check-input border border-neutral-300'
                    type='checkbox'
                    name='remember'
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                    id='remeber'
                  />
                  <label className='form-check-label' htmlFor='remeber'>
                    Remember me{" "}
                  </label>
                </div>
                <Link href='#' className='text-primary-600 fw-medium'>
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type='submit'
              disabled={isLoading || !formik.isValid}
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Don’t have an account?{" "}
                <Link href='/sign-up' className='text-primary-600 fw-semibold'>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInMainPage;
