import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Navbar from "./components/nav";
import CardList from "./components/cards";
import ApiService from "./services/api";
import Footer from "./components/footer";
import LoginPage from "./LoginPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
});

const HomePage = ({ onCategoryChange, onSearch, articles, onLogout, userEmail }) => (
  <>
    <Navbar
      onCategoryChange={onCategoryChange}
      onSearch={onSearch}
      onLogout={onLogout}
      userEmail={userEmail}
    />
    <CardList articles={articles} />
    <Footer />
  </>
);

const App = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(localStorage.getItem("preferredNews") || "general");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("userEmail"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

  useEffect(() => {
    if (isLoggedIn) {
      const fetchArticles = async () => {
        const response = await ApiService.fetchArticles(category, searchQuery);
        setArticles(response);
      };
      fetchArticles();
    }
  }, [category, searchQuery, isLoggedIn]);

  const handleCategoryChange = (category) => {
    setCategory(category);
    localStorage.setItem("preferredNews", category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLogin = (email) => {
    localStorage.setItem("userEmail", email);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail("");
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#ffffff" }}>
        <Routes>
          {/* Protected Route for Home */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <HomePage
                  onCategoryChange={handleCategoryChange}
                  onSearch={handleSearch}
                  articles={articles}
                  onLogout={handleLogout}
                  userEmail={userEmail}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Login Route */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
