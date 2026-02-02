import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authcontext";

function AppLoader({ children }) {
  const { setAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshAccess = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/api/token/refresh/",
          {},
          { withCredentials: true } // important: send cookie
        );

        const data = response.data;
        setAccessToken(data.access);
      } catch (error) {
        console.log("Not logged in!", error.response?.data || error);
        setAccessToken(null)
      } finally {
        setLoading(false);
      }
    };

    refreshAccess();
  }, [setAccessToken]);

  if (loading) return <div>Loading...</div>; //  loading screen

  return <>{children}</>; // render children after refresh attempt
}

export default AppLoader;
