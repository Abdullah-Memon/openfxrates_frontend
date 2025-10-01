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
import TextInput from '@/components/inputs/TextInput';

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
        
        // Small delay to ensure state is updated before redirect
        setTimeout(() => {
          router.push('/');
        }, 100);
      } else if (loginAction.rejected.match(result)) {
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
            <div className='mb-16'>
              <TextInput
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
                placeholder='Email'
                startAdornment={<Icon icon='mage:email' />}
                error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                className='h-56-px'
                required
              />
            </div>
            <div className='mb-20'>
              <TextInput
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
                placeholder='Password'
                startAdornment={<Icon icon='solar:lock-password-outline' />}
                endAdornment={
                  <span
                    className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} cursor-pointer text-secondary-light`}
                    onClick={togglePasswordVisibility}
                  />
                }
                error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                className='h-56-px'
                id='your-password'
                required
              />
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
