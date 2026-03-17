import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        formData, // Your email, pswd, firstName, lastName
        { withCredentials: true }, // Crucial for cookies/sessions
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Account Created! Redirecting...");
        dispatch(addUser(res.data.data)); // Save user to Redux immediately
        navigate("/feed");
      }
    } catch (err) {
      // Show the error message from your backend (e.g., "Email already exists")
      const errorMsg = err.response?.data || "Something went wrong";
      toast.error(typeof errorMsg === "string" ? errorMsg : "Validation Error");
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f1115] border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Background Glow Decor */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-fuchsia-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            Create Account<span className="text-violet-500">.</span>
          </h2>
          <p className="text-slate-500 text-sm mb-8 font-medium">
            Join the developer network and start connecting.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">
                  First Name
                </label>
                <div className="relative group">
                  <FaUser
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-violet-500 transition-colors"
                    size={14}
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-200 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">
                Email Address
              </label>
              <div className="relative group">
                <FaEnvelope
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-violet-500 transition-colors"
                  size={14}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">
                Password
              </label>
              <div className="relative group">
                <FaLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-violet-500 transition-colors"
                  size={14}
                />
                <input
                  type="text"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-violet-900/20"
            >
              Create Account
              <FaArrowRight size={14} />
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-xs">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-violet-400 hover:underline cursor-pointer font-bold">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
