import { Card } from "@material-ui/core";
import Webcam from "react-webcam";
import { useState } from "react";
import { handSeals } from "./utilities";
import * as tf from "@tensorflow/tfjs";
import { Ninjutsu } from "./Ninjutsu";

interface Props {
  webcamRef: React.RefObject<Webcam>;
  net: tf.GraphModel;
  jutsu: Ninjutsu;
}

export default function HandSeal({ net, webcamRef, jutsu }: Props) {
  const [currentSeal, setCurrentSeal] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("begin");

  //const jutsu = ["snake", "tiger", "boar", "horse", "tiger"];
  let index = 0;
  // const test = ["11", "2", "12", "1", "2", "11", "6", "12"];
  // let testIndex = 0;

  const runCoco = () => {
    //  Loop and detect hands
    console.log("runCoco");
    if (isRunning === false && status === "started") {
      setInterval(() => {
        console.log("interval running");
        detect(net);
      }, 16.7);
      setIsRunning(true);
    }
  };

  const play = (name: string) => {
    const audio = document.getElementById(name) as HTMLVideoElement;
    console.log("play");
    audio.play();
  };

  const startGame = () => {
    setStatus("started");
  };

  const detect = async (net: any) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video!.readyState === 4
    ) {
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
            // const text = `${Math.floor(Math.random() * 7) + 1}`;
            //console.log("text: ", text);
            //const text = test[testIndex];
            //testIndex += 1;
            if (handSeals[text]["name"] === jutsu.combo[index]) {
              console.log("change", handSeals[text]["name"]);
              play("chanelingAudio");
              setCurrentSeal(text);
              index += 1;
              if (index === jutsu.combo.length) {
                play("doneAudio");
                play("jutsuAudio");
                index = 0;
                //testIndex = 0;
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
      }}
    >
      <h1>{jutsu.name}</h1>
      {currentSeal !== "" ? (
        <>
          <img
            src={handSeals[currentSeal]["img"]}
            alt={handSeals[currentSeal]["name"]}
          />
          <h2>{handSeals[currentSeal]["name"]}</h2>
        </>
      ) : (
        <h1>Loading</h1>
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
      <button
        onClick={() => {
          startGame();
        }}
      >
        start
      </button>
    </Card>
  );
}
