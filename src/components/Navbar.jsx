import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaUserCircle, FaSignOutAlt, FaInbox } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user?.data);

  //console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(removeUser());
      await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true },
      );

      toast.success("Logged out succesfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to={user ? "/feed" : "/login"} className="btn btn-ghost text-xl">
          StackMate ❤️
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="flex items-center mr-4 font-semibold text-sm">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end mr-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.photoURL ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
              </div>
            </div>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile">
                  {/* Style icons directly with Tailwind classes */}
                  <FaUserCircle className="text-primary text-lg" />
                  Profile
                </Link>
              </li>
              <li>
                <Link>
                  <FaInbox className="text-secondary" />
                  Requests
                </Link>
              </li>
              <li>
                <Link>
                  <HiOutlineAdjustmentsHorizontal />
                  Settings
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button className="text-error" onClick={handleLogout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
