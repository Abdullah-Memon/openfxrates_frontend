'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('userData');
        
        if (token && user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/sign-in');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

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

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;