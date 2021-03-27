// import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { makeStyles } from "@material-ui/core";
import "./style.css";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(0),
			width: "100%",
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
		marginTop: "10px",
		borderRadius: "0px",
	},
	inputMargin: {
		margin: "5px",
	},
	textStyle: {
		textAlign: "center",
	},
}));

export default function Donate() {
	const classes = useStyles();

	return (
		<Grid className='cardPost'>
			<form className={classes.root} noValidate autoComplete='off'>
				<div>
					<Grid container>
						<Typography variant='h6' className={classes.textStyle}>
							Please Support this Cause!
						</Typography>
						<TextField
							id='donate'
							label='Donation Amount'
							variant='filled'
							fullWidth
							size='small'
						/>
					</Grid>
				</div>
				<Button size='small' className={classes.styleMain}>
					<ChatBubbleOutlineIcon /> Donate
				</Button>
			</form>
		</Grid>
	);
}
