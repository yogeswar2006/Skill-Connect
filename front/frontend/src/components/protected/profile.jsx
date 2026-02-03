import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authcontext";
import { Link } from "react-router-dom";
import profile_bg from "../../assets/profile_bg.png"

function Profile() {

  const {api,logout,userinfo,setuserinfo}=useContext(AuthContext)
  const [Skills,setSkills]=useState([])
   const {CurrentUserOffers,setCurrentuserOffers}=useContext(AuthContext)
  console.log(userinfo)

  useEffect(()=>{
       const FetchUSerSkills=async()=>{
           try{
                const response=await api.get('work/all/addSkill/CurrentUserSkills/',{withCredentials:true})
               
                console.log("skills fetched",response.data)
                 setSkills(response.data)
           }catch(error){
            console.log(error)
           }
       }
FetchUSerSkills()

  },[])

useEffect(()=>{
 
  },[Skills])

  


  useEffect(() => {
      
      const get_current_user=async()=>{
        const response=await api.get('user/current_user/')
     
        setuserinfo(response.data)
        console.log(userinfo.username)
        
      }

      get_current_user()
  }, []);

  const skills = [
    "JavaScript",
    "React",
    "Python",
    "Django",
    "Tailwind CSS",
    "SQLite",
    "Git",
    "WebSockets",
    "Node.js",
    "C++",
  ];

  const works = [
    { title: "Portfolio Website", desc: "A modern personal portfolio." },
    { title: "Chat App", desc: "Real-time chat with WebSockets." },
    { title: "Spotify Clone", desc: "Music player UI + backend." },
    { title: "Task Manager", desc: "Full CRUD task dashboard." },
    { title: "Django Auth", desc: "User signup/login system." },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
    
      <div className="relative w-full h-[330px] overflow-hidden">
        <img
          src={profile_bg}
          className="absolute w-full h-full object-cover blur-sm opacity-40"
        />

        <div className="absolute top-30 z-100  right-5  ">
            <button  onClick={()=>{logout();
              console.log("Logout clicked")
            }} className="bg-red-800   p-2 rounded font-medium ">Logout</button>
            <Link to={'/userdashboard'} className=" bg-green-500  text-black ml-2 p-2 rounded font-medium">Dashboard</Link>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold">Hello {userinfo.username}</h1>
          <p className="max-w-xl text-gray-200 text-sm md:text-base">
            This is your profile page. You can see the progress you’ve made with
            your work and manage your projects or assigned tasks.
          </p>
        </div>
      </div>

     
      <div className="flex justify-center w-full px-4 mt-10">
        <div className="relative bg-white text-black w-full max-w-3xl p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.30)]">
         
          <img
            src={profile_bg}
            className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full shadow-lg object-cover"
          />

          <div className="mt-16">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User Information</h2>
              {/* <button className="bg-sky-500 text-white px-3 py-1 rounded">
                Edit
              </button> */}
            </div>

            <hr className="mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Username</label>
                <input
                  placeholder={userinfo.username}
                  className="border border-gray-500 h-9 rounded px-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Email</label>
                <input
                  placeholder={userinfo.email}
                  className="border border-gray-500 h-9 rounded px-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">First Name</label>
                <input
                  placeholder="None"
                  className="border border-gray-500 h-9 rounded px-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Last Name</label>
                <input
                  placeholder="None"
                  className="border border-gray-500 h-9 rounded px-2"
                />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label className="font-medium">Bio</label>
              <textarea
                placeholder="None"
                className="border border-gray-500 rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      </div>

     
     <div className="overflow-hidden w-full py-4">
         <h2 className="text-3xl font-bold mb-4 text-center">Skills</h2>
  <div className="skills-scroll text-center">
    {/* First copy */}
    {Skills.map((s) => (
      <div
        key={s.id}
        className="bg-gray-800 px-6 py-3 mx-3 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.45)] text-white font-medium"
      >
        {s.skill_name}
      </div>
    ))}

  </div>
</div>


      
      <div className="mt-20 px-6 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Works Offered</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CurrentUserOffers.map((w, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.40)] hover:scale-[1.02] transition-all"
            >
              <h3 className="text-xl font-bold mb-2">{w.name}</h3>
              <p className="text-gray-300 text-sm">{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
