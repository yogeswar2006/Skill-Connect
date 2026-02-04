import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authcontext"
import {toast,ToastContainer} from 'react-toastify'

function Login(){
    const {login}=useContext(AuthContext)
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

   

    const handleLogin=async(e)=>{
     e.preventDefault()
 
    try{
        
        await login(username,password);
        
        toast.success("Login Successfull")
        navigate('/userdashboard')
    }catch(error){
      
        toast.error("Login Failed")
    }
    }
  
    return (
        <>
         <div  className  ="text-white min-h-screen w-full bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(11,11,163,1)_66%,rgba(0,212,255,1)_100%)] bg-fixed flex  justify-center items-center">
          <div className="bg-[#060655] p-5 rounded-2xl">
            <h1 className="text-center text-4xl font-bold mb-10">Login!</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-2">
                <input
                type="text"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                placeholder="Username"
                required
                className="border border-blue-700 rounded text-white text-xl p-2"
                />

                <input
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="password"
                required
                className="border border-blue-700 rounded text-white text-xl p-2 md:w-120 w-70"
                />

               <div className="flex justify-center items-center ">
             <button type="submit" className="border  border-orange-400 rounded text-2xl mt-5 p-2 bg-green-600">Login</button>
           </div>

            </form>
            <h1 className="text-center text-xl mt-6">Don't have an account?<Link to={'/register'} className="text-amber-300">Register</Link></h1>
          </div>
        </div>  
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Login