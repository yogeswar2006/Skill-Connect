import { Link } from "react-router-dom"

function Body(){
    return(
        <>
       
            <div className="flex md:flex-row flex-col justify-center md:justify-around md:gap-10 items-center m-4 p-2 md:mt-15">
                <div className="mb-5">
                     <h1 className="text-2xl font-bold md:text-5xl md:w-100 flex wrap-break-word text-white md:leading-15 ">Connect and Colloborate with developers!</h1>
                     <p className="flex wrap-break-word text-white md:text-xl md:w-100 mt-3 mb-2">Find and connect with skilled developers, Message instantly and share code snippets.</p>
                      <Link to={"/register"} className="  text-xl font-bold md:text-2xl bg-[#FC8E3C] p-2 rounded">Get Started</Link>
                </div>
                <div className="md:flex gap-2">
                    <img src="src/assets/ss1.png" className=" w-90  md:w-150 rounded" alt="demo img"></img>
                    
                    
                </div>

            </div>

            <div className="flex justify-center items-center gap-10 mt-10">
                 <img src="src/assets/ss2.png" className=" w-90    md:w-150 rounded" alt="demo img"></img>
                  <img src="src/assets/ss2.png" className=" w-90   md:w-150 rounded" alt="demo img"></img>
            </div>

            <div className="text-white flex flex-col md:flex-row p-3  justify-center gap-2 items-center md:gap-5 mb-10 mt-10">
                <div className="flex w-70 flex-col wrap-break-word justify-center  md:w-80 bg-[#08086B] p-5 rounded-2xl">
                     <img src="src/assets/search.svg" alt="search" className="w-10 "></img>
                    <h1 className="text-2xl flex wrap-break-word  font-bold">Find Skilled People</h1>
                    <p className="md:text-xl flex wrap-break-word text-gray-300">Browse developers with specific skills and expertise.</p>
                </div>

                <div className="flex w-70 flex-col wrap-break-word justify-center md:w-80 bg-[#08086B] p-5 rounded-2xl">
                     <img src="src/assets/chat-left-dots.svg" alt="message" className="w-10"></img>
                    <h1 className="text-2xl flex wrap-break-word font-bold">Message Instantly</h1>
                    <p className="md:text-xl  flex wrap-break-word  text-gray-300">Communicate via direct messages with real time.</p>
                </div>

                <div className="flex w-70 flex-col wrap-break-word justify-center md:w-80 bg-[#08086B] p-5 rounded-2xl">
                     <img src="src/assets/code-square.svg" alt="code" className="w-10"></img>
                    <h1 className="text-2xl flex wrap-break-word font-bold">Share your code</h1>
                    <p className="md:text-xl  flex wrap-break-word  text-gray-300">Easily share and colloborate on code snippets.</p>
                </div>
            </div>
        </>
    )
}

export default Body