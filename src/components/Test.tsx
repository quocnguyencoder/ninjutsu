import { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

interface Props {
  net: tf.GraphModel;
}

export default function Test({ net }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalID = useRef<number>(0);
  const history = useHistory();
  const classes = useStyles();

  const runCoco = () => {
    //  Loop and detect hands
    console.log("runcoco", intervalID.current);
    intervalID.current = window.setInterval(() => {
      console.log("test interval", intervalID.current);
      detect(net);
    }, 16.7);
  };

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    // returned function will be called on component unmount
    clearInterval(intervalID.current - 1);
    return () => {
      console.log("clear", intervalID.current);
      clearInterval(intervalID.current);
    };
  }, []);

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

        // Set canvas height and width
        canvasRef.current!.width = videoWidth;
        canvasRef.current!.height = videoHeight;

        // 4. TODO - Make Detections
        const img = tf.browser.fromPixels(video!);
        const resized = tf.image.resizeBilinear(img, [640, 480]);
        const casted = resized.cast("int32");
        const expanded = casted.expandDims(0);
        const obj = await net.executeAsync(expanded);
        console.log(obj);

        const boxes = await obj[1].array();
        const classes = await obj[2].array();
        const scores = await obj[4].array();

        canvasRef.current!.width = videoWidth;
        canvasRef.current!.height = videoHeight;
        // Draw mesh
        const ctx = canvasRef.current!.getContext(
          "2d"
        ) as CanvasRenderingContext2D;

        // 5. TODO - Update drawing utility
        // drawSomething(obj, ctx)
        requestAnimationFrame(() => {
          drawRect(
            boxes[0],
            classes[0],
            scores[0],
            0.8,
            videoWidth,
            videoHeight,
            ctx
          );
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
    <div className={classes.testPageWrapper}>
      <button onClick={goBack}>Go back</button>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            //display: "none",
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 600,
            height: 400,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
          }}
        />
      </header>
    </div>
  );
}
