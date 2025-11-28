import { useState,useContext } from "react"
import { AuthContext } from "../../authcontext"
import { toast,ToastContainer } from "react-toastify"

function AddSkillOffer({closeModals}){
    const {api}=useContext(AuthContext)

    const [name,setName]=useState('')
    const [description,setDescription]=useState('')

    const handleOfferSubmit=async()=>{
       try{
        const response=await api.post('work/all/workOffer/',{
            name:name,
            description:description
        },{withCredentials:true})
           window.alert("Work added Successfull")
            toast.success("Work Offered Successfull!")
         setTimeout(() => closeModals(), 3000);
       }catch(error){
            console.log("Error at handleing Workoffer submit",error)
             toast.error("Work Offer failed")
       }
    }
   
    return (
        <>
           <div className="flex justify-center items-center z-1000 mb-4">
              <form onSubmit={handleOfferSubmit} className="bg-[#000080] p-6 rounded-2xl shadow-lg min-w-125 relative">
                  <h1 className="text-2xl font-bold text-sky-300 mb-2">Add Work Offer!</h1>
                  <hr className="mb-6"></hr>
                  <div className="flex flex-col mb-2 gap-1">
                    <label className=" text-start text-xl">Name</label>
                    <input type="text" placeholder="Work name" onChange={(e)=>{setName(e.target.value)}} className=" rounded border p-2 border-amber-500" value={name} required />
                  </div>

                    <div className="flex flex-col mb-4 gap-1">
                        <label className=" text-start text-xl">Description</label>
                        <input type="text" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Describe the offer" className=" rounded border border-amber-500 p-2 " value={description} required />
                    </div>

                    <div className="flex justify-between">
                      <button
                            type="button"
                            onClick={closeModals}
                            className="bg-[#FF002F] px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                            Cancel
                            </button>
                      <button type="submit" className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg hover:bg-blue-700">Offer</button>
                    </div>
              </form>
              <ToastContainer position="top" autoClose={3000}/>
           </div>
        </>
    )
}

export default AddSkillOffer