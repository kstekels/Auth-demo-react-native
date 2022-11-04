import { createContext, useState } from 'react';
import AsynceStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
    AsynceStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthToken(null);
    AsynceStorage.removeItem('token');
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
