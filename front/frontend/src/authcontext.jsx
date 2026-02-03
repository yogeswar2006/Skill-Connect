import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
  });

  // Attach access token
  api.interceptors.request.use(
    config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  // Refresh token on 401
  api.interceptors.response.use(
    response => response,
    async error => {
      if (
        error.response?.status === 401 &&
        !error.config._retry &&
        !error.config.url.includes('token/refresh')
      ) {
        error.config._retry = true;
        const newAccess = await refreshAccessToken();
        setAccessToken(newAccess);
        error.config.headers.Authorization = `Bearer ${newAccess}`;
        return api.request(error.config);
      }
      return Promise.reject(error);
    }
  );

  const login = async (username, password) => {
    const res = await api.post('user/api/token/', { username, password });
    setAccessToken(res.data.access);
    setUser({ username });
  };

  const logout = async () => {
    setAccessToken(null);
    setUser(null);
  };

  const refreshAccessToken = async () => {
    const res = await api.post('user/api/token/refresh/');
    return res.data.access;
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};
