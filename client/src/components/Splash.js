import { makeStyles } from "@material-ui/core/styles";
import Image from "../images/splash.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles({
	gradientStyle: {
		// backgroundColor: "rgb(0, 212, 255)",
		bottom: "0px",
		position: "fixed",
		height: "100%",
		width: "100%",
		opacity: "0.7",
		zIndex: "-101",
	},
});
export default function Splash() {
	const classes = useStyles();
	return (
		<CssBaseline>
			<div className={classes.gradientStyle}>
				<img src={Image} alt='forest' className={classes.gradientStyle} />
			</div>
		</CssBaseline>
	);
}
