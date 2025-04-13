import React from "react";
import {
  ThemeProvider,
  createTheme,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00bcd4" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#b0b0b0" },
  },
});

const categories = [
  { label: "General", value: "general" },
  { label: "Business", value: "business" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
];

const Navbar = ({ onCategoryChange }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("general");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
    if (isMobile) setDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" style={{ backgroundColor: darkTheme.palette.background.paper }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h5"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: "#00bcd4",
              flexGrow: 1,
              textAlign: isMobile ? "center" : "left",
              marginLeft: isMobile ? 0 : 16,
            }}
          >
            News Aggregator
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box width={250} role="presentation">
          <List>
            {categories.map((cat) => (
              <ListItem
                button
                key={cat.value}
                selected={selectedCategory === cat.value}
                onClick={() => handleCategorySelect(cat.value)}
              >
                <ListItemText primary={cat.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {!isMobile && (
        <Box
          display="flex"
          justifyContent="center"
          bgcolor={darkTheme.palette.background.paper}
          p={1}
        >
          {categories.map((cat) => (
            <Box
              key={cat.value}
              mx={1.5}
              px={2}
              py={1}
              borderRadius="8px"
              style={{
                backgroundColor: selectedCategory === cat.value ? "#00bcd4" : "transparent",
                color: selectedCategory === cat.value ? "#000" : "#fff",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onClick={() => handleCategorySelect(cat.value)}
            >
              {cat.label}
            </Box>
          ))}
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Navbar;
