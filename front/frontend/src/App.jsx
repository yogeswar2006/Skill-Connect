import AppLoader from "./apploader";
import { AuthProvider } from "./authcontext";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import PrivateRoute from "./components/privateroute";
import UserDashboard from "./components/protected/pdashboard";
import Register from "./components/register";
import { Routes, Route, Link } from "react-router-dom";
import PublicRoute from "./components/publicroute";
import ChatPageWrapper from "./components/protected/chatpagewrapper";
import ChatPage from "./components/protected/chatpage";
import Profile from "./components/protected/profile";



function App() {
  return (
    <>
      <AuthProvider>
        <AppLoader>
          <Routes>
            <Route path="/" element={<PublicRoute><Dashboard /></PublicRoute>} />
            <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="userdashboard/chat/:receiverId" element={<ChatPageWrapper />} />
            <Route path="userdashboard/chat/" element={<ChatPage />} />
            <Route
              path="userdashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route path="userdashboard/profile/" element={<PrivateRoute><Profile/></PrivateRoute>} />
          </Routes>
        </AppLoader>
      </AuthProvider>
    </>
  );
}

export default App;
