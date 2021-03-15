import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
}));

export default function Post() {
	const classes = useStyles();

	return (
		<Grid>
			<form className={classes.root} noValidate autoComplete='off'>
				<FormControl variant='outlined'>
					<InputLabel id='post'>Post Type</InputLabel>
					<Select labelId='post' id='post' label='post type '>
						<MenuItem value={"comment"}>Comment</MenuItem>
						<MenuItem value={"cause"}>Cause</MenuItem>
					</Select>
				</FormControl>
				<div>
					<Grid container>
						<TextField
							id='title'
							label='Title'
							multiline
							rowsMax={4}
							className={classes.inputMargin}
						/>
						<TextField
							id='hashTag'
							label='Hash Tag'
							multiline
							rowsMax={4}
							className={classes.inputMargin}
						/>
						<TextField
							id='imageUrl'
							label='Image Url'
							multiline
							rowsMax={4}
							className={classes.inputMargin}
						/>
						<TextField
							id='post'
							label='Post a Comment'
							variant='outlined'
							multiline
							rows={4}
							fullWidth
						/>
					</Grid>
				</div>

				<Button size='large' className={classes.styleMain}>
					<ChatBubbleOutlineIcon /> Post
				</Button>
			</form>
		</Grid>
	);
}
