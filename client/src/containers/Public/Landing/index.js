// Import all relevant packages and components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import Welcome from "../../../components/Welcome";
import SignUpUser from "../../../components/Forms/SignUpUser";
import SignUpOrg from "../../../components/Forms/SignUpOrg";
import Signin from "../../../components/Forms/Signin";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Splash from "../../../components/Splash";
import { TabPanel, a11yProps } from "../../utils";
// Create TabPanel
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
// Create a useStyles Material UI component for styling
const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	tabpanel: {
		marginLeft: "auto",
		marginRight: "auto",
	},
	centerPosition: {
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
// Create the component function and export for use
const Landing = () => {
	// Call the styles function
	const classes = useStyles();
	// Create the set and setState from useState
	const [value, setValue] = React.useState(0);
	// Create the handleChange function
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// Create the JSX for the component
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
							label='Signup User'
							{...a11yProps(1)}
							className={classes.tabpanel}
						/>
						<Tab
							label='Signup Org'
							{...a11yProps(2)}
							className={classes.tabpanel}
						/>
					</Tabs>
					<div className={classes.marginStyle}>
						<TabPanel value={value} index={0}>
							<Signin />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<SignUpUser />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<SignUpOrg />
						</TabPanel>
					</div>
				</Grid>
				<Footer />
			</Grid>
			<Splash />
			<Gradient />
		</div>
	);
};

export default Landing;
