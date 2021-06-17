import { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { handSeals } from "./utilities";
import HandSeal from "./HandSeal";
import { Box } from "@material-ui/core";
import { Ninjutsu, jutsuList } from "./Ninjutsu";

interface Props {
  net: tf.GraphModel;
}

export default function JutsuPractice({ net }: Props) {
  const webcamRef = useRef<Webcam>(null);

  return (
    <Box
      style={{
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HandSeal net={net} webcamRef={webcamRef} jutsu={jutsuList[0]} />
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
