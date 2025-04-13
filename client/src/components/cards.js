import React from "react";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00bcd4",
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

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
    padding: "30px",
    backgroundColor: theme.palette.background.default,
  },
  card: {
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0px 12px 36px rgba(0, 0, 0, 0.5)",
    },
  },
  media: {
    height: 200,
    position: "relative",
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)",
    },
  },
  content: {
    padding: theme.spacing(3),
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: "1.25rem",
    marginBottom: theme.spacing(1),
    textAlign: "left",
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: "0.95rem",
    marginBottom: theme.spacing(2),
    textAlign: "left",
  },
  button: {
    alignSelf: "flex-start",
    textTransform: "none",
  },
}));

const CardList = ({ articles = [] }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.cardContainer}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Card key={index} className={classes.card}>
              <div className={classes.media}>
                <img
                  src={
                    article.urlToImage ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={article.title}
                />
              </div>
              <CardContent className={classes.content}>
                <Typography className={classes.title}>
                  {article.title?.length > 70
                    ? `${article.title.substring(0, 70)}...`
                    : article.title}
                </Typography>
                <Typography className={classes.description}>
                  {article.description?.length > 120
                    ? `${article.description.substring(0, 120)}...`
                    : article.description}
                </Typography>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            variant="h6"
            align="center"
            style={{ color: "#ffffff", margin: "20px 0" }}
          >
            No articles available
          </Typography>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CardList;