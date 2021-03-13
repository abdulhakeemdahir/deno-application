import React, { useState } from "react";
import { Container, Typography, Grid, Paper, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Nav from "../components/navigation/Nav";
import Trending from "../components/Trending";

const useStyles = makeStyles({
	paper: {
		background:
			"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		borderRadius: "10px",
		boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
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
	return (
		<div className='Main'>
			<Container>
				<Nav />
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
					// className={`${classes.centerContainer}`}
					spacing={2}
				>
					<Grid item xs={12} sm={3} className={classes.margin}>
						<Paper>
							<Card>
								<Typography>Trending</Typography>
								{trendingState.map(card => (
									<Trending name={card.hashTag} link={card.url} />
								))}
							</Card>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} className={classes.margin}>
						<Paper>
							<Card>
								<Typography>News Feed</Typography>
							</Card>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={3} className={classes.margin}>
						<Paper>
							<Card>
								<Typography>Causes</Typography>
							</Card>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
