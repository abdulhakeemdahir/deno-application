// import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import { useState } from "react";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import API from "../../utils/api.js";
import {
	ADD_CAUSE,
	ADD_POST,
	CAUSE_LOADING,
	POST_LOADING,
} from "../../utils/actions/actions";
import { usePostContext } from "../../utils/GlobalStates/PostContext";
import { useCauseContext } from "../../utils/GlobalStates/CauseContext";
import findHashtags from "find-hashtags";

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
	const [, causeDispatch] = useCauseContext();
	const [, postDispatch] = usePostContext();
	const classes = useStyles();

	//*Create Post
	const addPost = async postInfo => {
		postDispatch({ type: POST_LOADING });
		postDispatch({
			type: ADD_POST,
			payload: {
				...postInfo,
				loading: false,
			},
		});
	};

	//Create cause
	const addCause = async causeInfo => {
		causeDispatch({ type: CAUSE_LOADING });
		causeDispatch({
			type: ADD_CAUSE,
			payload: {
				...causeInfo,
				loading: false,
			},
		});
	};

	const [createPost, setCreatePost] = useState({
		type: "",
		title: "",
		content: "",
		imageUrl: "",
	});

	const handleChange = function(event) {
		const { name, value } = event.target;
		setCreatePost({
			...createPost,
			[name]: value,
		});
	};

	const [userState] = useUserContext();

	const handleSubmit = async event => {
		event.preventDefault();
		if (
			createPost.type === "" ||
			createPost.title === "" ||
			createPost.content === "" ||
			createPost.imageUrl === ""
		) {
			return;
		}
		try {
			const post = {
				...createPost,
				author: userState._id,
			};

			const hashtags = await findHashtags(createPost.content);

			if (hashtags.length) {
				const createHashtags = await API.createHashtag({ hashtag: hashtags });
				post.hashtags = createHashtags.data._id;
			}

			if (createPost.type === "Post") {
				const { data } = await API.createPost(post);
				if (post.hashtags) {
					await API.updateHashtag(post.hashtags, {
						posts: data._id,
					});
				}

				await API.updateUser(post.author, {
					posts: data._id,
				});

				addPost(data);
				return;
			} else {
				const { data } = await API.createCause(post);

				if (post.hashtags) {
					await API.updateHashtag(post.hashtags, {
						causes: data._id,
					});
				}

				await API.updateUser(post.author, {
					causes: data._id,
				});

				addCause(data);
			}

			clearState();
		} catch (err) {
			console.log("here", err);
		}
	};
	const clearState = () => {
		setCreatePost({
			type: "",
			title: "",
			content: "",
			imageUrl: "",
		});
		return;
	};

	return (
		<Grid className='cardPost'>
			<form
				className={classes.root}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<FormControl variant='outlined'>
					<InputLabel id='post'>Post Type</InputLabel>
					<Select
						labelId='post'
						id='post'
						label='post type'
						name='type'
						onChange={handleChange}
					>
						<MenuItem value={"Post"}>Post</MenuItem>
						<MenuItem value={"Cause"}>Cause</MenuItem>
					</Select>
				</FormControl>
				<div>
					<Grid container>
						<TextField
							name='title'
							value={createPost.title}
							onChange={handleChange}
							id='title'
							label='Title'
							multiline
							rowsMax={4}
							className={classes.inputMargin}
							size='small'
						/>
						<TextField
							name='imageUrl'
							value={createPost.imageUrl}
							onChange={handleChange}
							id='imageUrl'
							label='Image Url'
							multiline
							rowsMax={4}
							className={classes.inputMargin}
							size='small'
						/>
						<TextField
							name='content'
							value={createPost.content}
							onChange={handleChange}
							id='post'
							label='Post a Message'
							variant='filled'
							multiline
							rows={4}
							fullWidth
							size='small'
						/>
					</Grid>
				</div>
				<Button
					size='small'
					className={classes.styleMain}
					onClick={handleSubmit}
				>
					<ChatBubbleOutlineIcon /> Post
				</Button>
			</form>
		</Grid>
	);
}
