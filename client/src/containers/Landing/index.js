import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Gradient from "../../components/Gradient";
import Footer from "../../components/Footer";
import Welcome from "../../components/Welcome";
import SignUpUser from "../../components/Forms/SignUpUser";
import SignUpOrg from "../../components/Forms/SignUpOrg";
import Signin from "../../components/Forms/Signin";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Splash from "../../components/Splash";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import { TabPanel, a11yProps } from "../utils";
import {
  GET_USER_INFO,
  REMOVE_USER,
  UPDATE_USER,
  USER_LOADING
  //What about USER_LOADED?
} from "../../utils/actions/actions";

import API from "../../utils/api";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1
    // backgroundColor: theme.palette.background.paper,
  },
  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  centerPosition: {
    // padding: "20px",
    textAlign: "center"
  },
  centerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },

  landing: {
    padding: "10px"
  },
  tabStyle: {
    color: `3f4d67`,
    margin: "10px"
  },
  marginStyle: {
    margin: "10px"
  }
});

const Landing = () => {
  const [userState, userDispatch] = useUserContext();

  //Read
  const getUserInfo = async id => {
    userDispatch({ type: USER_LOADING });
    const userInfo = await API.getUser(id);
    userDispatch({
      type: GET_USER_INFO,
      payload: {
        ...userInfo
      }
    });
  };

  //Update
  const updateUser = async (id, data) => {
    userDispatch({ type: USER_LOADING });
    await API.getUser(id, data);
    userDispatch({
      type: UPDATE_USER,
      payload: {
        ...data
      }
    });
  };

  //Delete user
  const removeUser = async id => {
    userDispatch({ type: USER_LOADING });
    await API.deleteUser(id);
    userDispatch({
      type: REMOVE_USER,
      payload: {
        users: userState.users.filter(user => {
          return user._id !== id;
        }),
        loading: false
      }
    });
  };

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
              label='Sign Up User'
              {...a11yProps(1)}
              className={classes.tabpanel}
            />
            <Tab
              label='Sign Up Org'
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
