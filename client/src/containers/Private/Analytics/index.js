import React, { useState, useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Nav from "../../../components/Navigation";
import NGO from "../../../images/ngo.png";

import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import ChartFollowers from "../../../components/Graphs/ChartFollowers";
import ChartSupporters from "../../../components/Graphs/ChartSupporters";
import ChartFollowAndSupport from "../../../components/Graphs/ChartFollowAndSupport";
import ChartCausesCreated from "../../../components/Graphs/ChartCausesCreated";
import ChartCausesSupported from "../../../components/Graphs/ChartCausesSupported";
import About from "../../../components/About";

import { Image } from "cloudinary-react";

import { useUserContext } from "../../../utils/GlobalStates/UserContext";

import {
	UPDATE_USER,
	USER_LOADING,
	//What about USER_LOADED?
} from "../../../utils/actions/actions";

import api from "../../../utils/api";
import AddContent from "../../../components/Forms/AddContent";

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const Analytics = () => {
	const [userState, userDispatch] = useUserContext();

	useEffect(() => {
		async function fetchUserInfo() {
			console.log(userState.posts.length === 0);
			try {
				const userInfo = await api.getUser(userState._id);

				// console.log(userInfo.data);

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
					className={"containerAnalytics"}
					xs={12}
					lg={10}
					xl={8}
				>
					{width > 600 ? (
						<>
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
									<Typography variant='subtitle2'>ENGAGEMENT</Typography>
									<ChartFollowers height={400} width={500} />
									<ChartSupporters height={400} width={500} />
									<ChartFollowAndSupport height={400} width={500} />
								</Grid>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>CAUSES</Typography>
									<ChartCausesCreated height={400} width={250} />
									<ChartCausesSupported height={400} width={250} />
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
								<Tab label='Engagement' {...a11yProps(0)} />
								<Tab label='About' {...a11yProps(1)} />
								<Tab label='Causes' {...a11yProps(2)} />
							</Tabs>
							<TabPanel value={value} index={0}>
								<Grid container xs={12}>
									<ChartFollowers height={300} width={300} />
									<ChartSupporters height={300} width={300} />
									<ChartFollowAndSupport height={300} width={300} />
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Grid container xs={12}>
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
								<Grid container xs={12}>
									<ChartCausesCreated />
									<ChartCausesSupported />
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

export default Analytics;
