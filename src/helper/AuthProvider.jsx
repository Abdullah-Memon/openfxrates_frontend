'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfoReducer } from '@/redux/user/slice';
import VerificationMainPage from '@/views/verification';
import { getOtpPurposeOptions } from '@/utils/enums';
import Cookies from 'js-cookie';

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector(state => state.authUser);

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/coming-soon',
    '/maintenance',
    '/access-denied',
    '/terms-condition'
  ];

  // Check if it's a 404 page (not-found route is handled differently in Next.js)
  const is404Page = pathname === '/not-found' || !pathname;

  // Check if current route is public or 404
  const isPublicRoute = publicRoutes.some(route => pathname === route) || is404Page;

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = Cookies.get('authToken');
        const user = localStorage.getItem('userInfo');
        
        if (token && user && !userInfo) {
          // Token exists but Redux state is empty, restore from localStorage
          const userData = JSON.parse(user);
          dispatch(setUserInfoReducer(userData));
          
          // Check email verification for protected routes
          if (!isPublicRoute && userData.email_verified === false) {
            setShowEmailVerification(true);
          }
          
        } else if (token && userInfo && !isPublicRoute) {
          // Check email verification for authenticated users on protected routes
          if (userInfo.email_verified === false) {
            setShowEmailVerification(true);
          }
        } else if (!token && !isPublicRoute) {
          // No token and trying to access protected route
          router.push('/sign-in');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        if (!isPublicRoute) {
          router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, isPublicRoute, dispatch, userInfo]);

  // Handle redirect for authenticated users trying to access sign-in/sign-up
  useEffect(() => {
    if (isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up')) {
      router.push('/');
    }
  }, [isAuthenticated, pathname, router]);

  const handleEmailVerificationSuccess = () => {
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
        
        // Hide verification modal and navigate to home
        setShowEmailVerification(false);
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to update email verification status:', error);
    }
  };

  const handleEmailVerificationClose = () => {
    // Allow user to close but they'll see it again on next protected route
    setShowEmailVerification(false);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not authenticated and trying to access protected route, don't render children
  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  // Show email verification modal if email is not verified on protected routes
  if (showEmailVerification && !isPublicRoute) {
    return (
      <VerificationMainPage
        purpose={getOtpPurposeOptions().EMAIL_VERIFICATION}
        onSuccess={handleEmailVerificationSuccess}
        onClose={handleEmailVerificationClose}
      />
    );
  }

  // If authenticated and trying to access sign-in/sign-up, show loading while redirecting
  if (isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Redirecting...</span>
        </div>
      </div>
    );
  }

  // Render children for all valid cases
  return children;
};

export default AuthProvider;
