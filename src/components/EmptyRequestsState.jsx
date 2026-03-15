import { IoMailOpenOutline } from "react-icons/io5";
import { FaCompass } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmptyRequestsState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
      {/* Icon with subtle pulse */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-blue-50 p-5 rounded-full">
          <IoMailOpenOutline className="text-blue-500 w-10 h-10" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800">Inbox is empty</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-50 mx-auto">
        No one has sent you a request yet. Why not reach out first?
      </p>

      {/* Action Button to redirect to Discovery/Explore */}
      <Link to="/feed">
        <button className="mt-6 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          <FaCompass />
          Discover people you may know
        </button>
      </Link>
    </div>
  );
};
export default EmptyRequestsState;
