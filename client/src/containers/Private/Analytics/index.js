import React, { useState } from "react";
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

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const Analytics = () => {
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
									<Typography variant='subtitle2'>ENGAGEMENT</Typography>
									<ChartFollowers />
									<ChartSupporters />
									<ChartFollowAndSupport />
								</Grid>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>CAUSES</Typography>
									<ChartCausesCreated />
									<ChartCausesSupported />
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
								<Grid item xs={12}>
									<ChartFollowers />
									<ChartSupporters />
									<ChartFollowAndSupport />
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
