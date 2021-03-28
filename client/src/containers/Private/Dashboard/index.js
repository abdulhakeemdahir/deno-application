import React, { useState, useEffect } from "react";
import { Typography, Grid, CssBaseline, Breadcrumbs } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//import Box from "@material-ui/core/Box";

import Nav from "../../../components/Navigation";
import News from "../../../components/Private/News";

//import NGO from "../../../images/ngo.png";

import Gradient from "../../../components/Gradient";
import Causes from "../../../components/Private/Causes";
import About from "../../../components/About";
import Footer from "../../../components/Footer";

//Cloudinary
import { Image } from "cloudinary-react";

import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
// import Splash from "../../components/Splash2";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";

import {
	UPDATE_USER,
	USER_LOADING,
	//What about USER_LOADED?
} from "../../../utils/actions/actions";

import api from "../../../utils/api";
import AddContent from "../../../components/Forms/AddContent";
import { NavLink } from "react-router-dom";

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const Dashboard = () => {
	const [userState, userDispatch] = useUserContext();

	useEffect(() => {
		async function fetchUserInfo() {
			console.log(userState);
			try {
				const userInfo = await api.getUser(userState._id);

				console.log(userInfo.data);

				await userDispatch({ type: USER_LOADING });

				await userDispatch({
					type: UPDATE_USER,
					payload: {
						...userInfo.data,
						loading: false,
					},
				});
			} catch (err) {
				console.log(err);
			}
		}

		fetchUserInfo();
	}, []);

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
							<Breadcrumbs style={{ position: "absolute" }}>
								<NavLink to='newsfeed'>Home</NavLink>
								<Typography color='textSecondary'>Dashboard</Typography>
							</Breadcrumbs>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>ABOUT</Typography>
									<About
										key={userState._id}
										id={userState._id}
										bio={userState.bio}
										firstName={userState.firstName}
										lastname={userState.lastname}
										username={userState.username}
										email={userState.email}
										role={userState.role}
										verified={userState.verified}
										following={userState.following.length}
										followers={userState.followers.length}
										posts={userState.posts}
										causes={userState.causes}
										profileImg={userState.profileImg}
										bannerImg={userState.bannerImg}
									/>
								</Grid>
								<Grid item xs={12} sm={6} className='card-container'>
									<Typography variant='subtitle2'>NEWS FEED</Typography>
									{userState.posts.length === 0 ? (
										<AddContent text='Please make a Post in the Newsfeed ' />
									) : (
										userState.posts.map(card => (
											<News
												key={card._id}
												id={card._id}
												title={card.title}
												author={card.author.firstName}
												link={card.url}
												image={card.imageUrl}
												post={card.content}
												hashTag={card.hashtag}
												comments={card.comments}
											/>
										))
									)}
								</Grid>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>CAUSES</Typography>
									{userState.posts.length === 0 ? (
										<AddContent text='Please make/follow a Cause ' />
									) : (
										userState.causes.map(card => (
											<Causes
												key={card._id}
												id={card._id}
												title={card.title}
												author={card.author.firstName}
												link={card.url}
												image={card.imageUrl}
												post={card.content}
												hashTag={card.hashtag}
											/>
										))
									)}
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
									{userState.posts.length === 0 ? (
										<AddContent text='Please make a Post in the Newsfeed ' />
									) : (
										userState.posts.map(card => (
											<News
												key={card._id}
												id={card._id}
												title={card.title}
												author={card.author.firstName}
												link={card.url}
												image={card.imageUrl}
												post={card.content}
												hashTag={card.hashtag}
												comments={card.comments}
											/>
										))
									)}
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Grid item xs={12}>
									<About
										key={userState._id}
										id={userState._id}
										bio={userState.bio}
										firstName={userState.firstName}
										lastname={userState.lastname}
										username={userState.username}
										email={userState.email}
										role={userState.role}
										verified={userState.verified}
										following={userState.following.length}
										followers={userState.followers.length}
										posts={userState.posts}
										causes={userState.causes}
										profileImg={userState.profileImg}
										bannerImg={userState.bannerImg}
									/>
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<Grid item xs={12}>
									{userState.posts.length === 0 ? (
										<AddContent text='Please make/follow a Cause ' />
									) : (
										userState.causes.map(card => (
											<Causes
												key={card._id}
												id={card._id}
												title={card.title}
												author={card.author.firstName}
												link={card.url}
												image={card.imageUrl}
												post={card.content}
												hashTag={card.hashtag}
											/>
										))
									)}
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
