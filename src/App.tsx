import { CssBaseline, Container, Box } from "@material-ui/core";
import JutsuPractice from "./components/JutsuPractice";
import Test from "./components/Test";
import Home from "./components/Home";
import * as tf from "@tensorflow/tfjs";
import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useStyles } from "./components/styles";

function App() {
  const [model, setModel] = useState<tf.GraphModel>();
  const classes = useStyles();

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
      <Box className={classes.root}>
        <Container style={{ height: "100vh" }} maxWidth="sm">
          <Router>
            <Switch>
              <Route path="/practice">
                {model !== undefined && <JutsuPractice net={model!} />}
              </Route>
              <Route exact path="/test">
                {model !== undefined && <Test net={model!} />}
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </Container>

        {/* <Box style={{ color: "white" }}>
          <br />
          <em>Ninjtsu, QuocNguyen612k 2021</em>
        </Box> */}
      </Box>
    </>
  );
}

export default App;
