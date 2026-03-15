import axios from "axios";
import React, { useEffect } from "react";
import { addRequest } from "../utils/requestSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import EmptyRequestsState from "./EmptyRequestsState";
import { FaCcDiscover } from "react-icons/fa";
import {
  FaUserCircle,
  FaPaperPlane,
  FaEllipsisH,
  FaUserPlus,
} from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import RequestItem from "./RequestItem";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data));

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!requests || requests.length === 0) {
      fetchRequests();
      toast.success("Requests Fetched ");
    }
  }, []);
  if (!requests) return <div className="text-center p-10">Loading...</div>;
  if (requests.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-10">
        <EmptyRequestsState />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-3">
        {requests &&
          requests.map((request) => <RequestItem request={request} />)}

        {/* Add Friend Suggestion Button */}
        <Link to="/feed">
          <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center space-x-2 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all mt-4">
            <FaCcDiscover />

            <span className="font-medium">Go Feed</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Requests;
