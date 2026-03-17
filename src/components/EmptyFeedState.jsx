import React from "react";

import { HiOutlineSparkles } from "react-icons/hi2";
import { IoMdRefresh } from "react-icons/io";
import { Link } from "react-router-dom";

const EmptyFeedState = () => {
  return (
    <div className="group w-full max-w-md bg-[#16191e]/90 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl transition-all duration-500">
      {/* 1. Visual Header Section (Matches Image Height) */}
      <div className="relative h-66 bg-linear-to-br from-violet-600/10 via-transparent to-transparent flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-48 h-48 bg-violet-500 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* The "No Profiles" Icon */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="p-5 rounded-full bg-white/5 border border-white/10 shadow-inner">
            <HiOutlineSparkles
              size={48}
              className="text-violet-400 opacity-80"
            />
          </div>
        </div>

        {/* Floating "End" Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400">
            Discovery Paused
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-8 space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">
            You're All Caught Up!
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500/80">
            No more profiles in your area
          </p>
        </div>

        {/* Descriptive Text */}
        <p className="text-sm text-slate-400 leading-relaxed font-medium italic opacity-70">
          "Great things take time. Check back later to see new developers
          joining the community or try expanding your search settings."
        </p>

        {/* 3. Action Button (Matches Connect Button Style) */}
        <div className="pt-4">
          <Link to="/ignored">
            <button className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-white/3  border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-violet-600 hover:border-violet-500 transition-all duration-300 active:scale-95 group/btn">
              <IoMdRefresh
                size={18}
                className="group-hover/btn:rotate-180 transition-transform duration-500"
              />
              See Ignored Users
            </button>
          </Link>
          <p className="mt-4 text-[9px] text-slate-600 font-bold uppercase tracking-widest">
            Updates every 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyFeedState;
