// Import all relevant packages and components
import React, { useState, useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../components/Navigation/index";
import Dolphin from "../../images/dolphin.jpeg";
import NGO from "../../images/ngo.png";
import Gradient from "../../components/Gradient";
import About from "../../components/About";
import Footer from "../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../utils";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import {
	ADD_GUESS_USER,
	GET_USER_INFO,
	USER_GUESS_LOADING,
	USER_LOADING,
} from "../../utils/actions/actions";
import API from "../../utils/api";
import SingleNews from "../../components/SingleNews";
import { useHistory, useParams } from "react-router";
import { useGuessContext } from "../../utils/GlobalStates/GuessContext";
// Create TabPanel
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
// Create the component function and export for use
const SinglePost = () => {
	// Destructure guessState and guessDispatch from Context
	const [guessState, guessDispatch] = useGuessContext();
	// Create the set and setState from useState
	const [singleState, SingleStateDispatch] = useState({});
	// Get ID from useParams
	const { id } = useParams();
	// Call useHistory function
	const history = useHistory();
	// Get all user Data
	useEffect(() => {
		async function fetchUserInfo() {
			const singlePost = await API.findUserPosts(id);
			if (!userInfo) {
				history.push("/404");
			}
			const userInfo = await API.getUser(userInfo.author._id);
			await guessDispatch({
				type: USER_GUESS_LOADING,
			});
			await guessDispatch({
				type: ADD_GUESS_USER,
				payload: {
					...userInfo.data,
					loading: false,
				},
			});
		}
		fetchUserInfo();
	}, []);
	// Create the set and setState from useState
	const [value, setValue] = React.useState(0);
	// Create the handleChange function
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// Call the Window Width Function
	const { width } = useWindowDimensions();
	// Create the JSX for the component
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
									{/* {aboutState.map(card => (
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
									))} */}
								</Grid>
								<Grid item xs={12} sm={6} className='card-container'>
									<Typography variant='subtitle2'>NEWS FEED</Typography>
									{/* {newsState.map(card => (
										<SingleNews
											title={card.title}
											author={card.author}
											link={card.url}
											image={card.thumbnail}
											post={card.post}
											hashTag={card.hashTag}
											comments={card.comments}
										/>
									))} */}
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
									{/* {newsState.map(card => (
										<SingleNews
											title={card.title}
											author={card.author}
											link={card.url}
											image={card.thumbnail}
											post={card.post}
											hashTag={card.hashTag}
											comments={card.comments}
										/>
									))} */}
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Grid item xs={12}>
									{/* {aboutState.map(card => (
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
									))} */}
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
