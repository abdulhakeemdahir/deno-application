import { makeStyles } from "@material-ui/core/styles";
import Image from "../images/splash.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles({
  gradientStyle: {
    bottom: "0px",
    position: "fixed",
    height: "100%",
    width: "100%",
    opacity: "0.7",
    zIndex: "-101"
  }
});

const Splash = () => {
  const classes = useStyles();
  return (
    <CssBaseline>
      <div className={classes.gradientStyle}>
        <img src={Image} alt="forest" className={classes.gradientStyle} />
      </div>
    </CssBaseline>
  );
};

export default Splash;
