import React, { useState, useEffect } from "react";
import axios from "axios";

const TechNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetching top 4 trending articles
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

  if (loading) return <div className="skeleton h-32 w-full bg-base-300"></div>;

  return (
    <div className="card bg-base-100 shadow-md border border-base-300 p-5">
      <h3 className="text-xs font-black uppercase opacity-50 mb-4 tracking-widest flex items-center justify-between">
        Trending in Tech
        <span className="badge badge-xs badge-primary animate-pulse">LIVE</span>
      </h3>

      <div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <p className="text-[13px] font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] opacity-40">
                {article.readable_publish_date}
              </span>
              <span className="text-[10px] opacity-40">•</span>
              <span className="text-[10px] opacity-40">
                {article.public_reactions_count} reactions
              </span>
            </div>
          </a>
        ))}
      </div>

      <button className="btn btn-ghost btn-xs mt-4 w-full opacity-40 hover:opacity-100">
        View more on Dev.to
      </button>
    </div>
  );
};

export default TechNews;
