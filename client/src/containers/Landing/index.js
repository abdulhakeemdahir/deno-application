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
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Splash from "../../components/Splash";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import {
  ADD_USER,
  GET_USER_INFO,
  REMOVE_USER,
  UPDATE_USER,
  USER_LOADED,
  USER_LOADING,
  //What about USER_LOADED?
} from "../../utils/actions/actions";

import API from "../../utils/api";



export const User = () => {
  //Is below necessary
  const [state, dispatch] = useUserContext;

  //Read
  const getUserInfo = async (id) => {
    dispatch({ type: USER_LOADING });
    const userInfo = await API.getUser(id)
    dispatch({
      type: GET_USER_INFO,
      payload: {
        ...userInfo
      }
    })
  };

  //Update
  const updateUser = async(id, data) => {
    dispatch({ type: USER_LOADING });
    await API.getUser(id, data)
    dispatch({
      type: UPDATE_USER,
      payload: {
        ...data
      }
    })
  };

  //Delete
  const removeUser = async (id) => {
    dispatch({ type: USER_LOADING });
    await API.deleteUser(id);
    dispatch({
      type: REMOVE_USER,
      payload: {
        users: state.users.filter((user) => {
          return user._id !== id;
        }),
        loading: false,
      },
    });
  };
};
export default User();
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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
    <div className="landing">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
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
            aria-label="simple tabs example"
            className={classes.tabStyle}
          >
            <Tab label="Log In" {...a11yProps(0)} className={classes.tabpanel} />
            <Tab label="Sign Up User" {...a11yProps(1)} className={classes.tabpanel} />
            <Tab label="Sign Up Org" {...a11yProps(2)} className={classes.tabpanel} />
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
}

