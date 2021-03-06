import { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import HandSeal from "./HandSeal";
import { Box } from "@material-ui/core";
import { jutsuList } from "./Ninjutsu";
import {
  Avatar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useStyles } from "./styles";

interface Props {
  net: tf.GraphModel;
}

export default function JutsuPractice({ net }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const history = useHistory();
  const classes = useStyles();

  const goBack = () => {
    history.goBack();
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    history.push(`/practice/${id}`);
    history.push(`/practice/${id}`);
    history.goBack();
  };

  return (
    <Box className={classes.jutsuPracticeWrapper}>
      <header style={{ width: "100%", marginTop: "3%" }}>
        <IconButton
          style={{ color: "white" }}
          size="small"
          edge="start"
          onClick={goBack}
        >
          <ArrowBackIosIcon />
          <Typography variant="body1" display="inline">
            Go back
          </Typography>
        </IconButton>
      </header>

      <Router>
        <Switch>
          <Route exact path="/practice/:id">
            <HandSeal net={net} webcamRef={webcamRef} />
          </Route>
          <Route exact path="/practice">
            <Typography
              style={{ marginTop: "2%" }}
              variant="h4"
              color="textSecondary"
            >
              Practice List
            </Typography>
            <List className={classes.jutsuList}>
              {jutsuList.map((jutsu) => {
                return (
                  <ListItem
                    button
                    key={jutsu.name}
                    onMouseDown={(e) =>
                      handleClick(e, jutsuList.indexOf(jutsu))
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt="flag" src={jutsu.type} />
                    </ListItemAvatar>
                    <ListItemText primary={jutsu.name} />
                  </ListItem>
                );
              })}
            </List>
            <iframe
              title="Practice background music"
              id="practiceBGM"
              allow="autoplay"
              src={`${process.env.PUBLIC_URL}/audio/Naruto OST 1 - Narutos Daily Life.mp3`}
              frameBorder="0"
              style={{ display: "none" }}
            ></iframe>
          </Route>
        </Switch>
      </Router>
      {console.log("rerender")}
      <Webcam
        ref={webcamRef}
        muted={true}
        style={{
          height: "0px",
          width: "0px",
          zIndex: 9,
          visibility: "hidden",
          position: "absolute",
        }}
      />
    </Box>
  );
}
