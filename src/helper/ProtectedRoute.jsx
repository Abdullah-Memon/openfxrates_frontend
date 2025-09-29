'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated and email verified
    const checkAuth = () => {
      try {
        const token = Cookies.get('authToken');
        const user = localStorage.getItem('userInfo');
        
        if (token && user) {
          console.log('ProtectedRoute: User Info from localStorage:', user);
          const userInfo = JSON.parse(user);
          
          // Check email verification status first
          if (!userInfo.email_verified) {
            console.log('ProtectedRoute: Email not verified, redirecting to verification');
            setIsAuthenticated(false); // Important: mark as not authenticated
            router.push('/verification/email');
            setIsLoading(false);
            return;
          }
          
          // User is authenticated and email is verified
          console.log('ProtectedRoute: User authenticated and email verified');
          setIsAuthenticated(true);
        } else {
          console.log('ProtectedRoute: No token or user info, redirecting to sign-in');
          setIsAuthenticated(false);
          router.push('/sign-in');
        }
      } catch (error) {
        console.error('ProtectedRoute: Authentication check failed:', error);
        setIsAuthenticated(false);
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Continuous email verification check on route changes
  useEffect(() => {
    // Skip verification check if still loading or already redirecting
    if (isLoading) return;
    
    const verifyEmailStatus = () => {
      try {
        const token = Cookies.get('authToken');
        const user = localStorage.getItem('userInfo');
        
        if (token && user) {
          const userInfo = JSON.parse(user);
          
          // If user is not email verified, force redirect
          if (!userInfo.email_verified) {
            console.log('Route change detected: Email not verified, enforcing verification');
            setIsAuthenticated(false);
            router.push('/verification/email');
            return;
          }
        }
      } catch (error) {
        console.error('Email verification check failed:', error);
        setIsAuthenticated(false);
        router.push('/sign-in');
      }
    };

    verifyEmailStatus();
  }, [pathname, router, isLoading]);

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

  // If not authenticated, don't render children (will redirect to login)
  if (!isAuthenticated) {
    return null;
  }

  // Additional safety check: verify email status before rendering children
  try {
    const token = Cookies.get('authToken');
    const user = localStorage.getItem('userInfo');
    
    if (token && user) {
      const userInfo = JSON.parse(user);
      
      // Double-check email verification status
      if (!userInfo.email_verified) {
        console.log('Render-time check: Email not verified, blocking content');
        // Force redirect again
        router.push('/verification/email');
        return null;
      }
    } else {
      // No auth data, redirect to login
      router.push('/sign-in');
      return null;
    }
  } catch (error) {
    console.error('Render-time auth check failed:', error);
    router.push('/sign-in');
    return null;
  }

  // If authenticated and email verified, render the protected content
  return children;
};

export default ProtectedRoute;