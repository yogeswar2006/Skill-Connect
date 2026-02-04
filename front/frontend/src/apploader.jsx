import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authcontext";
import styled from 'styled-components';

function AppLoader({ children }) {
  const { setAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshAccess = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/api/token/refresh/`,
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

  if (loading) return (
    <StyledWrapper>
      <div className="loader bg-slate-900">Loading
        <span />
      </div>
    </StyledWrapper>
  )

  return <>{children}</>; // render children after refresh attempt
}




const StyledWrapper = styled.div`
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: transparent;
    border: 3px solid rgba(0, 102, 255, 0.1);
    border-radius: 50%;
    text-align: center;
    line-height: 150px;
    font-family: sans-serif;
    font-size: 20px;
    color: #0066ff;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 0 10px #0066ff;
    box-shadow: 0 0 20px rgba(0, 0, 0, .15);
    background-color: #0f1319
  }

  .loader::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #0066ff;
    border-right: 3px solid #0066ff;
    border-radius: 50%;
    animation: animateC 2s linear infinite;
  }

  .loader span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate 2s linear infinite;
  }

  .loader span::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #00aeff;
    top: -6px;
    right: -8px;
    box-shadow: 0 0 20px 5px #0066ff;
  }

  @keyframes animateC {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animate {
    0% {
      transform: rotate(45deg);
    }

    100% {
      transform: rotate(405deg);
    }
  }`;

  export default AppLoader;


