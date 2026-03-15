import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import TechNews from "./TechNews";

import Network from "./Network";
import { Link } from "react-router-dom";
import Friends from "./Friends";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user?.data);
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/feed",

        { withCredentials: true },
      );
      console.log(res.data);

      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Failed to fetch feed:", err);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (feed !== null) return;

    // If we already have a feed, don't fetch again (prevents redundant API calls)

    getFeed();
  }, [user, feed]);
  if (!user)
    return (
      <h1 className="text-center mt-10">Please Login to view the feed.</h1>
    );

  if (feed === null) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="font-mono text-sm animate-pulse">
          Scanning the network for matches...
        </p>
      </div>
    );
  }
  if (feed.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl mb-4">🏜️</h1>
        <h1 className="text-2xl font-bold opacity-70">
          No new profiles found!
        </h1>
        <p className="max-w-xs mt-2 opacity-50">
          You've seen everyone in your area. Check back later or update your
          skills to find new peers.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-300 selection:bg-violet-500/30">
      {/* Subtle Fixed Background Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [bg-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: PROFILE (Sticky) */}
          <div className="lg:col-span-3 sticky top-24">
            <div className="card w-full bg-[#16191e]/80 backdrop-blur-xl shadow-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-violet-500/30 group">
              {/* Banner */}
              <div className="h-20 bg-linear-to-br from-violet-600 via-primary to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.5),transparent)]"></div>
              </div>

              <div className="px-5 pb-5">
                {/* Avatar */}
                <div className="avatar -mt-10 mb-3 justify-center flex">
                  {/* OUTER WRAPPER: relative but NO overflow-hidden */}
                  <div className="w-24 h-24 relative">
                    {/* INNER WRAPPER: This clips the image only */}
                    <div className="w-full h-full ring-4 ring-[#16191e] shadow-2xl bg-base-300 overflow-hidden">
                      <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="object-cover h-full w-full"
                      />
                    </div>

                    {/* GREEN DOT: Now sits on top and isn't cut off */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-[#16191e] rounded-full z-20"></div>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h2 className="text-xl font-black text-white tracking-tight leading-none group-hover:text-violet-400 transition-colors">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                    {user?.email}
                  </p>

                  <div className="flex items-center justify-center gap-2 pt-2 pb-1">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {user?.gender || "User"}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                        {user?.company || "Virtusa"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divider before:bg-white/5 after:bg-white/5 my-3"></div>

                <p className="text-[11px] text-slate-400 leading-relaxed text-center italic px-1 line-clamp-3 mb-4">
                  "
                  {user?.about || "Solving complex problems with elegant code."}
                  "
                </p>

                {/* --- Added Skills Section --- */}
                <div className="mb-5">
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {user?.skills?.length > 0
                      ? user.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-[10px] font-semibold text-violet-300 transition-all hover:bg-violet-500/20"
                          >
                            {skill}
                          </span>
                        ))
                      : ["React", "Node.js", "Tailwind"].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-400"
                          >
                            {skill}
                          </span>
                        ))}
                  </div>
                </div>
                <Link to="/profile">
                  <button className="btn btn-primary btn-block btn-sm h-10 rounded-xl border-none bg-linear-to-r from-violet-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-violet-900/20">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            {/* Optional: Max-width keeps the card from getting too wide on big screens */}
            <div className="w-full max-w-2xl space-y-6">
              {/* This wrapper ensures the FeedCard sits dead center */}
              <div className="flex justify-center w-full">
                <FeedCard user={feed[7]} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: NETWORK (Sticky) */}
          <div className="lg:col-span-3 sticky top-24 space-y-6">
            <TechNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
