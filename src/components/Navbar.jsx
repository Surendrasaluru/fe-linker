import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaInbox,
  FaUserFriends,
  FaCompass,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { removeFriend } from "../utils/friendSlice";
import { removeRequest } from "../utils/requestSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeIgnored } from "../utils/ignoredSlice";
import getTime from "../utils/getTime";

const Navbar = () => {
  const user = useSelector((store) => store.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true },
      );
      toast.success("Logged out successfully");
      dispatch(removeUser());
      dispatch(removeFriend());
      dispatch(removeRequest());
      dispatch(removeFeed());
      dispatch(removeIgnored());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="sticky top-0 z-[100] bg-[#0f1115]/80 backdrop-blur-md border-b border-slate-800 px-6 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link
            to={user ? "/feed" : "/login"}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <span className="text-white font-black text-xl tracking-tighter">
              Stack<span className="text-violet-500">Mate</span>
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/feed"
                className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <FaCompass className="text-violet-500" /> Feed
              </Link>
            </div>
          )}
        </div>

        {/* User Actions */}
        {user ? (
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white leading-none">
                {user.firstName}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                Pro Member since {getTime(user.createdAt)}
              </p>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="relative group">
                <div className="w-10 h-10 rounded-xl rotate-3 group-hover:rotate-0 transition-all duration-300 overflow-hidden border-2 border-slate-800 group-hover:border-violet-500/50">
                  <img
                    alt="Profile"
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    className="-rotate-3 group-hover:rotate-0 scale-110"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-violet-500 border-2 border-[#0f1115] rounded-full"></div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content mt-4 w-56 bg-[#16191f] border border-slate-800 rounded-xl p-2 shadow-2xl overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-slate-800 mb-2">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    Account
                  </p>
                </div>

                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-violet-600 hover:text-white rounded-lg transition-all"
                  >
                    <FaUserCircle size={16} /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-violet-600 hover:text-white rounded-lg transition-all"
                  >
                    <FaInbox size={16} /> Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/friends"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-violet-600 hover:text-white rounded-lg transition-all"
                  >
                    <FaUserFriends size={16} /> Friends
                  </Link>
                </li>

                <div className="divider before:bg-slate-800 after:bg-slate-800 my-1"></div>

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <FaSignOutAlt size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
