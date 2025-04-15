import { config } from "../config/config";

const ApiService = {
  fetchArticles: async (category, searchQuery = "") => {
    let url;

    if (searchQuery.trim() !== "") {
      // Prioritize search query if present (assumes backend supports keyword search across all)
      url = `${config.api.search}?q=${encodeURIComponent(searchQuery)}`;
    } else {
      // Fall back to category-based fetch
      url =
        category === "general"
          ? config.api.articles
          : config.api.articlesByCategory(category);
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  },
};

export default ApiService;
