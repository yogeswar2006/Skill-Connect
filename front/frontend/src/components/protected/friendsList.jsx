import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../authcontext"
import { useNavigate } from "react-router-dom"



function Friends(){
    const {api,setfriendsCount}=useContext(AuthContext)
   const [friends,setFriends]=useState([])
   const navigate=useNavigate()

   const FetchFriends= async()=>{
              try{
                 const response=await api.get('/friend/friend-requests/friends')
                 setFriends(response.data)
                  
                  setfriendsCount(response.data.length)
              }catch(error){
                    console.log(error.response.data)
              }
        }

    useEffect(()=>{
        
        FetchFriends()
        const intervel=setInterval(FetchFriends, 5000);
        return ()=> clearInterval(intervel)
    },[])


    return (
        <>
          <div className="text-white bg-[#06063f]  md:min-w-[250px]  pl-2  ">
              <h1 className="btn-grad btn-grad:hover  font-medium    text-center rounded ">My Friends</h1>
              
                 <ul className="mt-5" >
                {friends.length>0 ?(
                 
                  friends.map((friend)=>(
                   <div key={friend.id} className="flex gap-5 mb-3 justify-start items-center  ">
                    <img src={friend.profile_img || "src/assets/logo1.png"} className="w-10 rounded bg-amber-50"></img>
                    <li  className="font-medium text-xl cursor-pointer" onClick={()=>navigate(`/userdashboard/chat/${friend.id}`)}>{friend.username}</li>
                   </div>
                   
                  ))
               ):(
                <div className="text-center  text-xl pt-5">No friends found!</div>
               )}
               </ul>
              
          </div>
        
        </>
    )
}

export default Friends