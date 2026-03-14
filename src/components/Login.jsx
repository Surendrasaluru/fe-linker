import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("surendra@email.com");
  const [password, setPassword] = useState("Surendra@27");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const handleLogin = async () => {
    const newErrors = {};
    if (!email.includes("@")) newErrors.email = "Please enter a valid email";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log("Button Clicked!");
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true },
      );
      console.log("Login Successful:", res);
      dispatch(addUser(res.data.data));
      toast.success("Login Successful", {
        duration: 5000,
        icon: "🚀",
      });
      navigate("/feed");
    } catch (err) {
      // Better error logging to see what the backend is actually saying
      console.error("Login Error:", err.response?.data || err.message);

      const errorMsg = err.response?.data?.message || "Invalid Credentials";
      console.log(err.response);
      toast.error(errorMsg, {
        duration: 2000,
        icon: "😨",
      });
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" }); // Clear error on type
              }}
              className="input input-bordered w-full focus:input-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {errors.email && (
              <label className="label py-0">
                <span className="label-text-alt text-error font-semibold">
                  {errors.email}
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full mt-4">
            <label className="label py-1">
              <span className="label-text font-bold opacity-70">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                className={`input input-bordered w-full pr-12 focus:input-primary ${errors.password ? "input-error" : ""}`}
              />
              {/* Eye Toggle Button */}
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl opacity-50 hover:opacity-100 transition-opacity"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <label className="label py-0">
                <span className="label-text-alt text-success font-semibold">
                  {errors.password}
                </span>
              </label>
            )}
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
