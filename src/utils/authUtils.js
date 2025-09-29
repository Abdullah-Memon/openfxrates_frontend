import Cookies from 'js-cookie';

/**
 * Utility functions for secure authentication state management
 */

export const authUtils = {
  /**
   * Validates if user is properly authenticated
   * @returns {Object} { isValid: boolean, token: string|null, userInfo: Object|null }
   */
  validateAuth() {
    try {
      const token = Cookies.get('authToken');
      const userInfoStr = localStorage.getItem('userInfo');
      
      if (!token || !userInfoStr) {
        return { isValid: false, token: null, userInfo: null };
      }
      
      let userInfo;
      try {
        userInfo = JSON.parse(userInfoStr);
      } catch (parseError) {
        console.error('Invalid userInfo format in localStorage:', parseError);
        this.clearAllAuthData();
        return { isValid: false, token: null, userInfo: null };
      }
      
      // Validate user info structure
      if (!userInfo || typeof userInfo !== 'object' || !userInfo.id) {
        console.error('Invalid user info structure');
        this.clearAllAuthData();
        return { isValid: false, token: null, userInfo: null };
      }
      
      return { isValid: true, token, userInfo };
    } catch (error) {
      console.error('Auth validation error:', error);
      this.clearAllAuthData();
      return { isValid: false, token: null, userInfo: null };
    }
  },

  /**
   * Completely clears all authentication data from all storage locations
   */
  clearAllAuthData() {
    try {
      // Clear cookies with different domain configurations
      Cookies.remove('authToken');
      Cookies.remove('authToken', { domain: window.location.hostname });
      Cookies.remove('authToken', { domain: `.${window.location.hostname}` });
      
      // Clear localStorage
      const localStorageKeys = [
        'userInfo', 'userData', 'authToken', 'token', 
        'refreshToken', 'user', 'accessToken'
      ];
      localStorageKeys.forEach(key => localStorage.removeItem(key));
      
      // Clear sessionStorage
      const sessionStorageKeys = [
        'userInfo', 'userData', 'authToken', 'token', 
        'refreshToken', 'user', 'accessToken'
      ];
      sessionStorageKeys.forEach(key => sessionStorage.removeItem(key));
      
      console.log('All authentication data cleared');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },

  /**
   * Forces a secure logout by clearing all data and redirecting
   */
  forceLogout() {
    this.clearAllAuthData();
    window.location.href = '/sign-in';
  },

  /**
   * Checks if current route is public (doesn't require authentication)
   * @param {string} pathname - Current route pathname
   * @returns {boolean}
   */
  isPublicRoute(pathname) {
    const publicRoutes = [
      '/sign-in',
      '/sign-up',
      '/forgot-password',
      '/reset-password',
      '/verification',
      '/verification/email',
      '/verification/forgot-password', 
      '/verification/update-password',
      '/coming-soon',
      '/maintenance',
      '/access-denied',
      '/terms-condition',
      '/privacy-policy',
      '/not-found'
    ];
    
    return publicRoutes.some(route => pathname === route) || 
           pathname === '/not-found' || 
           pathname.startsWith('/verification/') ||
           !pathname;
  },

  /**
   * Validates token format (basic check)
   * @param {string} token 
   * @returns {boolean}
   */
  isValidTokenFormat(token) {
    if (!token || typeof token !== 'string') return false;
    
    // Basic JWT format check (3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Check if parts are base64-like strings
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    return parts.every(part => base64Regex.test(part));
  }
};

export default authUtils;