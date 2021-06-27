import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import scroll from "../images/scroll1.png";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      maxHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1%",
      backgroundImage: `url(${process.env.PUBLIC_URL}/bg1.jpg)`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    logo: {
      marginTop: theme.spacing(6),
    },
    buttonsMenu: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8%",
      height: "20%",
      marginTop: theme.spacing(25),
    },
    button: {
      color: "white",
      background:
        "rgb(236,114,53) linear-gradient(90deg, rgba(236,114,53,1) 12%, rgba(232,134,64,1) 61%, rgba(252,225,69,1) 95%)",
      width: theme.spacing(28),
    },
    testPageWrapper: {
      marginTop: theme.spacing(10),
    },
    jutsuPracticeWrapper: {
      marginTop: theme.spacing(10),
      height: "70%",
      backgroundImage: `url("${scroll}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    jutsuList: {
      overflow: "auto",
      flex: "1",
      marginTop: theme.spacing(0.5),
      marginLeft: theme.spacing(4),
      marginBottom: theme.spacing(10),
    },
  })
);
