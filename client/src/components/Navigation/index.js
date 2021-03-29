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

const Nav = () => {
  const navLinks = [
    { title: `landing`, path: `/` },
    { title: `explore`, path: `/explore` },
    { title: `newsfeed`, path: `/newsfeed` },
    { title: `dashboard`, path: `/dashboard` }
  ];

  const [search, searchState] = useState("");

  const classes = useNavStyles();

  const logout = useLogout();

  const history = useHistory();

  const login = () => {
    history.push("/");
  };

  const searchBarRef = useRef();

  const handleInputChange = event => searchBarRef.current.value;

  useAuthTokenStore();

  const isAuth = useIsAuthenticated();

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
