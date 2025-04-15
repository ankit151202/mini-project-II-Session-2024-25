import React, { useState, useEffect } from "react";
import axios from "axios";
import CardList from "./CardList";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [newsType, setNewsType] = useState(localStorage.getItem("preferredNews") || "technology");

  // Fetch news articles based on selected news type
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?category=${newsType}&apiKey=YOUR_API_KEY`);
        setArticles(res.data.articles);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();
  }, [newsType]);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#fff" }}>Latest {newsType.charAt(0).toUpperCase() + newsType.slice(1)} News</h2>
      <CardList articles={articles} />
    </div>
  );
};

export default HomePage;
