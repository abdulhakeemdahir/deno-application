import {
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography
} from "@material-ui/core";
import useNavDrawerStyles from "./useNavDrawerStyles";
import {
  AccountCircle,
  Chat,
  Dashboard,
  Equalizer,
  Explore,
  HomeSharp,
  Menu
} from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

import {
  useAuthTokenStore,
  useIsAuthenticated,
  useLogout
} from "../../../utils/auth";

import "../style.css";

const SideDrawer = ({ navLinks }) => {
  const classes = useNavDrawerStyles();
  const [state, setState] = useState({ right: false });

  const logout = useLogout();

  const history = useHistory();

  const login = () => {
    history.push("/");
  };

  useAuthTokenStore();

  const isAuth = useIsAuthenticated();

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const sideDrawerList = anchor => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        component="nav"
        aria-labelledby="main navigation"
        className={classes.navDisplayFlex}
      >
        {isAuth ? (
          <>
            <NavLink
              to="/newsfeed"
              key="newsfeed"
              className={classes.linkText}
              activeClassName={classes.activeLink}
            >
              <ListItem>
                <HomeSharp />
                <Typography>newsfeed</Typography>
              </ListItem>
            </NavLink>
            <NavLink
              to={`/dashboard`}
              key="dashboard"
              className={classes.linkText}
              activeClassName={classes.activeLink}
            >
              <ListItem>
                <Dashboard />
                <Typography>dashboard</Typography>
              </ListItem>
            </NavLink>
            <NavLink
              to="/chatroom"
              key="chatroom"
              className={classes.linkText}
              activeClassName={classes.activeLink}
            >
              <ListItem>
                <Chat />
                <Typography>chat</Typography>
              </ListItem>
            </NavLink>
            <NavLink
              to="/analytics"
              key="analytics"
              className={classes.linkText}
              activeClassName={classes.activeLink}
            >
              <ListItem>
                <Equalizer />
                <Typography>analytics</Typography>
              </ListItem>
            </NavLink>
            <NavLink
              onClick={logout}
              to="/"
              key="/"
              activeClassName={classes.activeLink}
            >
              <ListItem className={classes.logoutStyle}>
                <AccountCircle />
                <Typography>LOGOUT</Typography>
              </ListItem>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              key="explore"
              to="/explore"
              className={classes.linkText}
              activeClassName={classes.activeLink}
            >
              <ListItem button>
                <Explore />
                <Typography>EXPLORE</Typography>
              </ListItem>
            </NavLink>
            <ListItem onClick={login} button className={classes.loginStyle}>
              <AccountCircle />
              <Typography>LOGIN</Typography>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer("right", true)}
      >
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={state.right}
        onOpen={toggleDrawer("right", true)}
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("right")}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
