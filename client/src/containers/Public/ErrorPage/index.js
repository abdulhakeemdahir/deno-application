import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Gradient from "../../../components/Gradient";
import React from "react";
import { ErrorOutline } from "@material-ui/icons";
import Nav from "../../../components/Navigation";

const useStyles = makeStyles({
	centerPosition: {
		// padding: "20px",
		textAlign: "center",
	},
	centerContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
});

const ErrorPage = () => {
	const classes = useStyles();

	return (
		<div className='ErrorPage'>
			<Nav />
			<Grid
				container
				direction='row'
				justify='center'
				alignItems='center'
				className={`${classes.centerContainer}`}
				xs={12}
				sm={8}
				xl={6}
			>
				<Grid justify='center' className={classes.centerPosition}>
					<ErrorOutline />
					<Typography>404 Error</Typography>
					<Typography>The Page you are looking for cannot be found</Typography>
				</Grid>
			</Grid>
			<Gradient />
		</div>
	);
};

export default ErrorPage;
