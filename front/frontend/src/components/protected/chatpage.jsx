

import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../authcontext";
import Friends from "./friendsList";
import Friendrequest from "./friendRequests";
import Sidebar from "./sidebar";
import CodeCard from "./codeCard";

const ChatPage = ({ currentUserId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { api } = useContext(AuthContext);
  const [socketReady, setSocketReady] = useState(false);
  const [showCodeModel,setShowCodeModel]=useState(false)
  const [code,setCode]=useState("")
  
  const [language,setlanguage]=useState('Code')

  const roomName = `room_${Math.min(currentUserId, receiverId)}_${Math.max(
    currentUserId,
    receiverId
  )}`;

  //  Fetch previous messages
  useEffect(() => {
    const fetchOldMessages = async () => {
      const res = await api.get(
        `chat/messages/?sender_id=${currentUserId}&receiver_id=${receiverId}`,
        { withCredentials: true }
      );
      setMessages(res.data);
    };
    fetchOldMessages();
  }, [receiverId]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  //  WebSocket setup
  useEffect(() => {
    if (!currentUserId || !receiverId) return;

    const token = getCookie("refresh") || "";
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socketUrl = `${wsProtocol}://localhost:8000/ws/chat/${roomName}/?refresh=${token}`;

    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log(" WebSocket connected");
      setSocketReady(true);
    };

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const message = data.message || data; //  handle wrapped messages
      setMessages((prev) => [...prev, message]);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setSocketReady(false);
    };

    return () => socketRef.current.close();
  }, [roomName]);

  //  Send message
  const handleSendMessage = (msg_type) => {
      if (!socketRef.current || socketRef.current.readyState !== 1) {
    console.log("WebSocket not ready!");
    return;
  }

    let trimmed=''
    if (newMessage){
       trimmed = newMessage.trim();
       if (!trimmed || !socketRef.current) return;
    }
     if(code){
         trimmed=code
        if(!trimmed) return;
    }

    const messageTypeValue = msg_type === "Text" ? 1 : 4;

    const payload = {
      content: trimmed,
      receiver_id: receiverId,
      message_type: messageTypeValue,
    };

    // Send to WebSocket
    socketRef.current.send(JSON.stringify(payload));

   
    setNewMessage("");
    setCode('')
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 
  return (

    <>
    <div className="flex ">
          
          <div className="hidden sm:flex">
            <Sidebar/>
          </div>
   
          

          <div className="flex flex-col h-screen bg-gray-800 flex-1 w-100">
            <div className="p-4 bg-gray-795 text-white font-semibold shadow text-center">
              Chat with User #{receiverId}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-900">
              {messages.map((msg) => {
                const isSentByMe =
                  msg.sender_id === currentUserId ||
                  msg.sender === currentUserId 
                
                if (msg.message_type===4){
                  return(
                    <CodeCard 
                    key={msg.id} 
                    code={msg.content} 
                    sender={msg.sender}
                   language={language}
                  />
                  )
                }
                return(
                   <div
                    key={msg.id || Math.random()}
                    className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                  >
                    
                    <div
                      className={`max-w-xs md:max-w-md  pr-5 py-1 pl-2 rounded-lg shadow ${
                        isSentByMe
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      <h1 className="text-white font-bold ">{msg.sender}</h1>
                      {msg.content}
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(msg.sent_at || Date.now()).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                 
                )

                
                 
              })}
              <div ref={messagesEndRef}></div>
            </div>

    {showCodeModel && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#1e1e1e] p-5 rounded-xl w-[500px]">
            <h2 className="text-white text-lg mb-3">Paste your code</h2>

            <textarea
              className="w-full h-48 bg-[#1e1e1e] text-white p-3 rounded-lg border border-gray-600"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste code here..."
              required
            />

            <div className="flex justify-between mt-3">
              <button 
                className="bg-red-500 px-3 py-1 rounded-lg text-white"
                onClick={() => setShowCodeModel(false)}
              >
                Cancel
              </button>

              <button 
                className="bg-blue-500 px-3 py-1 rounded-lg text-white"
                onClick={() => {
                  handleSendMessage('Code');
                  setCode("");
                  setShowCodeModel(false);
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}


            <div className="p-4 bg-[#1e1e1e] shadow flex">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage('Text')}
                className="flex-1 text-white rounded-lg border border-white px-3 py-2 mr-2 outline-none"
                disabled={!socketReady}
              />
              <button
                onClick={()=>handleSendMessage('Text')}
                className="bg-indigo-600  mr-1 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Send
              </button>
              <button
                onClick={()=>{setShowCodeModel(true)}}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Code
              </button>
            </div>
          </div>

             <div className="hidden sm:flex">
            <Friends/>
          </div>

    </div> 
    </>
  );
};

export default ChatPage;
