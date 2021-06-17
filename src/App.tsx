import { CssBaseline, Container } from "@material-ui/core";
import JutsuPractice from "./components/JutsuPractice";
import * as tf from "@tensorflow/tfjs";
import { useState, useEffect } from "react";

function App() {
  const [model, setModel] = useState<tf.GraphModel>();

  useEffect(() => {
    const fetchModel = async () => {
      const net = await tf.loadGraphModel(
        "https://tsjs-real-time-model.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
      );
      console.log(net);
      setModel(net);
    };
    fetchModel();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container
        style={{ backgroundColor: "#F0F8FF", height: "100vh" }}
        maxWidth="lg"
      >
        {model !== undefined && <JutsuPractice net={model!} />}
      </Container>
    </>
  );
}

export default App;
