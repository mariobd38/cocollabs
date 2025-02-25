// apiClient.js
const apiClient = {
    async fetch(url, options = {}) {
      // Ensure credentials are included by default
      const fetchOptions = {
        ...options,
        credentials: 'include'
      };
      
      try {
        const response = await fetch(url, fetchOptions);
        
        // If response is successful, return it
        if (response.ok) {
          return response;
        }
        
        // If unauthorized error, try to refresh token
        if (response.status === 401) {
          const refreshSuccess = await this.refreshToken();
          
          // If refresh successful, retry the original request
          if (refreshSuccess) {
            return fetch(url, fetchOptions);
          }
        }
        
        // For other errors, just return the response
        return response;
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    },
    
    async refreshToken() {
      try {
        const refreshResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include'
        });
        
        return refreshResponse.ok;
      } catch (error) {
        console.error('Token refresh failed:', error);
        return false;
      }
    },
    
    // Helper methods for common HTTP methods
    async get(url, options = {}) {
      return this.fetch(url, { ...options, method: 'GET' });
    },
    
    async post(url, data, options = {}) {
      return this.fetch(url, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data)
      });
    }
  };
  
  export default apiClient;