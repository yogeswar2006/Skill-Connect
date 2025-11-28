
import React, { useEffect, useState,useContext, useSyncExternalStore } from "react";
import AddSkill from "./AddSkill";
import AddSkillOffer from "./AddSkillOffer";
import ModalWrapper from "./modalWrapper";
import { AuthContext } from "../../authcontext";
import { toast, ToastContainer } from "react-toastify";


const Middle = () => {

  const [open,setOpenSkill]=useState(false)
  const [openOffer,setOpenOffer]=useState(false)
  const {api,friendsCount,requestCount,skillOfferCount ,setSkillOfferCount}=useContext(AuthContext)
  const [workOffers,setWorkOffers]=useState([])
  const {CurrentUserOffers,setCurrentuserOffers}=useContext(AuthContext)
  const [sent,setSent]=useState(false)


  
         const SendFriendRequest = async (receiverId) => {
    try {
      const data = { receiver_id: receiverId }; // ✅ correct
      const response = await api.post("friend/friend-requests/", data, {
        withCredentials: true,
      });
      console.log("Friend request sent successfully!", response.data);
      
      toast.success("Friend request sent successfully!");
    } catch (error) {
      console.error("Error sending friend request:", error.response?.data || error);
      toast.error("Friend request failed to sent")
    }
  };
  
  


  useEffect(()=>{
    
       const fetchOffers=async()=>{
         try{
           const offers=await api.get('work/all/workOffer/',{withCredentials:true})
           setWorkOffers(offers.data)
           console.log(offers.data)
        }catch(error){
            console.log("error at fetching workoffers",error)
        }
       }
        fetchOffers()

        const interval=setInterval(fetchOffers, 5000);
        return ()=>clearInterval(interval)

    },[])

    useEffect(()=>{
        const fetchUserOffers=async()=>{
            try{
                const response=await api.get('work/all/workOffer/CurrentUserSkillOffers/',{withCredentials:true})
                setCurrentuserOffers(response.data)
                setSkillOfferCount(response.data.length)
            }catch(error){
                console.log("error at Fetching user skill offers",error)
            }
        }
        fetchUserOffers()
    },[])


  return (
    <div className="p-6  min-h-screen  -webkit-scrollbar -webkit-scrollbar-track -webkit-scrollbar-thumb -webkit-scrollbar-thumb:hover ">
     
      <div className=" from-indigo-500 to-purple-600 bg-[#090979] text-white p-8 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold">Showcase Your Skills </h2>
        <p className="mt-2 text-sm text-indigo-100">
          Highlight what you’re great at and connect with others to collaborate
          or work together.
        </p>
        <button onClick={()=>{setOpenSkill(true)}}  className="mt-5 hover:bg-sky-500 hover:text-white hover:cursor-pointer mr-2 bg-white text-indigo-700 font-medium px-4 py-1 rounded-lg shadow  transition">
          + Add Skill
        </button>
        <button onClick={()=>{setOpenOffer(true)}}  className="mt-5 bg-white hover:bg-sky-500 hover:cursor-pointer hover:text-white text-indigo-700 font-medium px-4 py-1 rounded-lg shadow  transition">
          + Offer Work
        </button>
      </div>

       
        {open && (
  <ModalWrapper onClose={() => setOpenSkill(false)}>
    <AddSkill closeModal={() => setOpenSkill(false)} />
  </ModalWrapper>
)}


{openOffer && (
  <ModalWrapper onClose={() => setOpenOffer(false)}>
    <AddSkillOffer closeModals={() => setOpenOffer(false)} />
  </ModalWrapper>
)}


      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">
          Top Skill Offers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-[#090979] p-5 flex flex-col rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="flex flex-1 items-center gap-4">
                <img
                  src={offer.sender_profile_img}
                  className="w-14 h-14 rounded-full object-cover"
                  alt={offer.sender_username}
                />
                <div className="flex flex-col justify-start items-start">
                  <h4 className="font-medium text-lg text-gray-100">
                    {offer.sender_username}
                  </h4>
                  <p className="text-sm text-white">{offer.name}</p>
                </div>
              </div>
              <p className="text-gray-100  text-sm mt-3">{offer.description}</p>
              <button onClick={()=>SendFriendRequest(offer.offered_by)} className="mt-4 bg-indigo-500 text-white w-full py-2 rounded-lg font-medium hover:bg-indigo-600 transition">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

     
  

    
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-100">
          Quick Stats 📊
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#090979] p-5 rounded-xl text-center shadow-md">
            <p className="text-2xl font-bold text-indigo-100">{friendsCount}</p>
            <p className="text-gray-200 text-sm">Connections</p>
          </div>
          <div className="bg-[#090979] p-5 rounded-xl text-center shadow-md">
            <p className="text-2xl font-bold text-indigo-100">{skillOfferCount}</p>
            <p className="text-gray-200 text-sm">Skills Offers</p>
          </div>
          <div className="bg-[#090979] p-5 rounded-xl text-center shadow-md">
            <p className="text-2xl font-bold text-indigo-100">{requestCount}</p>
            <p className="text-gray-200 text-sm">New Requests</p>
          </div>
        </div>
      </div>
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Middle;
