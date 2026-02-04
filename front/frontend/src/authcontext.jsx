import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [friendsCount,setfriendsCount]=useState(0)
   const [requestCount,setrequestCount]=useState(0)
   const [userinfo,setuserinfo]=useState({})
   const [skillOfferCount,setSkillOfferCount]=useState(0)
   const [CurrentUserOffers,setCurrentuserOffers]=useState([])

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
    withCredentials: true,
  });

  api.interceptors.request.use(
    function (config){
    
    if(accessToken){
        config.headers['Authorization']=`Bearer ${accessToken}`
    }

    return config
},function (error){
    return Promise.reject(error)
})


  // Axios interceptor to refresh token automatically
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true;
        const newAccess = await refreshAccessToken();
        setAccessToken(newAccess);
        error.config.headers['Authorization'] = `Bearer ${newAccess}`;
        return api.request(error.config);
      }
      return Promise.reject(error);
    }
  );

  const login = async (username,password) => {   //  axios.post(url,data,config)
    const res = await api.post('user/api/token/',{username,password},{withCredentials:true});
    setAccessToken(res.data.access);
   
    setUser({ username }); 
    return res.data.access;
  };

  const logout = async() => {
    
      try{
             const response=await api.post('user/logout/',{},{withCredentials:true});
             setAccessToken(null);
             setUser(null);
            navigate('/login') 
        }catch (error){
            console.log(error.response.data)
            console.log('failed to logout')
        }
  
  };

  const refreshAccessToken = async () => {
    const res = await api.post('user/api/token/refresh/',{},{withCredentials:true});
    return res.data.access;
  };

  return (
    <AuthContext.Provider value={{ CurrentUserOffers,setCurrentuserOffers,userinfo,setuserinfo,skillOfferCount ,setSkillOfferCount,friendsCount,setfriendsCount,requestCount,setrequestCount, setAccessToken,accessToken, user, login, logout, api,loading }}>
      {children}
    </AuthContext.Provider>
  );
};
