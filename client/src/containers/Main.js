import React, { useState } from "react";
import {
	Container,
	Typography,
	Grid,
	Paper,
	Card,
	CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Nav from "../components/navigation/Nav";
import Trending from "../components/Trending";
import News from "../components/News";
import defaultPic from "../images/dp.png";

const useStyles = makeStyles({
	paper: {
		// background:
		// 	"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		// borderRadius: "10px",
		// boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
		padding: "20px",
	},
	margin: {
		marginTop: "15px",
		marginBottom: "15px",
	},
});
export default function Main() {
	const classes = useStyles();
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
	return (
		<CssBaseline>
			<div className='Main'>
				<Nav />
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
					className={`${classes.paper}`}
					xs={12}
					spacing={2}
				>
					<Grid item xs={12} sm={3} className={classes.margin}>
						<Typography>Trending</Typography>
						{trendingState.map(card => (
							<Trending hashTag={card.hashTag} link={card.url} />
						))}
					</Grid>
					<Grid item xs={12} sm={6} className={classes.margin}>
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
					<Grid item xs={12} sm={3} className={classes.margin}>
						<Paper>
							<Card>
								<Typography>Causes</Typography>
							</Card>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</CssBaseline>
	);
}
