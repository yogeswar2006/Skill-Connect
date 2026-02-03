import Navbar from "../navbar"
import Chatpage from "./chatpage"
import Friendrequest from "./friendRequests"
import Friends from "./friendsList"
import { AuthProvider } from "../../authcontext"
import { useContext } from "react"
import Sidebar from "./sidebar"
import Middle from "./middleDashboard"
import RightSidebar from "./rightside"


import { AuthContext } from "../../authcontext"
import 


function UserDashboard(){
   

    return (
        <>
          <div  className=" flex justify-between h-screen w-full bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(9,9,121,1)_50%,rgba(2,0,36,1)_100%)]">
               
               

              <div>
                <Sidebar/>
              </div>

              <div className="flex-1 text-center overflow-scroll  text-white">
                  <Middle/>
              </div>

             
             

              <div>
                <RightSidebar/>
              </div>
          </div>
        </>
    )
}


export default UserDashboard