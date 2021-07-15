// Import all relevant packages and components
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  CssBaseline,
  Input,
  Button,
  NativeSelect
} from "@material-ui/core";
import useNavStyles from "./useNavStyles";
import SearchIcon from "@material-ui/icons/Search";
import NavDrawer from "./NavDrawer";
import Logo from "../../images/logo@2x.png";
import { useAuthTokenStore } from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";
import { Link } from "react-router-dom";

// Create the component function and export for use
const Nav = () => {
  const navLinks = [
    { title: `landing`, path: `/` },
    { title: `explore`, path: `/explore` },
    { title: `newsfeed`, path: `/newsfeed` },
    { title: `dashboard`, path: `/dashboard` }
  ];
  // search and setSearch from useState
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("User");
  // Call the styles function
  const classes = useNavStyles();
  // Call the logout function
  // const logout = useLogout();
  // Call the useHistory function
  const history = useHistory();
  // Call the login function
  // const login = () => {
  //   history.push("/");
  // };

  const [globalState] = useGlobalContext();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(action, search);

    history.push(`/search/${action}/${search}`);
  };

  // Call the useAuth function
  useAuthTokenStore();
  // const isAuth = useIsAuthenticated();
  // Create the JSX for the component
  return (
    <CssBaseline>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Container maxWidth='lg' className={classes.navbarDisplayFlex}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='AccountCircle'
              to={globalState?.user._id !== 0 ? "/newsfeed" : "/"}>
              <Link to={globalState?.user._id !== 0 ? "/newsfeed" : "/"}>
                <img
                  src={Logo}
                  alt='logo'
                  style={{ height: "40px", width: "auto" }}
                />{" "}
              </Link>
            </IconButton>
            {globalState?.user._id !== 0 && (
              <div className={classes.search}>
                <form className={classes.searchForm} onSubmit={handleSubmit}>
                  <Input
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                  />
                  <NativeSelect
                    id='select'
                    className={classes.searchSelect}
                    onChange={e => setAction(e.target.value)}>
                    <option value='User'>User</option>
                    <option value='Posts'>Posts</option>
                    <option value='Causes'>Causes</option>
                    <option value='Hashtags'>Hashtags</option>
                  </NativeSelect>
                  <Button
                    type='submit'
                    onClick={handleSubmit}
                    className={classes.searchIcon}>
                    <SearchIcon />
                  </Button>
                </form>
              </div>
            )}
            <div className={classes.grow} />
            <NavDrawer navLinks={navLinks} />
          </Container>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
};

export default Nav;
