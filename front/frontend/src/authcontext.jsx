import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [friendsCount, setfriendsCount] = useState(0);
  const [requestCount, setrequestCount] = useState(0);
  const [userinfo, setuserinfo] = useState({});
  const [skillOfferCount, setSkillOfferCount] = useState(0);
  const [CurrentUserOffers, setCurrentuserOffers] = useState([]);

  /* ----------------------------------------------------
     🔥 1. REFRESH ACCESS TOKEN ON APP LOAD (MOST IMPORTANT)
  ---------------------------------------------------- */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post(
          'user/api/token/refresh/',
          {},
          { withCredentials: true }
        );

        setAccessToken(res.data.access);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /* ----------------------------------------------------
     🔁 2. AXIOS INTERCEPTORS
  ---------------------------------------------------- */
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      config => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (!accessToken) {
          return Promise.reject(error);
        }

        if (
          originalRequest.url.includes('/user/api/token') ||
          originalRequest.url.includes('/user/api/token/refresh')
        ) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccess = await refreshAccessToken();
            setAccessToken(newAccess);

            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return api(originalRequest);
          } catch {
            setAccessToken(null);
            setUser(null);
            navigate('/login');
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  /* ----------------------------------------------------
     🔐 AUTH ACTIONS
  ---------------------------------------------------- */
  const login = async (username, password) => {
    const res = await api.post(
      'user/api/token/',
      { username, password },
      { withCredentials: true }
    );

    setAccessToken(res.data.access);
    setUser({ username });
    return res.data.access;
  };

  const logout = async () => {
    try {
      await api.post('user/logout/', {}, { withCredentials: true });
    } finally {
      setAccessToken(null);
      setUser(null);
      navigate('/login');
    }
  };

  const refreshAccessToken = async () => {
    const res = await api.post(
      'user/api/token/refresh/',
      {},
      { withCredentials: true }
    );
    return res.data.access;
  };

  return (
    <AuthContext.Provider
      value={{
        api,
        accessToken,
        setAccessToken,
        user,
        loading,

        login,
        logout,

        friendsCount,
        setfriendsCount,
        requestCount,
        setrequestCount,
        userinfo,
        setuserinfo,
        skillOfferCount,
        setSkillOfferCount,
        CurrentUserOffers,
        setCurrentuserOffers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
