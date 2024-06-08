import { useState, useEffect, createContext, useContext } from 'react';
import axios from '../axios.js';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ 
        id: decoded.id,
        role: decoded.role,
        username: username,
        email: email
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
      const decoded = jwtDecode(response.data.token);
      setUser({ 
        id: decoded.id,
        role: decoded.role,
        username: response.data.user.username,
        email: response.data.user.email
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (username, email, password, role) => {
    try {
      await axios.post('/auth/register', { username, email, password, role });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateUser = async (username, email) => {
    try {
      return await axios.put('/auth/update', { username, email });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
