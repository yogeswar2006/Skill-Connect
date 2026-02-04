import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../authcontext";
import { toast, ToastContainer } from "react-toastify";


const AddSkill = ({ closeModal }) => {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [experience, setExperience] = useState("");
  const [Proficiency, setProficiency] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSkillname,setSelectedSkillname]=useState("")

  const {api}=useContext(AuthContext)

 
  useEffect(() => {
    const fetchSkills = async () => {
      if (search.trim().length === 0) {
        setSkills([]);
        return;
      }
      try {
        setLoading(true);
        const res = await api.get(`work/all/skills/?q=${search}`);
        setSkills(res.data);
      } catch (err) {
        console.error("Error at fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };

    const delaySearch = setTimeout(() => {
      fetchSkills();
    }, 400); 

    return () => clearTimeout(delaySearch);
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSkill) return alert("Please select a skill");
   

    try {
     const response = await api.post("work/all/addSkill/", {
        skill: selectedSkill,
        years_of_experience:experience,
        description:description,
        proficiency_level: Proficiency === "BEGINNER" ? 1 :
                  Proficiency === "INTERMEDIATE" ? 2 :3
                                                  

      },{withCredentials:true});
      
      toast.success("Skill Added Successfull");
      setTimeout(() => closeModal(), 3000);
    
    } catch (err) {
      console.error("Error at adding skill:", err);
      toast.error("Skill updation failed");
    }
  };

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="bg-[#000080] p-6 rounded-2xl shadow-lg min-w-125 relative">
        <h2 className="text-2xl font-bold text-sky-300 mb-4 text-center">Add a Skill</h2>
       <hr className="mb-6"></hr>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* Skill Search Field */}
          <label className="font-medium text-start">Search Skill</label>
          <div className="relative">
            <input
              type="text"
              value={selectedSkillname || search}
              onChange={(e) => {
                setSelectedSkill(null);
                setSearch(e.target.value);
              }}
              placeholder="Type to search skills..."
              className="border p-2 rounded-md w-full"
            />

            {skills.length > 0 && !selectedSkill && (
              <ul className="absolute bg-white border rounded-md w-full  max-h-40 overflow-y-auto mt-1 z-50 shadow-md">
                {skills.map((skill, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedSkill(skill.id);
                      setSelectedSkillname(skill.name);
                      setSkills([]);
                    }}
                    className=" text-start px-1 py-2 bg-[#00D4FF] border border-slate-800 text-black font-medium cursor-pointer"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            )}

            {loading && (
              <p className="absolute top-full left-0 mt-1 text-sm text-white">Searching...</p>
            )}
          </div>

          

          <label className="font-medium text-start">Proficiency</label>
          <select value={Proficiency} onChange={(e)=>{setProficiency(e.target.value)}}  className="border p-2 rounded-md" >
            <option value=''  className="bg-[#00D4FF] border border-slate-800 text-black font-medium">---Select---</option>
            <option value='PRO' className="bg-[#00D4FF] border border-slate-800 text-black font-medium">Pro</option>
            <option value='BEGINNER' className="bg-[#00D4FF] border border-slate-800 text-black font-medium">Beginner</option>
            <option value='INTERMEDIATE' className="bg-[#00D4FF] border border-slate-800 text-black font-medium">Intermediate</option>
          </select>

          <label className="font-medium text-start">Experience (in years)</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border p-2 rounded-md"
            required
          />

          <label className="font-medium text-start">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-md"
            rows={3}
            placeholder="Describe your skill..."
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-[#FF002F] px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
       <ToastContainer position="top" autoClose={3000} />
    </div>
  );
};

export default AddSkill;
