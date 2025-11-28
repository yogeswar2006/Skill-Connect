import React ,{ useState } from "react";
import axios from 'axios'
import { Link,useNavigate } from "react-router-dom"; 
import {toast,ToastContainer} from 'react-toastify'



function Register() {
  const navigate=useNavigate()
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    email: "",
    image: null,
  });

  const collectdata = (e) => {
    const {name, value, files} = e.target;
    if (name === "image") {
      setFormdata({ ...formdata, image: files[0] });
    } else {
      setFormdata({ ...formdata, [name]: value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("username", formdata.username);
    data.append("password", formdata.password);
    data.append("email", formdata.email);
    if (formdata.image) {
      data.append("profile_img", formdata.image);
    }


    try{
       const response=await axios.post('http://127.0.0.1:8000/user/users/',data)
       console.log(response.data)
       console.log("user created successfull!")
       toast.success("Registration Successfull😊")

         navigate('/login')
    }catch (error){
        console.log(error.response.data)
        console.log("Unsuccessfull!")
        toast.error("Registration Failed😥")
      
    }
  };

  return (
    <>
    <div className  ="text-white min-h-screen w-full bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(11,11,163,1)_66%,rgba(0,212,255,1)_100%)] bg-fixed flex  justify-center items-center">
      <div className="bg-[#060655] p-5 rounded-2xl">
          <h1 className="text-center text-4xl font-bold mb-10">Register!</h1>
        <form onSubmit={handleSubmit} className="flex justify-center items-center" >
          
          <div className="flex  gap-2 flex-col ">
           
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formdata.username}
              onChange={collectdata}
              required
              className="border border-blue-700 rounded text-white text-xl p-2"
            />

            <input
              type="email"
              placeholder="email"
              name="email"
              value={formdata.email}
              onChange={collectdata}
              required
               className="border  border-blue-700 rounded text-white text-xl p-2"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={formdata.password}
              onChange={collectdata}
              required
               className="border  border-blue-600 rounded  text-white text-xl p-2"
            />
            <div className="md:flex-row gap-2 justify-center items-center flex flex-col">
              <label className="text-white text-xl rounded border border-blue-600 p-2 bg-amber-600">Profile img</label>
                     <input
              type="file"
              placeholder="profile"
              name="image"
              accept="image/*"
              onChange={collectdata}
               className="border  border-blue-500 rounded  text-white text-xl p-2 sm:w-90 w-60 md:w-100"
            />
            </div>
           

           <div className="flex justify-center items-center ">
             <button type="submit" className=" rounded text-2xl mt-5 p-2 bg-green-600">Submit</button>
           </div>
          </div>
        </form>
        
        <h1 className="text-center text-xl mt-6">Already have an account! <Link to={'/login'} className="text-amber-300">Login</Link></h1>
      </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Register;
