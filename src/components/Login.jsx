import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("kaivalya@email.com");
  const [password, setPassword] = useState("Surendra@27");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    console.log("Button Clicked!");
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true },
      );
      console.log("Login Successful:", res);
      dispatch(addUser(res.data));
      toast.success("Login Successful");
      navigate("/feed");
    } catch (err) {
      // Better error logging to see what the backend is actually saying
      console.error("Login Error:", err.response?.data || err.message);
      toast.error("Oops! something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center mt-20 px-4">
      <div className="card w-96 bg-base-100 shadow-xl border border-base-200 transition-shadow duration-300 hover:shadow-2xl">
        <div className="card-body p-8">
          {" "}
          <h2 className="text-3xl font-black text-center mb-6 tracking-tight  text-base-content">
            Login
          </h2>
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold opacity-70">Email</span>
            </label>
            <input
              type="email"
              value={email}
              placeholder="surendra@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full focus:input-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="form-control w-full mt-4">
            <label className="label py-1">
              <span className="label-text font-bold opacity-70">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full focus:input-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="card-actions justify-center mt-8">
            <button
              className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <p className="text-center text-sm mt-6 font-medium text-base-content/60">
            New here?{" "}
            <span className="link link-primary no-underline hover:underline decoration-2 font-bold">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
