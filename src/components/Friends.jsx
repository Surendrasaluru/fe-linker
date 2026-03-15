import axios from "axios";
import React from "react";
import { useEffect } from "react";

import {
  FaUserCircle,
  FaPaperPlane,
  FaEllipsisH,
  FaUserPlus,
} from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { addFriend } from "../utils/friendSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FaRegPaperPlane } from "react-icons/fa6";
import { Link } from "react-router-dom";
import EmptyFriendsState from "./EmptyFriendsState";

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((store) => store.friend);
  const fetchFriends = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/friends", {
        withCredentials: true,
      });
      dispatch(addFriend(res.data));

      console.log(res.data);
      console.log(friends);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!friends || friends.length === 0) {
      fetchFriends();
      toast.success("friends Fetched ");
    }
  }, []);
  if (!friends) return <div className="text-center p-10">Loading...</div>;
  if (friends.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-10">
        <EmptyFriendsState />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-3">
        {friends &&
          friends.map((friend) => (
            <div
              key={friend._id}
              className="group relative bg-[#0f1115] border border-slate-800 rounded-xl p-3 mb-3 hover:border-violet-500/50 transition-all duration-300 shadow-2xl overflow-hidden"
            >
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-linear-to-r from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  {/* Hexagonal-style Geometric Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-slate-800 rounded-lg rotate-0 group-hover:rotate-10 transition-transform duration-300 overflow-hidden border border-slate-700">
                      <img
                        src={friend.photoURL}
                        alt={friend.firstName}
                        className="w-full h-full object-cover -rotate-3 group-hover:rotate-0 scale-110 transition-transform duration-500"
                      />
                    </div>
                    {/* Active Status Ring (Violet instead of green to match theme) */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-violet-500 rounded-full border-2 border-[#0f1115]"></div>
                  </div>

                  {/* Identity & Bio */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                        {friend.firstName} {friend.lastName}
                      </h3>
                      <HiOutlineBadgeCheck
                        className="text-blue-500 w-4 h-4 opacity-80"
                        title="Verified Friend"
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] text-slate-500 line-clamp-1 max-w-45 font-medium italic">
                        {friend.about || "Tech Enthusiast"}
                      </p>
                    </div>

                    <div className="flex items-center mt-1.5 gap-2">
                      <span className="px-1.5 py-0.5 border border-violet-500/20 text-violet-400 text-[8px] font-bold rounded uppercase tracking-wider bg-violet-500/5">
                        Member
                      </span>
                      <span className="text-[9px] text-slate-600 font-mono font-semibold">
                        #{friend._id.toString().slice(-5)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interaction Section */}
                <div className="flex items-center gap-2">
                  {/* Premium Messaging Feature - Coming Soon */}
                  <div className="relative group/tooltip">
                    <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed transition-all duration-300 shadow-inner">
                      <FaRegPaperPlane size={12} className="opacity-40" />

                      {/* Small Premium Badge */}
                      <span className="absolute -top-1.5 -right-1.5 bg-linear-to-r from-violet-500 to-fuchsia-500 text-[7px] font-black text-white px-1 py-0.5 rounded shadow-sm uppercase">
                        2.0
                      </span>
                    </button>

                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block w-max bg-slate-800 border border-slate-700 text-slate-200 text-[9px] px-2 py-1 rounded shadow-2xl">
                      Messaging coming soon
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700"></div>
                    </div>
                  </div>

                  {/* Options Button */}
                  <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-100 transition-colors">
                    <FaEllipsisH size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

        {/* Add Friend Suggestion Button */}
        <Link to="/feed">
          <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center space-x-2 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all mt-4">
            <FaUserPlus />

            <span className="font-medium">Find more friends</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Friends;
