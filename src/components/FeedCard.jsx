import axios from "axios";
import React from "react";

import {
  HiCheck,
  HiXMark,
  HiOutlineBuildingOffice2,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import toast from "react-hot-toast";

const FeedCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return null;

  const { firstName, lastName, photoURL, gender, about, skills, company, _id } =
    user;
  const handleSendReq = async (status, _id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      console.log(res);
      dispatch(removeUserFromFeed(_id));
      if (status === "like") {
        toast.success("Friend Request sent ❤️");
      } else {
        toast.success("You Have Ignored 😊");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="group w-full max-w-md bg-[#16191e]/90 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-xl transition-all duration-500 hover:border-violet-500/30 hover:shadow-violet-500/10">
      {/* 1. Image Section */}
      <div className="relative h-66 overflow-hidden">
        <img
          src={photoURL}
          alt={firstName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#16191e] via-transparent to-black/20"></div>

        {/* Floating Badges */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white">
            {gender}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {company || "Open to work"}
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-6 space-y-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">
            {firstName} {lastName}
          </h2>
          <div className="flex items-center gap-2 text-slate-500">
            <HiOutlineBuildingOffice2 className="text-violet-500" size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
              {company}
            </span>
          </div>
        </div>

        {/* About Bio */}
        <p className="text-sm text-slate-400 leading-relaxed font-mono line-clamp-2 italic font-medium">
          {about ? `"${about}"` : "No bio provided."}
        </p>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-1.5">
          {skills?.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
          {skills?.length > 4 && (
            <span className="text-[10px] font-bold text-slate-600 self-center ml-1">
              +{skills.length - 4} more
            </span>
          )}
        </div>

        {/* 3. Action Buttons */}
        <div className="flex gap-4 pt-2">
          {/* Pass Button */}
          <button
            onClick={() => handleSendReq("pass", _id)}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all duration-300 active:scale-95"
          >
            <HiXMark size={20} />
            Pass
          </button>

          {/* Connect Button */}
          <button
            onClick={() => handleSendReq("like", _id)}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-violet-900/20 hover:shadow-violet-600/40 hover:scale-[1.02] transition-all duration-300 active:scale-95"
          >
            <HiCheck size={20} />
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
