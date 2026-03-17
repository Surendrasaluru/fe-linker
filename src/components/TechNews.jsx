import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaRegClock, FaFire } from "react-icons/fa";

const TechNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "https://dev.to/api/articles?per_page=3&top=1",
        );
        setArticles(res.data);
        setLoading(false);
      } catch (err) {
        console.error("News fetch failed", err);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="p-3 space-y-2 bg-[#16191e]/80 rounded-2xl border border-white/5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 w-full bg-slate-800/50 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#16191e]/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all hover:border-violet-500/20">
      {/* Header - Reduced padding from p-4 to py-2.5 px-4 */}
      <div className="py-2.5 px-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <h3 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
          <FaFire className="text-orange-500 animate-pulse" /> Trending
        </h3>
        <span className="text-[9px] text-violet-400 font-bold hover:underline cursor-pointer">
          View All
        </span>
      </div>

      <div className="p-2 space-y-2">
        {" "}
        {/* Reduced padding from p-3 to p-2 */}
        {articles.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-violet-500/30 transition-all"
          >
            {/* Meta Row - Tighter spacing */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-400 font-bold uppercase tracking-tighter">
                {item.tag_list?.[0] || "Tech"}
              </span>
              <div className="flex items-center gap-1 text-[8px] text-slate-500">
                <FaRegClock size={9} />
                {item.reading_time_minutes}m
              </div>
            </div>

            {/* Title - Reduced font and margin */}
            <h4 className="text-[11px] font-bold text-slate-200 leading-tight group-hover:text-white transition-colors mb-2 line-clamp-2">
              {item.title}
            </h4>

            {/* Author Footer - Tighter padding */}
            <div className="flex items-center justify-between mt-auto pt-1.5 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-md overflow-hidden ring-1 ring-white/10 group-hover:ring-violet-500/50 transition-all">
                  <img
                    src={item.user.profile_image_90}
                    alt={item.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] text-slate-500 group-hover:text-slate-200 truncate max-w-20">
                  {item.user.name}
                </span>
              </div>

              <FaExternalLinkAlt
                size={8}
                className="text-slate-600 group-hover:text-violet-500 transition-colors"
              />
            </div>
          </a>
        ))}
      </div>

      {/* Footer - Slimmer design */}
      <div className="py-1.5 bg-violet-600/5 text-center border-t border-white/5">
        <p className="text-[8px] text-slate-500 font-medium tracking-tight">
          Curated by{" "}
          <span className="text-violet-400 font-bold">StackMate</span>
        </p>
      </div>
    </div>
  );
};

export default TechNews;
