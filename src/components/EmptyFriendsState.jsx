import { FaUserPlus, FaGhost } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmptyFriendsState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
      {/* Icon with a subtle bounce animation */}
      <div className="bg-white p-6 rounded-full shadow-lg mb-6 animate-bounce">
        <FaGhost className="text-indigo-400 w-12 h-12" />
      </div>

      <h2 className="text-2xl font-black text-gray-800 mb-2">
        You Are Not Alone ...
      </h2>

      <p className="text-gray-500 max-w-xs mb-8">
        No Friends yet ! Start Making New Mate For Yourself By Exploring Feed
      </p>
      <Link to="/feed">
        <button className="flex items-center gap-2 px-8 py-3 bg-violet-500 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95">
          <FaUserPlus />
          Explore People
        </button>
      </Link>
    </div>
  );
};
export default EmptyFriendsState;
