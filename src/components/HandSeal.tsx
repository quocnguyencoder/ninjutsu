import { Card } from "@material-ui/core";
import Webcam from "react-webcam";
import { useState, useEffect, useRef } from "react";
import { handSeals } from "./utilities";
import * as tf from "@tensorflow/tfjs";
import { jutsuList } from "./Ninjutsu";
import { useParams } from "react-router-dom";

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
    console.log("play");
    audio.play();
  };

  const startGame = () => {
    setStatus("started");
  };
  const stopGame = () => {
    index = 0;
    setStatus("begin");
  };
  const restartGame = () => {
    index = 0;
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
        width: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <h1>{jutsu.name}</h1>
      <h4>{jutsu.combo.toString()}</h4>
      {currentSeal !== "" ? (
        <>
          <img
            src={handSeals[currentSeal]["img"]}
            alt={handSeals[currentSeal]["name"]}
          />
          <h2>{handSeals[currentSeal]["name"]}</h2>
        </>
      ) : (
        <h1> </h1>
      )}
      <h1>{status}</h1>
      <audio id="chanelingAudio" preload="true">
        <source src={`${process.env.PUBLIC_URL}/audio/chaneling.mp3`}></source>
      </audio>
      <audio id="doneAudio" preload="true">
        <source src={`${process.env.PUBLIC_URL}/audio/done.mp3`}></source>
      </audio>
      <audio id="jutsuAudio" preload="true">
        <source src={jutsu.soundURL}></source>
      </audio>
      {status === "done" ? (
        <button
          onClick={() => {
            restartGame();
          }}
        >
          restart
        </button>
      ) : status === "begin" ? (
        <button
          onClick={() => {
            startGame();
          }}
        >
          start
        </button>
      ) : (
        <button
          onClick={() => {
            stopGame();
          }}
        >
          stop
        </button>
      )}
    </Card>
  );
}
