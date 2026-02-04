import { useContext, useState,useEffect } from "react"
import { AuthContext } from "../../authcontext"
import { toast } from "react-toastify"


function  Friendrequest(){
    const {api,setfriendsCount,setrequestCount,}=useContext(AuthContext)
    const [request,setRequest]=useState([])
   

    const handleAccept= async(id)=>{
        try{
            const response=await api.patch(`/friend/friend-requests/${id}/accept/`)
            setRequest((prev) => prev.filter((r) => r.id !== id));
            toast.success("Friend request accepted")

        }catch(error){
            
            toast.error("Failed to accept friend request")
        }
    } 

    const handleDecline=async(id)=>{
        try{
             const response=await api.patch(`/friend/friend-requests/${id}/decline/`)
            toast.success("Friend request declined")
             

             setRequest((prev) => prev.filter((r) => r.id !== id));
        }catch(error){
                toast.error("Failed to decline friend request")
            
        }
    }

     const fetchFriendrequest=async()=>{
            try{
                const response=await api.get("/friend/friend-requests/received",{
                   
                })
               
                const uniqueRequests = response.data.filter(
                       (req, index, self) =>
                       index === self.findIndex((r) => r.sender_id === req.sender_id)
                );
                
                setRequest(uniqueRequests)
                setrequestCount(uniqueRequests.length)

            }catch(error){
                 console.log(error.response.data)
            }
        }

    useEffect(()=>{
       
        fetchFriendrequest()
         const interval = setInterval(fetchFriendrequest, 5000); // fetch every 5 sec
         return () => clearInterval(interval); // cleanup when component unmounts
    },[])

    return (
        <>
          <div className="text-white bg-[#06063f] rounded  md:pl-2 md:pr-2   md:min-w-[250px] " >
             <h1 className=" font-medium btn-grad btn-grad:hover  rounded mb-5 text-center ">My Friend requests</h1>
            <ul className="flex flex-col  justify-center items-center"> 
               {request.length>0?(
                   request.map((req)=>(
                       <div key={req.id} className="flex w-full  gap-7 justify-between items-center mb-1">
                         <img src={req.sender_profile_img} className="w-10 rounded bg-amber-50"></img>
                         <li  className="font-medium text-xl" > {req.sender_username}</li>
                          <div className="flex gap-2">
                              <button onClick={()=>handleAccept(req.id)} className="bg-[#00FF00] text-slate-950 p-1 rounded" >Accept</button>
                              <button className="bg-[#FF0000] p-1 rounded" onClick={()=>handleDecline(req.id)}>Decline</button>
                          </div>

                       </div>
                   ))
               ):(
                <li className="text-center text-xl">No new friend requests!</li>
               )}
            </ul>
          </div>
        </>
    )
}

export default Friendrequest