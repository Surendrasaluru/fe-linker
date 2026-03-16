import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIgnored, removeOneIgnored } from "../utils/ignoredSlice";
import toast from "react-hot-toast";
import EmptyRequestsState from "./EmptyRequestsState"; // Using your existing component
import { Link } from "react-router-dom";
import { FaCcDiscover } from "react-icons/fa6";
import { HiCheck } from "react-icons/hi2";

const IgnoredUsers = () => {
  const dispatch = useDispatch();
  const ignoredList = useSelector((store) => store.ignored);

  const fetchIgnored = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/pass", {
        withCredentials: true,
      });
      dispatch(addIgnored(res.data));
      toast.success("History Fetched");
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch ignored list");
    }
  };

  useEffect(() => {
    fetchIgnored();
  }, []);

  const handleConnect = async (status, userId) => {
    try {
      // Hit your existing send request API
      const res = await axios.post(
        "http://localhost:3000/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      console.log(userId);
      if (res.status === 200) {
        // DISPATCH the action to remove it from the Redux store
        dispatch(removeOneIgnored(userId));
      }
      // Remove from the local list so it disappears immediately

      toast.success("Connection request sent! ❤️");
    } catch (err) {
      toast.error("Action failed");
      console.log(err);
    }
  };

  if (!ignoredList)
    return (
      <div className="text-center p-10 skeleton h-64 w-full max-w-4xl mx-auto rounded-3xl"></div>
    );

  if (ignoredList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-10">
        <EmptyRequestsState />
        <Link to="/feed" className="block mt-6">
          <button className="btn btn-outline btn-wide flex mx-auto">
            Go to Feed
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-black text-white mb-6 uppercase tracking-tight italic">
        Passed Profiles
      </h1>

      <div className="space-y-4">
        {ignoredList.map((user) => (
          <div
            key={user._id}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#16191e]/60 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-violet-500/30 transition-all"
          >
            {/* 1. Photo */}
            <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={user.photoURL}
                alt={user.firstName}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* 2. User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-bold text-white">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-xs text-slate-400 line-clamp-1 italic">
                {user.about || "No bio available."}
              </p>
            </div>

            {/* 3. Connect Button */}
            <button
              onClick={() => handleConnect("like", user?.userId)}
              className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 shadow-lg shadow-violet-900/20 flex items-center gap-2"
            >
              <HiCheck size={16} />
              Connect
            </button>
          </div>
        ))}

        {/* Navigation Button */}
        <Link to="/feed">
          <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center space-x-2 text-slate-500 hover:border-violet-500/30 hover:text-violet-400 transition-all mt-6 bg-white/[0.02]">
            <FaCcDiscover size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">
              Back to Feed
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IgnoredUsers;
