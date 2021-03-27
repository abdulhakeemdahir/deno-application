import React, { useState, useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Nav from "../../components/Navigation/index";
// import defaultPic from "../../images/dp.png";
import Dolphin from "../../images/dolphin.jpeg";
import NGO from "../../images/ngo.png";

import Gradient from "../../components/Gradient";
import About from "../../components/About";
import Footer from "../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../utils";
// import Splash from "../../components/Splash2";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import {
	GET_USER_INFO,
	USER_LOADING,
	//What about USER_LOADED?
} from "../../utils/actions/actions";
import API from "../../utils/api";
import SingleNews from "../../components/SingleNews";

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

// const useStyles = makeStyles(theme => ({}));

const SinglePost = () => {
	const [userState, userDispatch] = useUserContext();

	//Read
	const getUserInfo = async id => {
		userDispatch({ type: USER_LOADING });
		const userInfo = await API.getUser(id);
		userDispatch({
			type: GET_USER_INFO,
			payload: {
				...userInfo,
				loading: false,
			},
		});
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	const [aboutState] = useState([
		{
			title: "Elephant Helpers",
			name: "Abdul",
			url: "#",
			thumbnail: NGO,
			bio:
				"We need to save the Elephant! They are the humans of the Savanah! Plus, they were in the Lion King!",
			followers: "5000",
			website: "google.com",
			address: "123 45th St, Seattle, WA 98188",
			phone: "206--677-9090",
			email: "elephant@gmail.com",
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
									<Typography variant='subtitle2'>ABOUT</Typography>
									{aboutState.map(card => (
										<About
											title={card.title}
											name={card.name}
											link={card.url}
											image={card.thumbnail}
											bio={card.bio}
											followers={card.followers}
											website={card.website}
											address={card.address}
											phone={card.phone}
											email={card.email}
										/>
									))}
								</Grid>
								<Grid item xs={12} sm={6} className='card-container'>
									<Typography variant='subtitle2'>NEWS FEED</Typography>
									{newsState.map(card => (
										<SingleNews
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
								<Tab label='About' {...a11yProps(1)} />
							</Tabs>
							<TabPanel value={value} index={0}>
								<Grid item xs={12}>
									{newsState.map(card => (
										<SingleNews
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
									{aboutState.map(card => (
										<About
											title={card.title}
											name={card.name}
											link={card.url}
											image={card.thumbnail}
											bio={card.bio}
											followers={card.followers}
											website={card.website}
											address={card.address}
											phone={card.phone}
											email={card.email}
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

export default SinglePost;
