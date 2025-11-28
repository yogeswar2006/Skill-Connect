
import { AuthContext } from "../../authcontext";
import { useParams } from "react-router-dom";
import { useContext,useState,useEffect } from "react";
import ChatPage from "./chatpage";

function  ChatPageWrapper() {
  const {api,userinfo,setuserinfo}=useContext(AuthContext)
  const { receiverId } = useParams();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
  console.log("userinfo updated:", userinfo);
}, [userinfo]);


  // fetch current user (as above)
  useEffect(() => {
      
      const get_current_user=async()=>{
        const response=await api.get('user/current_user/')
        setCurrentUserId(response.data.id)
        setuserinfo(response.data)
        console.log(userinfo.username)
        
      }

      get_current_user()
  }, []);

  if (!currentUserId) return <div>Loading...</div>;
  return <ChatPage currentUserId={currentUserId} receiverId={Number(receiverId)} />;
};

export default ChatPageWrapper
