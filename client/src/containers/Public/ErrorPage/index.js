// Import all relevant packages and components
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Gradient from "../../../components/Gradient";
import React from "react";
import { ErrorOutline } from "@material-ui/icons";
import Nav from "../../../components/Navigation";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles({
	centerPosition: {
		textAlign: "center",
	},
	centerContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
});
// Create the component function and export for use
const ErrorPage = () => {
	// Call the styles function
	const classes = useStyles();
	// Create the JSX for the component
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
					<ErrorOutline size='large' />
					<Typography variant='h4'>404 Error</Typography>
					<Typography>The Page you are looking for cannot be found</Typography>
				</Grid>
			</Grid>
			<Gradient />
		</div>
	);
};

export default ErrorPage;
