import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [tab, setTab] = useState(0); // 0: Login, 1: Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [preferredNews, setPreferredNews] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setEmail("");
    setPassword("");
  };

  const login = async () => {
    try {
      const res = await axios.post("https://backendnews-ikp9.onrender.com/login", { email, password });
      setUserId(res.data.userId);
      setIsLoggedIn(true);
      localStorage.setItem("userEmail", email); // Save in localStorage
      if (onLogin) onLogin(email); // Inform App that user is logged in
    } catch (err) {
      alert("Login failed");
    }
  };

  const register = async () => {
    try {
      await axios.post("https://backendnews-ikp9.onrender.com/register", { email, password });
      alert("Registration successful. Please login.");
      setTab(0); // Switch to login tab
    } catch (err) {
      alert("Registration failed");
    }
  };

  const selectNews = async () => {
    if (!preferredNews) return alert("Please select a news type.");
    try {
      await axios.post("https://backendnews-ikp9.onrender.com/select-news", { userId, preferredNews });
      alert(`News preference "${preferredNews}" saved.`);
      localStorage.setItem("preferredNews", preferredNews); // Save the news preference
      navigate("/"); // Go to homepage
    } catch (err) {
      alert("Failed to save preference.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={4} style={{ padding: 32, width: 400, backgroundColor: "#1e1e1e" }}>
        {!isLoggedIn ? (
          <>
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            <Box mt={3}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: 16 }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#bbb" } }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: 24 }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#bbb" } }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={tab === 0 ? login : register}
              >
                {tab === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom style={{ color: "#fff" }}>
              Welcome! Choose your preferred news category:
            </Typography>
            <FormControl fullWidth style={{ marginTop: 16 }}>
              <InputLabel style={{ color: "#bbb" }}>News Type</InputLabel>
              <Select
                value={preferredNews}
                onChange={(e) => setPreferredNews(e.target.value)}
                style={{ color: "#fff" }}
              >
                <MenuItem value="">--Select--</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
                <MenuItem value="politics">Politics</MenuItem>
                <MenuItem value="entertainment">Entertainment</MenuItem>
              </Select>
            </FormControl>
            <Box mt={3}>
              <Button variant="contained" color="primary" fullWidth onClick={selectNews}>
                Save Preference
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;
