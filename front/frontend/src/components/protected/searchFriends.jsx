import { AuthContext } from "../../authcontext"
import { useContext, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import searchsvg from "../../assets/search.svg"
import addFriendsvg from "../../assets/add-friend-1.svg"


function SearchFriends(){

     const {api,logout}=useContext(AuthContext)
        const [query,setQuery]=useState(null)
        const [fetchedFriends,setFetchedFriends]=useState({})
        

       const SendFriendRequest = async (receiverId) => {
          try {
            const data = { receiver_id: receiverId }; 
            const response = await api.post("friend/friend-requests/", data, {
              withCredentials: true,
            });
            
            toast.success("Friend request sent successfully!");
          } catch (error) {
           
            toast.error("Friend request failed to sent")
          }
   }; 


        
    const Fetchfriends=async()=>{
        if (!query || query.trim() === "") return; 
        try{
            const response=await api.get(`user/fetchedusers/${query}/`,{withCredentials:true})
           
            setFetchedFriends(response.data)
        }catch(error){
             console.log("Error at fetchiing queried friends",error)
        }
    }

    return(
        <>
        <div> 
         <div className="flex justify-between md:min-w-[250px] p-1">
               <div className="flex items-center bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)] rounded-lg shadow-md overflow-hidden w-full max-w-md "> 
                 <input onChange={(e)=>{setQuery(e.target.value)}} type="text" placeholder="Search for friend?" className="flex-1 px-2 py-2 text-gray-700 focus:outline-none" />
                  <img onClick={Fetchfriends} src={searchsvg} className=" hover:bg-indigo-700 rounded text-white px-2 py-2 transition"></img>
               </div>
                
           </div>

           <div className="flex flex-col justify-start mt-4 gap-5">

              {fetchedFriends.length>0?(
                fetchedFriends.map((f)=>(
                 <div key={f.id} className="flex justify-between ">
                    <img src={f.profile_img} className="w-10 bg-white rounded"></img>   {/*profile_img*/}
                    <div className="flex justify-start">
                        <h1 className="text-white teat-medium text-xl">{f.username}</h1>
                     </div>
                    <img src={addFriendsvg} onClick={()=>SendFriendRequest(f.id)} className="w-8 h-8 hover:bg-sky-400   rounded  " ></img>  {/*add friend*/}
                 </div>
))
              ):
              (<div className="text-white text-center text-xl">
                No Users found
                </div>)}
           </div>
          </div> 
        <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default SearchFriends

