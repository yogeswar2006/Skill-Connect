import { Link } from "react-router-dom"

function Footer(){
    return(
        <>
          <div className="flex justify-around items-center mt-10 pb-7">
           <div>
               <h2 className="text-white md:text-xl font-medium">@2025 ❤️SkillConnect</h2>
           </div>

            <div className="flex justify-between items-center gap-7"> 
                <Link className="text-white md:text-xl font-medium">Privacy</Link>
                <Link className="text-white md:text-xl font-medium">Terms</Link>
            </div>
          </div>
        </>
    )
}

export default Footer