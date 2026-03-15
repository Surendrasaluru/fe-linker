import axios from "axios";
import React, { useEffect, useState } from "react";

const MiniNews = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get("https://dev.to/api/articles?per_page=3&top=1")
      .then((res) => setNews(res.data));
  }, []);
  return <div>Mini</div>;
};

export default MiniNews;
