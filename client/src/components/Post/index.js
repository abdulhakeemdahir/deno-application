import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./style.css";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(0),
			width: "100%",
		},
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
		marginTop: "10px",
		borderRadius: "0px",
	},
}));

export default function Post() {
	const classes = useStyles();

	return (
		<Grid>
			<form className={classes.root} noValidate autoComplete='off'>
				<TextField
					id='post'
					label='Post a Comment'
					variant='outlined'
					multiline
					rowsMax={4}
					borderRadius='50px'
				/>
				<Button size='large' className={classes.styleMain}>
					Post
				</Button>
			</form>
		</Grid>
	);
}
