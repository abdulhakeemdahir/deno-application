import React, { useState } from "react";
import { Typography, Grid, Paper, Card, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import Nav from "../../components/navigation/Nav";
import Trending from "../../components/Trending";
import News from "../../components/news/News";
import defaultPic from "../../images/dp.png";
import Gradient from "../../components/Gradient";

const useStyles = makeStyles(theme => ({
	item1: {
		order: 2,
		[theme.breakpoints.up("sm")]: {
			order: 1,
		},
	},
	item2: {
		order: 1,
		[theme.breakpoints.up("sm")]: {
			order: 2,
		},
	},
	item3: {
		order: 3,
		[theme.breakpoints.up("sm")]: {
			order: 3,
		},
	},
}));

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

	const classes = useStyles();

	return (
		<CssBaseline>
			<div className='Main'>
				<Nav />
				<Grid
					container
					direction='row'
					justify='center'
					className={"container"}
					xs={12}
				>
					<Grid item xs={12} sm={3} className={classes.item1}>
						<Typography>Trending</Typography>
						{trendingState.map(card => (
							<Trending hashTag={card.hashTag} link={card.url} />
						))}
					</Grid>
					<Grid item xs={12} sm={6} className={classes.item2}>
						<Typography>News Feed</Typography>
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
					<Grid item xs={12} sm={3} className={classes.item3}>
						<Paper>
							<Card>
								<Typography>Causes</Typography>
							</Card>
						</Paper>
					</Grid>
				</Grid>
				<Gradient />
			</div>
		</CssBaseline>
	);
}
