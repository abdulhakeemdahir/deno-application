import React, { useState } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../../components/Navigation";
import News from "../../../components/Private/NewsAndComment";
import Post from "../../../components/Post";
import Elephant from "../../../images/elephant.jpeg";
import Dolphin from "../../../images/dolphin.jpeg";
import Whale from "../../../images/whale.jpeg";
import Gradient from "../../../components/Gradient";
import Trending from "../../../components/Trending";
import Causes from "../../../components/Causes";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
// import Splash from "../../../components/Splash";
import { useCauseContext } from "../../../utils/GlobalStates/CauseContext";
import { usePostContext } from "../../../utils/GlobalStates/PostContext";
import {
	GET_CAUSE_INFO,
	GET_POST_INFO,
	UPDATE_CAUSE,
	UPDATE_POST,
	CAUSE_LOADING,
	REMOVE_CAUSE,
	ADD_CAUSE,
	ADD_POST,
	POST_LOADING,
	REMOVE_POST,
} from "../../../utils/actions/actions";
import API from "../../../utils/api";

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
// const useStyles = makeStyles(theme => ({}));
const Newsfeed = () => {
	const [causeState, causeDispatch] = useCauseContext();
	const [postState, postDispatch] = usePostContext();

	//*CAUSES*

	//Create cause
	const addCause = async data => {
		causeDispatch({ type: CAUSE_LOADING });
		const causeInfo = await API.createCause(data);
		causeDispatch({
			type: ADD_CAUSE,
			payload: {
				...causeInfo,
				loading: false,
			},
		});
	};

	//Read cause
	const getCauseInfo = async data => {
		causeDispatch({ type: CAUSE_LOADING });
		const causeInfo = await API.getUsersCauses(data);
		causeDispatch({
			type: GET_CAUSE_INFO,
			payload: {
				...causeInfo,
				loading: false,
			},
		});
	};

	//Update cause
	const updateCauseInfo = async id => {
		causeDispatch({ type: CAUSE_LOADING });
		const data = await API.updateCause(id);
		causeDispatch({
			type: UPDATE_CAUSE,
			payload: {
				...data,
				loading: false,
			},
		});
	};

	//Delete cause
	const removeCause = async id => {
		causeDispatch({ type: CAUSE_LOADING });
		await API.deleteCause(id);
		causeDispatch({
			type: REMOVE_CAUSE,
			payload: {
				causes: causeState.causes.filter(cause => {
					return cause._id !== id;
				}),
				loading: false,
			},
		});
	};

	//*POSTS*

	//Create post
	const addPost = async data => {
		postDispatch({ type: POST_LOADING });
		const postInfo = await API.createPost(data);
		postDispatch({
			type: ADD_POST,
			payload: {
				...postInfo,
				loading: false,
			},
		});
	};

	//Read post
	const getPostInfo = async data => {
		postDispatch({ type: POST_LOADING });
		const postInfo = await API.getPost(data);
		postDispatch({
			type: GET_POST_INFO,
			payload: {
				...postInfo,
				loading: false,
			},
		});
	};

	//Update post
	const updatePostInfo = async id => {
		postDispatch({ type: POST_LOADING });
		const data = await API.updatePost(id);
		postDispatch({
			type: UPDATE_POST,
			payload: {
				...data,
				loading: false,
			},
		});
	};

	//Delete post
	const deletePost = async id => {
		postDispatch({ type: POST_LOADING });
		await API.removePost(id);
		postDispatch({
			type: REMOVE_POST,
			payload: {
				posts: postState.posts.filter(post => {
					return post._id !== id;
				}),
				loading: false,
			},
		});
	};

	const [trendingState] = useState([
		{
			hashTag: "Save the Dolphins",
			url: "#",
		},
		{
			hashTag: "Save the Elephants",
			url: "#",
		},
		{
			hashTag: "Save the Whales",
			url: "#",
		},
	]);
	const [newsState] = useState([
		{
			title: "Dolphins Preservation",
			author: "Abdul",
			url: "#",
			thumbnail: Dolphin,
			post:
				"We need to save the dolphins! They are the humans of the Oceans! Plus, they were on Baywatch!",
			hashTag: "Save the Dolphins",
			comments: [
				{
					author: "Jake",
					post: "This is a test comment",
				},
				{
					author: "Bobby",
					post: "This is a test comment",
				},
				{
					author: "Drake",
					post: "This is a test comment",
				},
			],
		},
		{
			title: "Elephant Preservation",
			author: "Abdul",
			url: "#",
			thumbnail: Elephant,
			post:
				"We need to save the Elephant! They are the humans of the Sahara! Plus, they were in the Lion King!",
			hashTag: "Save the Elephant",
			comments: [
				{
					author: "Chris",
					post: "This is a test comment",
				},
				{
					author: "Sherman",
					post: "This is a test comment",
				},
				{
					author: "Drake",
					post: "This is a test comment",
				},
			],
		},
		{
			title: "Whale Preservation",
			author: "Abdul",
			url: "#",
			thumbnail: Whale,
			post:
				"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
			hashTag: "Save the Whale",
			comments: [
				{
					author: "Ani",
					post:
						"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
				},
				{
					author: "Stewart",
					post:
						"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
				},
				{
					author: "Cassandra",
					post:
						"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
				},
				{
					author: "Cassandra",
					post:
						"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
				},
			],
		},
	]);
	// const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const { width } = useWindowDimensions();
	return (
		<div className='Main'>
			<CssBaseline>
				<Nav />
				<Grid
					container
					direction='row'
					justify='center'
					className={"container"}
					xs={12}
					lg={10}
					xl={8}
				>
					{width > 600 ? (
						<>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>TRENDING</Typography>
									{trendingState.map(card => (
										<Trending hashTag={card.hashTag} link={card.url} />
									))}
								</Grid>
								<Grid item xs={12} sm={6} className='card-container'>
									<Typography variant='subtitle2'>NEWS FEED</Typography>
									<Post className='card' />
									{newsState.map(card => (
										<News
											title={card.title}
											author={card.author}
											link={card.url}
											image={card.thumbnail}
											post={card.post}
											hashTag={card.hashTag}
											comments={card.comments}
										/>
									))}
								</Grid>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>CAUSES</Typography>
									{newsState.map(card => (
										<Causes
											title={card.title}
											author={card.author}
											link={card.url}
											image={card.thumbnail}
											post={card.post}
											hashTag={card.hashTag}
										/>
									))}
								</Grid>
							</Grid>
						</>
					) : (
						<>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label='simple tabs example'
							>
								<Tab label='News' {...a11yProps(0)} />
								<Tab label='Trending' {...a11yProps(1)} />
								<Tab label='Causes' {...a11yProps(2)} />
							</Tabs>
							<TabPanel value={value} index={0}>
								<Grid item xs={12}>
									<Post className='card' />
									{newsState.map(card => (
										<News
											title={card.title}
											author={card.author}
											link={card.url}
											image={card.thumbnail}
											post={card.post}
											hashTag={card.hashTag}
											comments={card.comments}
										/>
									))}
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Grid item xs={12}>
									{trendingState.map(card => (
										<Trending hashTag={card.hashTag} link={card.url} />
									))}
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<Grid item xs={12}>
									{newsState.map(card => (
										<Causes
											title={card.title}
											author={card.author}
											link={card.url}
											image={card.thumbnail}
											post={card.post}
											hashTag={card.hashTag}
										/>
									))}
								</Grid>
							</TabPanel>
						</>
					)}
				</Grid>
				<Gradient />
				{/* <Splash /> */}
				<Footer />
			</CssBaseline>
		</div>
	);
};
export default Newsfeed;
