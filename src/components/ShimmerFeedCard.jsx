const ShimmerFeedCard = () => {
  return (
    <div className="w-full max-w-md bg-[#16191e]/90 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-xl">
      {/* 1. Image Section Skeleton */}
      <div className="relative h-66 w-full bg-slate-800 skeleton rounded-none">
        {/* Floating Badges Skeleton */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div className="w-12 h-5 rounded-full bg-white/10 skeleton"></div>
          <div className="w-24 h-5 rounded-full bg-white/10 skeleton"></div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-6 space-y-5">
        <div className="space-y-3">
          {/* Name & Title Skeleton */}
          <div className="h-8 w-3/4 bg-slate-800 skeleton rounded-lg"></div>
          <div className="h-4 w-1/2 bg-slate-800 skeleton rounded-md"></div>
        </div>

        {/* About Bio Skeleton */}
        <div className="space-y-2 mt-4">
          <div className="h-3 w-full bg-slate-800 skeleton rounded-md"></div>
          <div className="h-3 w-5/6 bg-slate-800 skeleton rounded-md"></div>
        </div>

        {/* Skills Grid Skeleton */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-6 w-16 bg-slate-800 skeleton rounded-lg"
            ></div>
          ))}
        </div>

        {/* 3. Action Buttons Skeleton */}
        <div className="flex gap-4 pt-4">
          <div className="flex-1 h-14 bg-slate-800 skeleton rounded-2xl"></div>
          <div className="flex-1 h-14 bg-slate-800 skeleton rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};
export default ShimmerFeedCard;
