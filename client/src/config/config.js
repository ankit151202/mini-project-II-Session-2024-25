const API_URL = "https://backendnews-ikp9.onrender.com";

export const config = {
  api: {
    articles: `${API_URL}/news/`, // for general news
    articlesByCategory: (category) => `${API_URL}/news/${category}`, // for category-wise news
    search: `${API_URL}/news/`, // same as articles — we’ll use query ?q=searchTerm
  },
};
