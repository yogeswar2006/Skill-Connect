import { Link } from "react-router-dom"
function Navbar(){
    return(
        <>
          <div className="flex justify-between md:justify-around p-5">
              <div className="flex items-center gap-2">
                    <img src="src/assets/logo1.png" alt="logo" className=" w-10 md:w-12"></img>
                    <h2 className="text-white text-xl md:text-3xl font-medium">SkillConnect</h2>
              </div>

              <div className="text-white flex  justify-between items-center gap-5 md:gap-7">

                    <Link to={"/features"} className="text-xl hidden md:text-2xl md:inline-block">Features</Link>
                    <Link to={"/about"} className="text-xl hidden md:text-2xl md:inline-block">About</Link>
                    <Link to={"/register"} className="text-xl md:text-2xl bg-[#020025] p-2 rounded hidden hover:bg-[#090979] md:inline-block">Get Started</Link>
              </div>

              <div className="md:hidden flex justify-center items-center">
                 <Link to={"/register"} className=" text-white hover:bg-blue-800 hover:text-amber-50 text-xl md:text-2xl bg-[#020025] p-2 rounded  ">Get Started</Link>
              </div>
              
          </div>
           <hr className="border border-slate-950 md:w-[83%] justify-center items-center"></hr>
           
        </>
    )
}

export default Navbar