// Import all relevant packages and components
import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  InputBase,
  CssBaseline
} from "@material-ui/core";
import useNavStyles from "./useNavStyles";
import SearchIcon from "@material-ui/icons/Search";
import NavDrawer from "./NavDrawer";
import Logo from "../../images/logo@2x.png";
import {
  useAuthTokenStore,
  useIsAuthenticated,
  useLogout
} from "../../utils/auth";
import { useHistory } from "react-router-dom";

// Create the component function and export for use
const Nav = () => {
  const navLinks = [
    { title: `landing`, path: `/` },
    { title: `explore`, path: `/explore` },
    { title: `newsfeed`, path: `/newsfeed` },
    { title: `dashboard`, path: `/dashboard` }
  ];
  // Create the set and setState from useState
  const [search, searchState] = useState("");
  // Call the styles function
  const classes = useNavStyles();
  // Call the logout function
  const logout = useLogout();
  // Call the useHistory function
  const history = useHistory();
  // Call the login function
  const login = () => {
    history.push("/");
  };

  const searchBarRef = useRef();
  const handleInputChange = event => searchBarRef.current.value;
  // Call the useAuth function
  useAuthTokenStore();
  const isAuth = useIsAuthenticated();
  // Create the JSX for the component
  return (
    <CssBaseline>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="AccountCircle"
              to="/"
            >
              <img
                src={Logo}
                alt="logo"
                style={{ height: "40px", width: "auto" }}
              />{" "}
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                ref={searchBarRef}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div className={classes.grow} />

            {/* <Hidden mdUp> */}
            <NavDrawer navLinks={navLinks} />
            {/* </Hidden> */}
          </Container>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
};

export default Nav;
