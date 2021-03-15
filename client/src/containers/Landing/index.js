import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Gradient from "../../components/Gradient";
import Footer from "../../components/Footer";
import Welcome from "../../components/Welcome";
import Signup from "../../components/Forms/Signup";
import Signin from "../../components/Forms/Signin";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Splash from "../../components/Splash";

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
	tabpanel: {
		marginLeft: "auto",
		marginRight: "auto",
	},
	centerPosition: {
		// padding: "20px",
		textAlign: "center",
	},
	centerContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},

	landing: {
		padding: "10px",
	},
	tabStyle: {
		color: `3f4d67`,
		margin: "10px",
	},
	marginStyle: {
		margin: "10px",
	},
});
export default function Landing() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div className='landing'>
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
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='simple tabs example'
						className={classes.tabStyle}
					>
						<Tab
							label='Log In'
							{...a11yProps(0)}
							className={classes.tabpanel}
						/>
						<Tab
							label='Sign Up'
							{...a11yProps(1)}
							className={classes.tabpanel}
						/>
					</Tabs>
					<div className={classes.marginStyle}>
						<TabPanel value={value} index={0}>
							<Signin />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Signup />
						</TabPanel>
					</div>
				</Grid>
				<Footer />
			</Grid>
			{/* <Splash /> */}
			<Gradient />
		</div>
	);
}
