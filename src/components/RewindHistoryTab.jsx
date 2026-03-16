import { useNavigate } from "react-router-dom";
import { HiOutlineArrowPath, HiOutlineChevronRight } from "react-icons/hi2";

const RewindHistoryTab = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#16191e]/80 backdrop-blur-xl rounded-4xl border border-white/5 p-4 shadow-2xl group hover:border-violet-500/20 transition-all duration-500">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Icon & Text */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
            <HiOutlineArrowPath
              size={22}
              className="group-hover:rotate-45 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-[15px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">
              Rewind
            </h3>
            <p className="text-[17px] font-bold text-white/90 leading-tight">
              Check history of <br /> passed users
            </p>
          </div>
        </div>

        {/* Right Section: Navigation Button */}
        <button
          onClick={() => navigate("/ignored")}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300 active:scale-90"
        >
          <HiOutlineChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default RewindHistoryTab;
