'use client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerAction } from '@/redux/user/action';
import { ValidationSchemas } from '@/utils/validations';
import getCompanyLogo from "@/helper/Logo";
import toast from 'react-hot-toast';
import TextInput from '@/components/inputs/TextInput';
import DropDown from '@/components/inputs/DropDown';
import { emailRegex, passwordRegex, websiteRegex } from '@/utils/regexPatterns';

const SignUpMainPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.authUser);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must not exceed 50 characters')
      .matches(/^[a-zA-Z\s'-]{2,50}$/, 'First name must contain only letters')
      .required('First name is required'),
    last_name: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must not exceed 50 characters')
      .matches(/^[a-zA-Z\s'-]{2,50}$/, 'Last name must contain only letters')
      .required('Last name is required'),
    email: Yup.string()
      .matches(emailRegex.pattern, emailRegex.message)
      .required('Email is required'),
    password: Yup.string()
      .matches(passwordRegex.pattern, passwordRegex.message)
      .required('Password is required'),
    website_url: Yup.string()
      .matches(websiteRegex.pattern, websiteRegex.message)
      .nullable(),
    address: Yup.string()
      .max(255, 'Address must not exceed 255 characters')
      .nullable(),
    country: Yup.string()
      .max(100, 'Country must not exceed 100 characters')
      .nullable(),
    company_name: Yup.string()
      .max(100, 'Company name must not exceed 100 characters')
      .nullable(),
    job_title: Yup.string()
      .max(100, 'Job title must not exceed 100 characters')
      .nullable(),
    marketing_channel: Yup.string()
      .max(100, 'Marketing channel must not exceed 100 characters')
      .nullable(),
    agreeToTerms: Yup.boolean()
      .oneOf([true], 'You must agree to the Terms & Conditions')
      .required('You must agree to the Terms & Conditions')
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      website_url: '',
      address: '',
      country: '',
      company_name: '',
      job_title: '',
      marketing_channel: '',
      agreeToTerms: false
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        console.log('Form values:', values);
        const { agreeToTerms, ...apiPayload } = values;
        console.log('API payload:', apiPayload);
        
        const result = await dispatch(registerAction(apiPayload)).unwrap();
        console.log('Registration result:', result);
        if (result.status === 201) {
          toast.success('Account created successfully! Redirecting to sign in...');
          
          // Reset form values and states after successful registration
          resetForm();
          setShowPassword(false);
          
          setTimeout(() => {
            router.push('/sign-in');
          }, 2000);
        }
      } catch (error) {
        console.error('Registration failed:', error);
        toast.error(error?.message || 'Registration failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Debug: Check form state
  const isFormValid = !!(
    formik.values.first_name &&
    formik.values.last_name &&
    formik.values.email &&
    formik.values.password &&
    formik.values.agreeToTerms &&
    Object.keys(formik.errors).length === 0
  );

  console.log('Form Debug:', {
    values: formik.values,
    errors: formik.errors,
    isFormValid,
    isLoading,
    isSubmitting: formik.isSubmitting
  });


  return (
    <section className='auth bg-base d-flex flex-wrap justify-content-center align-items-center min-vh-100'>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-600-px mx-auto w-100'>
          <div>
            <Link href='/' className='mb-40 max-w-290-px'>
              {getCompanyLogo()}
            </Link>
            <h4 className='mb-12'>Create Your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Join us today! Please fill in your details to create your account and get started.
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            
            {/* Personal Information Section */}
            <div className='mb-24'>
              <h6 className='text-md fw-semibold text-primary-600 mb-16'>Personal Information</h6>
              
              {/* Name Fields Row */}
              <div className='row mb-16'>
                <div className='col-md-6'>
                  <TextInput
                    label=""
                    placeholder="First Name"
                    type="text"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : null}
                    startAdornment={<Icon icon='f7:person' />}
                    name="first_name"
                  />
                </div>
                <div className='col-md-6'>
                  <TextInput
                    label=""
                    placeholder="Last Name"
                    type="text"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : null}
                    startAdornment={<Icon icon='f7:person' />}
                    name="last_name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className='mb-16'>
                <TextInput
                  label=""
                  placeholder="Email Address"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                  startAdornment={<Icon icon='mage:email' />}
                  name="email"
                />
                <small className="text-muted mt-1 d-flex align-items-center">
                  <Icon icon="mdi:information-outline" className="me-1" />
                  We'll send you a verification email to confirm your account
                </small>
              </div>

              {/* Password */}
              <div className='mb-16'>
                <TextInput
                  label=""
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                  startAdornment={<Icon icon='solar:lock-password-outline' />}
                  endAdornment={
                    <span
                      className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} cursor-pointer text-secondary-light`}
                      onClick={togglePasswordVisibility}
                    />
                  }
                  name="password"
                />
                <small className="text-muted mt-1 d-flex align-items-center">
                  <Icon icon="mdi:shield-check-outline" className="me-1" />
                  Must contain at least 8 characters with uppercase, lowercase, and numbers
                </small>
              </div>
            </div>

            {/* Business Information Section */}
            <div className='mb-24'>
              <h6 className='text-md fw-semibold text-primary-600 mb-16'>Business Information</h6>
              
              {/* Company & Job Title Row */}
              <div className='row mb-16'>
                <div className='col-md-6'>
                  <TextInput
                    label=""
                    placeholder="Company Name"
                    type="text"
                    value={formik.values.company_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.company_name && formik.errors.company_name ? formik.errors.company_name : null}
                    startAdornment={<Icon icon='mdi:office-building' />}
                    name="company_name"
                  />
                </div>
                <div className='col-md-6'>
                  <TextInput
                    label=""
                    placeholder="Job Title"
                    type="text"
                    value={formik.values.job_title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.job_title && formik.errors.job_title ? formik.errors.job_title : null}
                    startAdornment={<Icon icon='mdi:briefcase' />}
                    name="job_title"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div className='mb-16'>
                <TextInput
                  label=""
                  placeholder="Website URL (e.g., https://example.com)"
                  type="url"
                  value={formik.values.website_url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.website_url && formik.errors.website_url ? formik.errors.website_url : null}
                  startAdornment={<Icon icon='mdi:web' />}
                  name="website_url"
                />
                <small className="text-muted mt-1 d-block">
                  <Icon icon="mdi:link-variant" className="me-1" />
                  Your company or personal website (optional)
                </small>
              </div>
            </div>

            {/* Location Information Section */}
            <div className='mb-24'>
              <h6 className='text-md fw-semibold text-primary-600 mb-16'>Location Information</h6>
              
              {/* Address and Country Row */}
              <div className='row mb-16'>
                <div className='col-md-8'>
                  <TextInput
                    label=""
                    placeholder="Full Address"
                    type="text"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.address && formik.errors.address ? formik.errors.address : null}
                    startAdornment={<Icon icon='mdi:map-marker' />}
                    name="address"
                  />
                </div>
                <div className='col-md-4'>
                  <TextInput
                    label=""
                    placeholder="Country"
                    type="text"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.country && formik.errors.country ? formik.errors.country : null}
                    startAdornment={<Icon icon='mdi:flag' />}
                    name="country"
                  />
                </div>
              </div>
            </div>

            {/* Marketing Information Section */}
            <div className='mb-24'>
              <h6 className='text-md fw-semibold text-primary-600 mb-16'>How did you find us?</h6>
              
              {/* Marketing Channel */}
              <div className='mb-16'>
                <DropDown
                  label=""
                  placeholder="Select how you heard about us"
                  name="marketing_channel"
                  value={formik.values.marketing_channel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.marketing_channel && formik.errors.marketing_channel ? formik.errors.marketing_channel : null}
                  options={[
                    { value: "", label: "Select how you heard about us" },
                    { value: "search_engine", label: "Search Engine (Google, Bing)" },
                    { value: "social_media", label: "Social Media" },
                    { value: "email_marketing", label: "Email Marketing" },
                    { value: "referral", label: "Referral from Friend/Colleague" },
                    { value: "advertisement", label: "Online Advertisement" },
                    { value: "blog_content", label: "Blog/Content Marketing" },
                    { value: "conference_event", label: "Conference/Event" },
                    { value: "other", label: "Other" }
                  ]}
                />
                <small className="text-muted mt-1 d-block">
                  <Icon icon="mdi:chart-line" className="me-1" />
                  This helps us improve our marketing efforts (optional)
                </small>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='mb-20'>
              <div className='form-check style-check d-flex align-items-start'>
                <input
                  className='form-check-input border border-neutral-300 mt-4'
                  type='checkbox'
                  name='agreeToTerms'
                  checked={formik.values.agreeToTerms}
                  onChange={formik.handleChange}
                  id='condition'
                  required
                />
                <label
                  className='form-check-label text-sm'
                  htmlFor='condition'
                >
                  By creating an account means you agree to the{" "}
                  <Link href='#' className='text-primary-600 fw-semibold'>
                    Terms &amp; Conditions
                  </Link>{" "}
                  and our{" "}
                  <Link href='#' className='text-primary-600 fw-semibold'>
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <button
              type='submit'
              disabled={!isFormValid || isLoading || formik.isSubmitting}
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              {(isLoading || formik.isSubmitting) ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <Icon icon="mdi:account-plus" className="me-2" />
                  Create Account
                </>
              )}
            </button>
            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Already have an account?{" "}
                <Link href='/sign-in' className='text-primary-600 fw-semibold'>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

};

export default SignUpMainPage;
