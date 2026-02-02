import { Link } from "react-router-dom"
import { AuthContext } from "../../authcontext";
import { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import Profile from "./profile";




function Sidebar(){
    
    
     const [currentUser, setCurrentUser] = useState(null);
     const [profile_img,setProfile_img]=useState(null);
     const [email,setEmail]=useState(null);
      const {api,logout}=useContext(AuthContext)
     const navigate=useNavigate()
      
   

     useEffect(() => {
          
          const get_current_user=async()=>{
            const response=await api.get('user/current_user/',{ withCredentials: true})
            setCurrentUser(response.data.username)
            setProfile_img(response.data.profile_img)
            setEmail(response.data.email)
            console.log(response.data)
          }
    
          get_current_user()
      }, []);

    return(

        <>
           
          

            <div className=" bg-[#06063f] flex flex-col gap-5 justify-start items-start h-full w-[300px] md:p-10 ">

                 <div className="flex items-center gap-2">
                    <img src="/src/assets/logo1.png" className=" w-10 md:w-9" />
                    <h1 className="text-2xl text-center font-bold text-slate-300" >Skill Connect</h1>

                 </div>

                <div className="flex flex-1 flex-col justify-start items-start">
                    <div className="flex justify-center items-center gap-5 md:mb-5 md:mt-5">
                    <img src="/src/assets/dashboard.png" className="w-6 hover:cursor-pointer hover:bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)] bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]   p-1 rounded"></img>
                    <Link className="text-slate-400 text-xl font-medium  hover:text-white" to={'/userdashboard/'}>Dashboard</Link>
                </div>

                <div className="flex justify-center items-center gap-5  md:mb-5 ">
                    <img src="/src/assets/messages.png" className="w-6 hover:cursor-pointer hover:bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)] bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]  rounded p-1"></img>
                    <Link className="text-slate-400 text-xl font-medium hover:text-white" to={'/userdashboard/chat/'} >Messages</Link>
                </div>
                <div className="flex justify-center items-center gap-5  md:mb-5 ">
                    <img src="/src/assets/groups.png" className="w-6 hover:cursor-pointer hover:bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)] bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]  rounded p-1"></img>
                    <Link className="text-slate-400 text-xl font-medium  hover:text-white">Groups</Link>
                </div>
                <div className="flex justify-center items-center gap-5  md:mb-5">
                    <img src="/src/assets/favorites.png" className="w-6 hover:cursor-pointer hover:bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)] bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]  rounded p-1"></img>
                    <Link className="text-slate-400 text-xl font-medium  hover:text-white">Favorites</Link>
                </div>
                <div className="flex justify-center items-center gap-5  md:mb-5 ">
                    <img src="/src/assets/files.png" className="w-6 hover:cursor-pointer hover:bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)] bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]  rounded p-1"></img>
                    <Link className="text-slate-400 text-xl font-medium  hover:text-white">Files</Link>
                </div>
                </div>

                <div onClick={()=>{navigate('/userdashboard/profile')}} className=" btn-profile pl-4 pr-4 py-1 rounded-bl-2xl rounded-t-2xl flex justify-center items-center gap-2">
                    <img  src={`http://localhost:8000${profile_img}`} alt="Profile" className="w-10  rounded"></img>
                    <div className="flex flex-col ">
                        <h1 className="text-xl text-slate-700 font-bold">{currentUser}</h1>
                        <h1 className="text-slate-800 ">{email}</h1>
                    </div>
                </div>

            </div>
        
        </>
    )
}

export default Sidebar