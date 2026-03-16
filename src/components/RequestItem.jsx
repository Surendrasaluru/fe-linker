import React from "react";
import { removeRequestFromList } from "../utils/requestSlice";
import { FaUserCircle, FaCheck, FaTimes, FaCommentAlt } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import getTime from "../utils/getTime";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const RequestItem = ({ request }) => {
  const dispatch = useDispatch();
  const {
    _id, // This is the Request ID (from row._id)
    firstName,
    lastName,
    photoURL,
    about,
    company,
    createdAt,
  } = request;

  const reviewReq = async (status, _id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      console.log(res, _id);
      if (res.status === 200) {
        // DISPATCH the action to remove it from the Redux store
        dispatch(removeRequestFromList(_id));
      }
      toast.success(`Request ${status} succesfully`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="group relative bg-[#0f1115] border border-slate-800 rounded-xl p-3 mb-3 hover:border-violet-500/50 transition-all duration-300 shadow-2xl">
      {/* Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-linear-to-r from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          {/* Hexagonal-style Avatar Container */}
          <div className="relative">
            <div className="w-11 h-11 bg-slate-800 rounded-lg rotate-3 group-hover:rotate-0 transition-transform duration-300 overflow-hidden border border-slate-700">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={firstName}
                  className="w-full h-full object-cover -rotate-3 group-hover:rotate-0 scale-110 transition-transform"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-slate-600 p-1" />
              )}
            </div>
            {/* Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-violet-500 rounded-full border-2 border-[#0f1115]"></div>
          </div>

          {/* User Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                {firstName} {lastName}
              </h3>
              <span className="text-[9px] text-violet-400 font-mono border border-violet-500/30 px-1.5 py-0.5 rounded uppercase">
                Incoming
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1 text-slate-400">
              <div className="flex items-center gap-1">
                <HiOutlineBuildingOffice2
                  size={12}
                  className="text-slate-500"
                />
                <span className="text-[10px] font-medium">
                  {company || "Tech Talent"}
                </span>
              </div>
              <span className="text-slate-700">|</span>
              <p className="text-[10px] truncate max-w-37.5 italic text-slate-500">
                {about || "Full-stack Developer"}
              </p>
            </div>
          </div>
          <span className="px-1.5 py-0.5 border border-violet-500/20 text-violet-400 text-[8px] font-bold rounded uppercase tracking-wider bg-violet-500/5">
            {getTime(createdAt)}
          </span>
        </div>

        {/* Action Buttons: Minimalist Outlined Style */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => reviewReq("accepted", _id)}
            className="h-8 px-3 flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-bold rounded-md transition-all active:scale-95"
          >
            <FaCheck />
            Accept
          </button>
          <button
            onClick={() => reviewReq("rejected", _id)}
            className="h-8 w-8 flex items-center justify-center border border-slate-700 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 rounded-md transition-all"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Embedded Message: Integrated look */}
      <div className="mt-3 flex items-center gap-2 px-2 py-1.5 bg-slate-900/50 border-l-2 border-violet-500 rounded-r-md">
        <FaCommentAlt size={10} className="text-violet-500 opacity-70" />
        <p className="text-[11px] text-slate-300 font-medium tracking-wide">
          "Hi, I'd love to connect and talk shop!"
        </p>
      </div>
    </div>
  );
};

export default RequestItem;
