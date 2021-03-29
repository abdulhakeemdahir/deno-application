// Import all relevant packages and components
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles({
<<<<<<< HEAD
  gradientStyle: {
    // backgroundColor: "rgb(0, 212, 255)",
    background:
      "linear-gradient(180deg, rgba(0,212,255,0) 0%, rgba(29,233,182,0.3566887535816619) 51%, rgba(29,196,233,.5) 120%);",
    bottom: "0px",
    position: "fixed",
    height: "45vh",
    width: "100%",
    zIndex: "-100"
  }
});

const Gradient = () => {
  const classes = useStyles();
  return (
    <CssBaseline>
      <div className={classes.gradientStyle}></div>
    </CssBaseline>
  );
};

export default Gradient;
=======
	gradientStyle: {
		background:
			"linear-gradient(180deg, rgba(0,212,255,0) 0%, rgba(29,233,182,0.3566887535816619) 51%, rgba(29,196,233,.5) 120%);",
		bottom: "0px",
		position: "fixed",
		height: "45vh",
		width: "100%",
		zIndex: "-100",
	},
});
// Create the component function and export for use
export default function Gradient() {
	// Call the styles function
	const classes = useStyles();
	// Create the JSX for the component
	return (
		<CssBaseline>
			<div className={classes.gradientStyle}></div>
		</CssBaseline>
	);
}
>>>>>>> 521f35c10e4c724c503d7d978474ade76780692b
