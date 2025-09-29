'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfoReducer } from '@/redux/user/slice';
import authUtils from '@/utils/authUtils';
import Cookies from 'js-cookie';

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector(state => state.authUser);

  // Check if current route is public or verification route
  const isPublicRoute = authUtils.isPublicRoute(pathname);
  const isVerificationRoute = pathname.startsWith('/verification');

  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      console.log('AuthProvider: Starting authentication check for:', pathname);
      
      try {
        // Use secure auth validation utility
        const authState = authUtils.validateAuth();
        console.log('AuthProvider: Auth state:', { 
          isValid: authState.isValid, 
          hasUserInfo: !!authState.userInfo,
          emailVerified: authState.userInfo?.email_verified 
        });
        
        if (authState.isValid && !userInfo) {
          // Token and user data exist but Redux state is empty, restore it
          dispatch(setUserInfoReducer(authState.userInfo));
          
          // Check email verification - redirect unverified users to verification
          if (authState.userInfo.email_verified === false && !isVerificationRoute) {
            console.log('AuthProvider: Page refresh detected, email not verified, setting redirect');
            setRedirectPath('/verification/email');
            return;
          }
          
          // If verified user is on verification page, redirect to dashboard
          if (authState.userInfo.email_verified === true && isVerificationRoute) {
            console.log('AuthProvider: Verified user on verification page, setting redirect to dashboard');
            setRedirectPath('/');
            return;
          }
        } else if (authState.isValid && userInfo) {
          // Check email verification for authenticated users
          if (userInfo.email_verified === false && !isVerificationRoute) {
            console.log('AuthProvider: Email verification check failed, setting redirect');
            setRedirectPath('/verification/email');
            return;
          }
          
          // If verified user is on verification page, redirect to dashboard
          if (userInfo.email_verified === true && isVerificationRoute) {
            console.log('AuthProvider: Verified user on verification page, setting redirect to dashboard');
            setRedirectPath('/');
            return;
          }
        } else if (!authState.isValid && !isPublicRoute) {
          // Invalid or missing authentication data for protected route
          console.log('AuthProvider: No valid auth, setting redirect to sign-in');
          authUtils.clearAllAuthData();
          dispatch(setUserInfoReducer(null));
          setRedirectPath('/sign-in');
          return;
        } else if (!authState.isValid && userInfo) {
          // Redux has user info but no valid token/localStorage - clear inconsistent state
          dispatch(setUserInfoReducer(null));
        }
        
        // Clear any pending redirects if auth is valid
        setRedirectPath(null);
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Clear all auth data on error and redirect if needed
        authUtils.clearAllAuthData();
        dispatch(setUserInfoReducer(null));
        if (!isPublicRoute) {
          setRedirectPath('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, isPublicRoute, isVerificationRoute, dispatch, userInfo]);

  // Separate effect for handling redirects to avoid render-phase navigation
  useEffect(() => {
    if (redirectPath) {
      console.log('AuthProvider: Executing redirect to:', redirectPath);
      router.push(redirectPath);
    }
  }, [redirectPath, router]);

  // Handle redirect for authenticated users trying to access sign-in/sign-up
  useEffect(() => {
    if (isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up')) {
      // If user is authenticated but email not verified, redirect to verification
      if (userInfo && userInfo.email_verified === false) {
        router.push('/verification/email');
      } else {
        // If email is verified, redirect to dashboard
        router.push('/');
      }
    }
  }, [isAuthenticated, pathname, router, userInfo]);

  // Force re-authentication check when auth state changes
  useEffect(() => {
    if (!isAuthenticated && userInfo) {
      // Clear inconsistent state
      authUtils.clearAllAuthData();
      dispatch(setUserInfoReducer(null));
    }
  }, [isAuthenticated, userInfo, dispatch]);

  // Additional effect to check email verification when userInfo is loaded/updated
  useEffect(() => {
    if (isAuthenticated && userInfo && !isVerificationRoute && !isLoading) {
      if (userInfo.email_verified === false) {
        console.log('AuthProvider: userInfo loaded, email not verified, redirecting');
        router.push('/verification/email');
      }
    }
  }, [userInfo, isAuthenticated, isVerificationRoute, isLoading, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    // Even during loading, check localStorage for email verification
    if (!isVerificationRoute) {
      try {
        const token = Cookies.get('authToken');
        const storedUser = localStorage.getItem('userInfo');
        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.email_verified === false) {
            console.log('AuthProvider: Loading check - email not verified, redirecting');
            router.push('/verification/email');
            return null;
          }
        }
      } catch (error) {
        console.error('Error during loading email verification check:', error);
      }
    }
    
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

  // CRITICAL: Additional email verification check before rendering any content
  if (isAuthenticated && !isVerificationRoute) {
    // Check both Redux state AND localStorage for email verification
    let shouldRedirectToVerification = false;
    
    // First check Redux state if available
    if (userInfo && userInfo.email_verified === false) {
      shouldRedirectToVerification = true;
    }
    
    // If Redux state is not yet loaded, check localStorage directly
    if (!userInfo) {
      try {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.email_verified === false) {
            shouldRedirectToVerification = true;
          }
        }
      } catch (error) {
        console.error('Error checking localStorage for email verification:', error);
      }
    }
    
    if (shouldRedirectToVerification) {
      console.log('AuthProvider: Email not verified, showing loading while redirect is processed');
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Redirecting to verification...</span>
          </div>
        </div>
      );
    }
  }

  // If user is verified but trying to access verification page, show loading while redirect is processed
  if (isAuthenticated && userInfo && userInfo.email_verified === true && isVerificationRoute) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Redirecting...</span>
        </div>
      </div>
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
