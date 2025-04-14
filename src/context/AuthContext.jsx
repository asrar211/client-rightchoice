import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from '../services/axios.js';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [authLoading, setAuthLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;
        const now = Date.now();

        if (expiry < now) {
          logout();
        } else {
          setUser(JSON.parse(storedUser));
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          setTimeout(logout, expiry - now);
        }
      } catch (err) {
        console.error('Token decoding failed:', err);
        logout();
      }
    }

    setAuthLoading(false);

    const interceptor = axios.interceptors.response.use(
      res => res,
      async err => {
        if (err.response?.status === 401) {
          try {
            const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
            const newToken = data.token;

            
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            
            err.config.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(err.config);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(err);
      }
    );

   
    return () => axios.interceptors.response.eject(interceptor);
  }, [logout]);


  const login = useCallback(async (credentials) => {
    try {
      setAuthLoading(true);
      const { data } = await axios.post('/api/auth/login', credentials, { withCredentials: true });

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, error: message };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  
  const register = useCallback(async (credentials) => {
    try {
      setAuthLoading(true);
      const { data } = await axios.post('/api/auth/register', credentials, { withCredentials: true });

      
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setError(null);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, error: message };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        error,
        authLoading,
        isAuthenticated: !!user, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
