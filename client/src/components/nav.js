import React from "react";
import { ThemeProvider, createTheme, Typography } from "@material-ui/core";
import { BottomNavigation, BottomNavigationAction, Paper } from "@material-ui/core";
import { Public, Work, Movie, LocalHospital, SettingsApplications, SportsBasketball, Devices } from "@material-ui/icons";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00bcd4" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#b0b0b0" },
  },
});

const Navbar = ({ onCategoryChange }) => {
  const [value, setValue] = React.useState("general");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onCategoryChange(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} style={{ position: "sticky", top: 0, width: "100%", zIndex: 1000, padding: "10px", textAlign: "center" }}>
        <Typography variant="h5" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#00bcd4" }}>
          News Aggregator
        </Typography>
        
        <BottomNavigation value={value} onChange={handleChange} style={{ backgroundColor: "transparent", display: "flex", justifyContent: "center" }}>
          <BottomNavigationAction label="General" value="general" icon={<Public />} />
          <BottomNavigationAction label="Business" value="business" icon={<Work />} />
          <BottomNavigationAction label="Entertainment" value="entertainment" icon={<Movie />} />
          <BottomNavigationAction label="Health" value="health" icon={<LocalHospital />} />
          <BottomNavigationAction label="Science" value="science" icon={<SettingsApplications />} />
          <BottomNavigationAction label="Sports" value="sports" icon={<SportsBasketball />} />
          <BottomNavigationAction label="Technology" value="technology" icon={<Devices />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
};

export default Navbar;