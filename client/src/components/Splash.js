// Import all relevant packages and components
import { makeStyles } from "@material-ui/core/styles";
import Image from "../images/splash.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles({
	gradientStyle: {
		bottom: "0px",
		position: "fixed",
		height: "100%",
		width: "100%",
		opacity: "0.7",
		zIndex: "-101",
	},
});
// Create the component function and export for use
export default function Splash() {
	// Call the styles function
	const classes = useStyles();
	// Create the JSX for the component
	return (
		<CssBaseline>
			<div className={classes.gradientStyle}>
				<img src={Image} alt='forest' className={classes.gradientStyle} />
			</div>
		</CssBaseline>
	);
}
