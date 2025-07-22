import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (check localStorage or make API call)
    const token = localStorage.getItem('admin_token');
    if (token) {
      // In a real app, validate token with API
      setIsAuthenticated(true);
      setUser({ email: 'admin@burgers.com' });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // This would be replaced with actual API call to PHP backend
      // const response = await fetch('/api/admin/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      // Mock login for demo
      if (email === 'admin@burgers.com' && password === 'admin123') {
        const mockToken = 'mock-jwt-token';
        localStorage.setItem('admin_token', mockToken);
        setIsAuthenticated(true);
        setUser({ email });
        return { success: true };
      } else {
        return { success: false, error: 'Credenciales inválidas' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};