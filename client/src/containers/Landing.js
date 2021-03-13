import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Gradient from "../components/Gradient";
import Footer from "../components/Footer";
import Welcome from "../components/Welcome";
import Signup from "../components/forms/Signup";
import Signin from "../components/forms/Signin";
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		// backgroundColor: theme.palette.background.paper,
	},
	centerPosition: {
		padding: "20px",
		textAlign: "center",
	},
	centerContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
});
export default function Landing() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div>
			<Grid
				container
				direction='row'
				justify='center'
				alignItems='center'
				className={`${classes.centerContainer}`}
				xs={12}
				sm={8}
				xl={6}
			>
				<Grid item sm={6} xs={12}>
					<Welcome />
				</Grid>
				<Grid item sm={6} xs={12} className={classes.centerPosition}>
					<div className={classes.root}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='simple tabs example'
						>
							<Tab label='Log In' {...a11yProps(0)} />
							<Tab label='Sign Up' {...a11yProps(1)} />
						</Tabs>
						<TabPanel value={value} index={0}>
							<Signin />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Signup />
						</TabPanel>
					</div>
				</Grid>
			</Grid>
			<Footer />
			<Gradient />
		</div>
	);
}
