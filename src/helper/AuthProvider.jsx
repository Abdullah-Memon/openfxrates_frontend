'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfoReducer } from '@/redux/user/slice';
import authUtils from '@/utils/authUtils';

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector(state => state.authUser);

  // Route checks
  const isPublicRoute = authUtils.isPublicRoute(pathname);
  const isVerificationRoute = pathname.startsWith('/verification');
  const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';

  // Helper function to get user verification status
  const getUserVerificationStatus = () => {
    if (userInfo) {
      return userInfo.email_verified;
    }
    
    // Fallback to localStorage if Redux state not available
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser.email_verified;
      }
    } catch (error) {
      console.error('Error checking localStorage for verification status:', error);
    }
    
    return null;
  };

  // Helper function to determine redirect path
  const getRedirectPath = (authState, isEmailVerified) => {
    // Unauthenticated users on protected routes -> sign-in
    if (!authState.isValid && !isPublicRoute) {
      return '/sign-in';
    }
    
    // Authenticated users on auth routes -> dashboard
    if (authState.isValid && isAuthRoute) {
      return '/';
    }
    
    // Unverified users not on verification routes -> verification
    if (authState.isValid && isEmailVerified === false && !isVerificationRoute) {
      return '/verification/email';
    }
    
    // Verified users on verification routes -> dashboard
    if (authState.isValid && isEmailVerified === true && isVerificationRoute) {
      return '/';
    }
    
    return null;
  };

  // Loading component
  const LoadingSpinner = ({ message = 'Loading...' }) => (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
    </div>
  );

  // Main authentication effect
  useEffect(() => {
    const handleAuth = async () => {
      // Prevent excessive logging
      if (pathname !== '/sign-in') {
        console.log('AuthProvider: Starting authentication check for:', pathname);
      }
      
      try {
        const authState = authUtils.validateAuth();
        
        // Only log for non-sign-in routes to reduce noise
        if (pathname !== '/sign-in') {
          console.log('AuthProvider: Auth state:', { 
            isValid: authState.isValid, 
            hasUserInfo: !!authState.userInfo,
            emailVerified: authState.userInfo?.email_verified 
          });
        }

        // Update Redux state if we have valid auth but missing userInfo
        if (authState.isValid && authState.userInfo && !userInfo) {
          dispatch(setUserInfoReducer(authState.userInfo));
        }

        // Clear Redux state if auth is invalid but userInfo exists
        if (!authState.isValid && userInfo) {
          dispatch(setUserInfoReducer(null));
        }

        // Clear all auth data if invalid and on protected route
        if (!authState.isValid && !isPublicRoute) {
          authUtils.clearAllAuthData();
          dispatch(setUserInfoReducer(null));
        }

        // Determine if user's email is verified
        const isEmailVerified = getUserVerificationStatus();
        
        // Get redirect path based on current state
        const newRedirectPath = getRedirectPath(authState, isEmailVerified);
        
        if (newRedirectPath && newRedirectPath !== pathname) {
          console.log('AuthProvider: Setting redirect to:', newRedirectPath);
          setRedirectPath(newRedirectPath);
        } else {
          setRedirectPath(null);
        }

      } catch (error) {
        console.error('Authentication check failed:', error);
        authUtils.clearAllAuthData();
        dispatch(setUserInfoReducer(null));
        
        if (!isPublicRoute) {
          setRedirectPath('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();
  }, [pathname, isPublicRoute, isVerificationRoute, isAuthRoute, dispatch]);

  // Handle redirects in a separate effect
  useEffect(() => {
    if (redirectPath && redirectPath !== pathname) {
      console.log('AuthProvider: Executing redirect to:', redirectPath);
      
      // Add a small delay to prevent rapid redirects
      const timer = setTimeout(() => {
        router.push(redirectPath);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [redirectPath, router, pathname]);

  // Show loading during initial auth check
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Show loading while redirect is in progress
  if (redirectPath && redirectPath !== pathname) {
    return <LoadingSpinner message="Redirecting..." />;
  }

  // Don't render content for unauthenticated users on protected routes
  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  // Render children for valid cases
  return children;
};

export default AuthProvider;
