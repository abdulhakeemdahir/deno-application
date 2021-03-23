import React, { useState, useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Nav from "../../../components/Navigation";
import News from "../../../components/Private/News";
// import defaultPic from "../../images/dp.png";
import Elephant from "../../../images/elephant.jpeg";
import Dolphin from "../../../images/dolphin.jpeg";
import Whale from "../../../images/whale.jpeg";
import NGO from "../../../images/ngo.png";

import Gradient from "../../../components/Gradient";
import Causes from "../../../components/Private/Causes";
import About from "../../../components/About";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
// import Splash from "../../components/Splash2";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";

import {
	GET_USER_INFO,
	REMOVE_USER,
	UPDATE_USER,
	USER_LOADING,
	//What about USER_LOADED?
} from "../../../utils/actions/actions";

import API from "../../../utils/api";

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

// const useStyles = makeStyles(theme => ({}));

const Dashboard = () => {
	const [userState, userDispatch] = useUserContext();

  useEffect(() => {
    async function fetchUserInfo() {
      await userDispatch({ type: USER_LOADING });
      const userInfo = await API.getUser(userState._id);
      
      await userDispatch({
        type: UPDATE_USER,
        payload: {
          ...userInfo.data,
          loading: false
        }
      })

	  console.log(userInfo);
    }

    fetchUserInfo();
  }, []);




  // //Read
  // const getUserInfo = async (id) => {
  //   userDispatch({ type: USER_LOADING });
  //   const userInfo = await API.getUser(id)
  //   userDispatch({
  //     type: GET_USER_INFO,
  //     payload: {
  //       ...userInfo,
  //       loading: false
        
  //     }
  //   })
  // };

  // //Update
  // const updateUserInfo = async(id) => {
  //   userDispatch({ type: USER_LOADING });
  //   const data = await API.updateUser(id)
  //   userDispatch({
  //     type: UPDATE_USER,
  //     payload: {
  //       ...data,
  //       loading: false
  //     }
  //   })
  // };

  // //Delete user
  // const removeUser = async (id) => {
  //   userDispatch({ type: USER_LOADING });
  //   await API.deleteUser(id);
  //   userDispatch({
  //     type: REMOVE_USER,
  //     payload: {
  //       users: userState.users.filter((user) => {
  //         return user._id !== id;
  //       }),
  //       loading: false,
  //     },
  //   });
  // };

	// useEffect(() => {
	// 	getUserInfo();
	// }, []);

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
								<Tab label='About' {...a11yProps(1)} />
								<Tab label='Causes' {...a11yProps(2)} />
							</Tabs>
							<TabPanel value={value} index={0}>
								<Grid item xs={12}>
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

export default Dashboard;
