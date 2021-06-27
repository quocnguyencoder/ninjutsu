import {
  Avatar,
  Box,
  Card,
  Button,
  CardContent,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Webcam from "react-webcam";
import { useState, useEffect, useRef } from "react";
import { handSeals } from "./utilities";
import * as tf from "@tensorflow/tfjs";
import { jutsuList } from "./Ninjutsu";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

interface MatchParams {
  id: string;
}

interface Props {
  webcamRef: React.RefObject<Webcam>;
  net: tf.GraphModel;
}

export default function HandSeal({ net, webcamRef }: Props) {
  const [currentSeal, setCurrentSeal] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("begin");
  const { id } = useParams<MatchParams>();
  const intervalID = useRef<number>(0);

  const jutsu = jutsuList[+id];
  let index = 0;

  const runCoco = () => {
    //  Loop and detect hands
    console.log("runCoco");
    if (
      isRunning === false &&
      status === "started" &&
      intervalID.current === 0
    ) {
      intervalID.current = window.setInterval(() => {
        console.log("interval running", intervalID.current);
        detect(net);
      }, 16.7);
      setIsRunning(true);
    }
  };

  useEffect(() => {
    return () => {
      console.log("clear", intervalID.current);
      clearInterval(intervalID.current);
    };
  }, []);

  const play = (name: string) => {
    const audio = document.getElementById(name) as HTMLVideoElement;
    //console.log("play");
    audio.play();
  };

  const playBGM = (name: string) => {
    const audio = document.getElementById(name) as HTMLVideoElement;
    //console.log("play");
    audio.volume = 0.3;
    audio.play();
  };
  const stopBGM = (name: string) => {
    const audio = document.getElementById(name) as HTMLVideoElement;
    //console.log("play");
    audio.pause();
    audio.currentTime = 0;
  };

  const startGame = () => {
    playBGM("bgmAudio");
    setStatus("started");
  };
  const stopGame = () => {
    index = 0;
    stopBGM("bgmAudio");
    setStatus("begin");
  };
  const restartGame = () => {
    index = 0;
    setCurrentSeal("");
    stopBGM("bgmAudio");
    setStatus("begin");
  };

  const detect = async (net: any) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video!.readyState === 4
    ) {
      try {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video!.videoWidth;
        const videoHeight = webcamRef.current.video!.videoHeight;

        // Set video width
        webcamRef.current.video!.width = videoWidth;
        webcamRef.current.video!.height = videoHeight;

        //  Make Detections
        const img = tf.browser.fromPixels(video!);
        const resized = tf.image.resizeBilinear(img, [640, 480]);
        const casted = resized.cast("int32");
        const expanded = casted.expandDims(0);
        const obj = await net.executeAsync(expanded);
        //console.log(obj);

        const boxes = await obj[1].array();
        const classes = await obj[2].array();
        const scores = await obj[4].array();

        requestAnimationFrame(() => {
          for (let i = 0; i <= boxes.length; i++) {
            if (boxes[0][i] && classes[0][i] && scores[0][i] > 0.6) {
              const text = classes[0][i];
              if (handSeals[text]["name"] === jutsu.combo[index]) {
                console.log("change", handSeals[text]["name"]);
                play("chanelingAudio");
                setCurrentSeal(text);
                index += 1;
                if (index === jutsu.combo.length) {
                  play("doneAudio");
                  play("jutsuAudio");
                  index = 0;
                  setStatus("done");
                }
              }
            }
          }
        });

        tf.dispose(img);
        tf.dispose(resized);
        tf.dispose(casted);
        tf.dispose(expanded);
        tf.dispose(obj);
      } catch (err) {}
    }
  };

  runCoco();

  return (
    <Card
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
        maxHeight: "80%",
        gap: "1px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {jutsu.name}
        </Typography>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="flag" src={jutsu.type} />
          </ListItemAvatar>
          <ListItemText primary={`Combo: ${jutsu.combo.toString()}`} />
        </ListItem>
      </CardContent>

      {currentSeal !== "" ? (
        status === "done" ? (
          <>
            <CheckCircleOutlineIcon
              style={{ width: "70px", height: "70px" }}
              fontSize="large"
            />
            <Typography gutterBottom variant="body2" component="h2">
              Well Done!
            </Typography>
          </>
        ) : (
          <>
            <Avatar
              style={{ width: "70px", height: "70px" }}
              src={handSeals[currentSeal]["img"]}
              alt={handSeals[currentSeal]["name"]}
            />
            <Typography gutterBottom variant="body2" component="h2">
              {handSeals[currentSeal]["name"]}
            </Typography>
          </>
        )
      ) : (
        <PlayCircleOutlineIcon
          style={{ width: "90px", height: "90px" }}
          fontSize="large"
        />
      )}
      {/* <Typography gutterBottom variant="body2" component="h2">
        {status}
      </Typography> */}

      <audio id="chanelingAudio" preload="true">
        <source src={`${process.env.PUBLIC_URL}/audio/chaneling.mp3`}></source>
      </audio>
      <audio id="doneAudio" preload="true">
        <source src={`${process.env.PUBLIC_URL}/audio/done.mp3`}></source>
      </audio>
      <audio id="jutsuAudio" preload="true">
        <source src={jutsu.soundURL}></source>
      </audio>
      <audio id="bgmAudio" preload="true">
        <source
          src={`${process.env.PUBLIC_URL}/audio/Naruto OST 1 - Strong and Strike.mp3`}
        ></source>
      </audio>
      <Box style={{ marginTop: "4%" }}>
        {status === "done" ? (
          <Button
            onClick={() => {
              restartGame();
            }}
            variant="contained"
            color="primary"
          >
            restart
          </Button>
        ) : status === "begin" ? (
          <Button
            onClick={() => {
              startGame();
            }}
            variant="contained"
            color="primary"
          >
            start
          </Button>
        ) : (
          <Button
            onClick={() => {
              stopGame();
            }}
            variant="contained"
            color="secondary"
          >
            stop
          </Button>
        )}
      </Box>
    </Card>
  );
}
