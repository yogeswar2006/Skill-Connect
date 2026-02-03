
import React, { useState } from "react";
import SearchFriends from "./searchFriends";
import Friends from "./friendsList";
import Friendrequest from "./friendRequests";
import friends from "../../assets/friends.png"
import friendRequests from "../../assets/friendRequests.png"
import searchFriend from "../../assets/searchFriend.png"


const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState("friends");

  return (
    <div className=" text-white bg-[#06063f] md:min-w-[250px] p-4 rounded-l-xl h-screen flex flex-col  rounded">
      {/* Sidebar Menu */}
      <div className="flex  gap-3 mb-6 border-b border-gray-700 pb-4 justify-around">
        <img
          className={`text-left hover:cursor-pointer hover:bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)] bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]  rounded w-8 h-8 hover:text-blue-400 ${
            activeTab === "friends" ? "text-blue-400 font-semibold" : ""
          }`}
          onClick={() => setActiveTab("friends")} 
          src={friends}
        >
         
        </img>

        <img
          className={`text-left  hover:cursor-pointer  hover:bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)]   bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]   rounded w-8 h-8 hover:text-blue-400 ${
            activeTab === "requests" ? "text-blue-400 font-semibold" : ""
          }`}
          onClick={() => setActiveTab("requests")}
           src={friendRequests}
        >
         
        </img>

        <img
          className={`text-left   hover:cursor-pointer  hover:bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)] rounded  bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)] w-8 h-8 hover:text-blue-400 ${
            activeTab === "search" ? "text-blue-400 font-semibold" : ""
          }`}
          onClick={() => setActiveTab("search")}
           src={searchFriend}
        >
          
        </img>
      </div>


      <div className="flex-1 overflow-y-auto">
        {activeTab === "friends" && <Friends />}
        {activeTab === "requests" && <Friendrequest />}
        {activeTab === "search" && <div className="flex justify-center items-center"><SearchFriends /></div>}
      </div>
    </div>
  );
};

export default RightSidebar;


