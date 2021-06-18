import { CardMedia, Box, Button } from "@material-ui/core";
import { useStyles } from "./styles";
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLElement>, name: string) => {
    e.preventDefault();
    history.push(`/${name}`);
  };

  return (
    <>
      <CardMedia
        className={classes.logo}
        component="img"
        alt="logo"
        image={logo}
        title="Nịnutsu"
      />
      <Box className={classes.buttonsMenu}>
        <Button
          onMouseDown={(e) => handleClick(e, "practice")}
          className={classes.button}
          variant="contained"
        >
          Practice
        </Button>
        <Button
          onMouseDown={(e) => handleClick(e, "test")}
          className={classes.button}
          variant="contained"
        >
          Test
        </Button>
        <iframe
          title="Home background music"
          id="homeBGM"
          allow="autoplay"
          src={`${process.env.PUBLIC_URL}/audio/Naruto OST 1 -Naruto Main Theme.mp3`}
          frameBorder="0"
          style={{ display: "none" }}
        ></iframe>
      </Box>
    </>
  );
}
