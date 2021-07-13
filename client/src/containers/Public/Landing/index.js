// Import all relevant packages and components
import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import Welcome from "../../../components/Welcome";
import SignUpUser from "../../../components/Forms/SignUpUser";
import SignUpOrg from "../../../components/Forms/SignUpOrg";
import Signin from "../../../components/Forms/Signin";
import Splash from "../../../components/Splash";

import { TabPanel, a11yProps } from "../../utils";

// Create TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// Create a useStyles Material UI component for styling
const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  formGrid: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  landingContainer: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    /*
    I commented out this position as it was max the page not work properly when rendered in mobile if someone
    where to go to mobile from desktop. Figured position is out of date anyways
    */
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  tabStyle: {
    color: `3f4d67`,
    margin: "10px"
  },
  userForms: {
    margin: "10px",
    maxWidth: "500px"
  }
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
    <Grid container className={`${classes.landingContainer}`}>
      <Welcome />
      <Grid item md={6} xs={12} className={classes.formGrid}>
        <div className={classes.userForms}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
            className={classes.tabStyle}>
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
      <Splash />
      <Gradient />
    </Grid>
  );
};

export default Landing;
