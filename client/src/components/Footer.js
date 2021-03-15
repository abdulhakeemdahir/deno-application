import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
	footerStyle: {
		bottom: "20px",
		position: "relative",
		// height: "45vh",
		width: "100%",
		zIndex: "1",
		color: "#008394",
		padding: "10px",
	},
	heart: {
		color: "#ed4b82",
	},
});
export default function Footer() {
	const classes = useStyles();
	return (
		<CssBaseline>
			<Grid align='center'>
				<Typography variant='body1' className={classes.footerStyle}>
					Built with <span className={classes.heart}>♥︎</span> by: Abdulhakeem
					Dahir, Taani Maama, Daniel Soledad, Keenan Reed
				</Typography>
			</Grid>
		</CssBaseline>
	);
}
