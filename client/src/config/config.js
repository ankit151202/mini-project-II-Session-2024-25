const API_URL = "https://backendnews-ikp9.onrender.com";

export const config = {
  api: {
    articles: `${API_URL}/news/`,
    articlesByCategory: (category) => `${API_URL}/news/${category}`,
  },
};
