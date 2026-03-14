import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

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
    <div className="min-h-screen bg-base-300/30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:16px_16px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {/* Main Profile Card */}
          <div className="card bg-base-400 shadow-xl border border-base-300 overflow-hidden">
            {/* Profile Header/Cover - Optional gradient for style */}
            <div className="h-20 bg-linear-to-r from-primary to-secondary opacity-80"></div>

            <div className="px-5 pb-5">
              {/* Avatar - Pulled from your photoURL */}
              <div className="avatar -mt-10 mb-3 justify-center flex">
                <div className="w-24 rounded-full ring ring-base-100 ring-offset-2 shadow-lg bg-base-100">
                  <img src={user?.photoURL} alt="Profile" />
                </div>
              </div>

              {/* Identity */}
              <div className="text-center">
                <h2 className="text-xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-xs opacity-60 font-mono mb-3">
                  {user?.email}
                </p>

                <div className="badge badge-outline badge-sm mb-4 uppercase tracking-tighter">
                  {user?.gender || "Developer"}
                </div>
              </div>

              <div className="divider my-0"></div>

              {/* About Section */}
              <div className="py-4">
                <p className="text-sm leading-relaxed italic opacity-80">
                  "{user?.about || "No bio available."}"
                </p>
              </div>

              {/* Skills Section - Mapping through your skills array */}
              <div className="flex flex-wrap gap-2  mb-6">
                {user?.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className="badge badge-primary badge-outline text-[15px] font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* Edit Button */}
              <button className="btn btn-primary btn-block btn-sm shadow-md">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Suggested Extra Feature: Tech Stack Goals */}
          <div className="card bg-base-100 shadow-md border border-base-300 p-5">
            <h3 className="text-xs font-black uppercase opacity-50 mb-3 tracking-widest">
              Current Mission
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs checkbox-success"
                />
                <span className="text-xs">Optimize Feed CSS</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="checkbox checkbox-xs" />
                <span className="text-xs">Integrate Profile API</span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: The Feed Cards (Col span 6) */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-6">
          <h1 className="text-xl font-bold self-center ml-2">
            Recommended for you
          </h1>
          <FeedCard user={feed[9]} />
        </div>

        {/* RIGHT SIDEBAR: Management (Col span 3) */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-sm font-bold uppercase opacity-60 ml-2 tracking-widest mb-4">
            Network Activity
          </h2>

          {/* 1. Connections/Friends */}
          <div className="flex items-center justify-between p-3 bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:bg-base-300 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20">
                <span className="text-xl">❤️</span>
              </div>
              <span className="font-medium text-sm">Friends</span>
            </div>
            <button className="btn btn-xs btn-outline btn-primary px-4">
              View
            </button>
          </div>

          {/* 2. Received Requests */}
          <div className="flex items-center justify-between p-3 bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:bg-base-300 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20">
                <span className="text-xl">📥</span>
              </div>
              <span className="font-medium text-sm">Requests</span>
            </div>
            <button className="btn btn-xs btn-outline btn-secondary px-4">
              Open
            </button>
          </div>

          {/* 3. Sent/Pending Requests */}
          <div className="flex items-center justify-between p-3 bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:bg-base-300 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20">
                <span className="text-xl">📤</span>
              </div>
              <span className="font-medium text-sm">Sent Pending</span>
            </div>
            <button className="btn btn-xs btn-outline btn-accent px-4">
              Check
            </button>
          </div>

          {/* 4. Ignored/Rejected */}
          <div className="flex items-center justify-between p-3 bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:bg-base-300 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg group-hover:bg-error/20">
                <span className="text-xl">🚫</span>
              </div>
              <span className="font-medium text-sm">Rejected</span>
            </div>
            <button className="btn btn-xs btn-outline btn-error px-4">
              Manage
            </button>
          </div>

          {/* Summary Stat Card */}
          <div className="mt-8 p-5 bg-base-300/50 rounded-2xl border border-dashed border-base-300">
            <p className="text-[10px] font-bold uppercase opacity-40 mb-3">
              Quick Stats
            </p>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-lg font-black">24</p>
                <p className="text-[9px] uppercase opacity-60">Friends</p>
              </div>
              <div className="divider divider-horizontal mx-0"></div>
              <div className="text-center">
                <p className="text-lg font-black">156</p>
                <p className="text-[9px] uppercase opacity-60">Profile Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
