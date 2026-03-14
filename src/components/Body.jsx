import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading } from "../utils/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((store) => store.user?.data);

  const isLoading = useSelector((store) => store.user.isLoading);

  const fetchUser = async () => {
    if (userdata) {
      dispatch(setLoading(false));
      return;
    }
    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.response?.status === 401) {
        // Only redirect if they aren't already on the login page
        if (window.location.pathname !== "/login") {
          toast.error("Session expired. Please login again.");
          navigate("/login");
        }
      }
      dispatch(setLoading(false));

      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <h1 className="ml-4 font-bold text-xl opacity-50 tracking-tighter">
          Loading StackMate...
        </h1>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
