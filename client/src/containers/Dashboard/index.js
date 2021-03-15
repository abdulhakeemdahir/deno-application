import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Card, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./style.css";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Nav from "../../components/Navigation/Nav";
import News from "../../components/News";
import defaultPic from "../../images/dp.png";
import Gradient from "../../components/Gradient";
import Trending from "../../components/Trending";
import Post from "../../components/Post";
import Causes from "../../components/Causes";
import About from "../../components/About";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function getWindowDimensions() {
	const { innerWidth: width } = window;
	return {
		width,
	};
}

function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

// const useStyles = makeStyles(theme => ({}));

export default function Main() {
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
	const [aboutState] = useState([
		{
			title: "Elephant Helpers",
			name: "Abdul",
			url: "#",
			thumbnail: defaultPic,
			bio:
				"We need to save the dolphins! They are the humans of the Oceans! Plus, they were on Baywatch!",
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
			thumbnail: defaultPic,
			post:
				"We need to save the dolphins! They are the humans of the Oceans! Plus, they were on Baywatch!",
			hashTag: "Save the Dolphins",
		},
		{
			title: "Elephant Preservation",
			author: "Abdul",
			url: "#",
			thumbnail: defaultPic,
			post:
				"We need to save the Elephant! They are the humans of the Sahara! Plus, they were in the Lion King!",
			hashTag: "Save the Elephant",
		},
		{
			title: "Whale Preservation",
			author: "Abdul",
			url: "#",
			thumbnail: defaultPic,
			post:
				"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
			hashTag: "Save the Whale",
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
					lg={8}
				>
					{width > 600 ? (
						<>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>TRENDING</Typography>
									{aboutState.map(card => (
										<About
											title={card.title}
											name={card.name}
											link={card.url}
											image={card.thumbnail}
											post={card.post}
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
									<Post />
									{newsState.map(card => (
										<News
											title={card.title}
											author={card.author}
											link={card.url}
											image={card.thumbnail}
											post={card.post}
											hashTag={card.hashTag}
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
									<Post />
									{newsState.map(card => (
										<News
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
			</CssBaseline>
		</div>
	);
}
