import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setphotoURL] = useState(user.photoURL);
  const [company, setCompany] = useState(user.company);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const dispatch = useDispatch();

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = skillInput.trim().toUpperCase();
      if (newSkill && !skills.includes(newSkill) && skills.length < 12) {
        setSkills([...skills, newSkill]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/profileedit",
        { firstName, lastName, about, photoURL, company, gender, skills },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
        {/* LEFT: FORM SECTION */}
        <div className="lg:col-span-3 space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="bg-[#16191e]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
            <header className="mb-8">
              <h2 className="text-3xl font-black text-white tracking-tight">
                Edit Profile
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Edit and Add Your Data
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Group */}
              <div className="form-control">
                <label className="label text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input bg-white/5 border-white/10 text-white focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 rounded-xl transition-all"
                />
              </div>
              <div className="form-control">
                <label className="label text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input bg-white/5 border-white/10 text-white focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 rounded-xl transition-all"
                />
              </div>

              <div className="form-control">
                <label className="label text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input bg-white/5 border-white/10 text-white focus:border-violet-500/50 rounded-xl"
                />
              </div>
              <div className="form-control">
                <label className="label text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Gender
                </label>
                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full bg-white/5 border-white/10 text-white focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 rounded-xl transition-all appearance-none"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#16191e] text-slate-500"
                    >
                      Select Gender
                    </option>
                    <option value="male" className="bg-[#16191e] text-white">
                      Male
                    </option>
                    <option value="female" className="bg-[#16191e] text-white">
                      Female
                    </option>
                    <option value="others" className="bg-[#16191e] text-white">
                      Others
                    </option>
                  </select>

                  {/* Custom Arrow Icon (Optional but looks better) */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Photo URL */}
              <div className="form-control md:col-span-2">
                <label className="label text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setphotoURL(e.target.value)}
                  className="input bg-white/5 border-white/10 text-white focus:border-violet-500/50 rounded-xl"
                />
              </div>

              {/* About */}
              <div className="form-control md:col-span-2">
                <label className="label text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Short Bio
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered bg-white/5 border-white/10 text-white focus:border-violet-500/50 rounded-xl h-24"
                />
              </div>

              {/* Skills Tagging */}
              <div className="form-control md:col-span-2">
                <label className="label text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Skills ({skills.length}/12)
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl min-h-15 focus-within:border-violet-500/50 transition-all">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-300 text-xs font-semibold"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:text-white text-sm"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder={
                      skills.length < 12 ? "Type & Enter..." : "Limit reached"
                    }
                    disabled={skills.length >= 12}
                    className="bg-transparent border-none outline-none text-sm text-white flex-1 min-w-30"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={saveProfile}
              className="btn btn-block mt-10 h-12 rounded-2xl border-none bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold uppercase tracking-widest shadow-xl shadow-violet-900/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* RIGHT: PREVIEW SECTION */}
        <div className="lg:col-span-2 sticky top-12 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6 px-2">
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em]">
              Live Preview
            </span>
            <div className="h-1 flex-1 bg-white/5 mx-4"></div>
          </div>
          <FeedCard
            user={{
              firstName,
              lastName,
              about,
              company,
              photoURL,
              gender,
              skills,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
