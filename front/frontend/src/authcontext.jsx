import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

 const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
    withCredentials: true
  });



export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [friendsCount, setfriendsCount] = useState(0)
  const [requestCount, setrequestCount] = useState(0)
  const [userinfo, setuserinfo] = useState({})
  const [skillOfferCount, setSkillOfferCount] = useState(0)
  const [CurrentUserOffers, setCurrentuserOffers] = useState([])

 
  // api.interceptors.request.use(
  //   function (config) {

  //     if (accessToken) {
  //       config.headers['Authorization'] = `Bearer ${accessToken}`
  //     }

  //     return config
  //   }, function (error) {
  //     return Promise.reject(error)
  //   })


  // // Axios interceptor to refresh token automatically
  // api.interceptors.response.use(
  //   response => response,

  //   async error => {
  //     const originalRequest = error.config;

  //     if (!accessToken) {
  //       return Promise.reject(error);
  //     }

  //     if (
  //       originalRequest.url.includes('/user/api/token') ||
  //       originalRequest.url.includes('/user/api/token/refresh')
  //     ) {
  //       return Promise.reject(error);
  //     }


  //     if (
  //       error.response?.status === 401 &&
  //       !originalRequest._retry &&
  //       !originalRequest.url.includes('/user/api/token') &&
  //       !originalRequest.url.includes('/user/api/token/refresh')
  //     ) {
  //       originalRequest._retry = true;
  //       try {
  //         const newAccess = await refreshAccessToken();
  //         setAccessToken(newAccess);

  //         originalRequest.headers.Authorization =
  //           `Bearer ${newAccess}`;

  //         return api(originalRequest);
  //       } catch (err) {
  //         setAccessToken(null);
  //         setUser(null);
  //         return Promise.reject(err);
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

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

      // 🚫 not logged in
      if (!accessToken) {
        return Promise.reject(error);
      }

      // 🚫 skip auth endpoints
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

          originalRequest.headers.Authorization =
            `Bearer ${newAccess}`;

          return api(originalRequest);
        } catch {
          setAccessToken(null);
          setUser(null);
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  // 🧹 cleanup (VERY IMPORTANT)
  return () => {
    api.interceptors.request.eject(requestInterceptor);
    api.interceptors.response.eject(responseInterceptor);
  };
}, [accessToken]);


  const login = async (username, password) => {   //  axios.post(url,data,config)
    const res = await api.post('user/api/token/', { username, password }, { withCredentials: true });
    setAccessToken(res.data.access);

    setUser({ username });
    return res.data.access;
  };

  const logout = async () => {

    try {
      const response = await api.post('user/logout/', {}, { withCredentials: true });
      setAccessToken(null);
      setUser(null);
      navigate('/login')
    } catch (error) {
      console.log(error.response.data)
      console.log('failed to logout')
    }

  };

  const refreshAccessToken = async () => {
    const res = await api.post(
      'user/api/token/refresh/',{},{ withCredentials: true }
    );
    return res.data.access;
  };

  return (
    <AuthContext.Provider value={{ CurrentUserOffers, setCurrentuserOffers, userinfo, setuserinfo, skillOfferCount, setSkillOfferCount, friendsCount, setfriendsCount, requestCount, setrequestCount, setAccessToken, accessToken, user, login, logout, api, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
