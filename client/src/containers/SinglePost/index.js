// Import all relevant packages and components
import React, { useState, useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../components/Navigation/index";
import Gradient from "../../components/Gradient";
import About from "../../components/About";
import Footer from "../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../utils";
import API from "../../utils/api";
import SingleNews from "../../components/SingleNews";
import { useHistory, useParams } from "react-router";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";
import { LOADING, UPDATE, ADD } from "../../utils/actions/actions.js";
// Create TabPanel
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
// Create the component function and export for use
const SinglePost = () => {
	// Destructure guessState and guessDispatch from Context
	// Create the set and setState from useState
	const [globalState, globalDispatch] = useGlobalContext();
	// Get ID from useParams
	const { id } = useParams();
	// Call useHistory function
	const history = useHistory();
	// Get all user Data
	useEffect(() => {
		async function fetchUserInfo() {
			const singlePost = await API.findUserPosts(id);
      dispatch(ADD, { singlePosts: singlePost.data, loading: false });
      console.log(globalState)
			if (!singlePost) {
        history.push("/404");
      }

      const userInfo = await API.getUser(singlePost.data.author._id);
      dispatch(UPDATE, { guessUser: userInfo.data, loading: false });
		}
		fetchUserInfo();
	}, []);

  const dispatch = async (action, payload) => {
    await globalDispatch({ type: LOADING });
    await globalDispatch({
      type: action,
      payload: {
        ...payload,
      },
    });
    return;
  };

	// Create the set and setState from useState
	const [value, setValue] = React.useState(0);
	// Create the handleChange function
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// Call the Window Width Function
	const { width } = useWindowDimensions();
	// Create the JSX for the component
	return (
    <div className="Main">
      <CssBaseline>
        <Nav />
        <Grid
          container
          direction="row"
          justify="center"
          className={"container"}
          xs={12}
          lg={10}
          xl={8}
        >
          {width > 600 ? (
            <>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  className="globalState.singlePosts-container"
                >
                  <Typography variant="subtitle2">ABOUT</Typography>

                  <About
                    key={globalState.guessUser._id}
                    id={globalState.guessUser._id}
                    bio={globalState.guessUser.bio}
                    firstName={globalState.guessUser.firstName}
                    lastname={globalState.guessUser.lastname}
                    username={globalState.guessUser.username}
                    email={globalState.guessUser.email}
                    role={globalState.guessUser.role}
                    verified={globalState.guessUser.verified}
                    following={globalState.guessUser.following.length}
                    followers={globalState.guessUser.followers.length}
                    posts={globalState.guessUser.posts}
                    causes={globalState.guessUser.causes}
                    profileImg={globalState.guessUser.profileImg}
                    bannerImg={globalState.guessUser.bannerImg}
                    orgName={globalState.guessUser.orgName}
                    phoneNumber={globalState.guessUser.phoneNumber}
                    website={globalState.guessUser.website}
                    address={globalState.guessUser.address}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className="globalState.singlePosts-container"
                >
                  <Typography variant="subtitle2">NEWS FEED</Typography>
                      <SingleNews
                      key={globalState.singlePosts._id}
                      id={globalState.singlePosts._id}
                      title={globalState.singlePosts.title}
                      author={globalState.singlePosts.author.username}
                      link={globalState.singlePosts.url}
                      image={globalState.singlePosts.imageUrl}
                      post={globalState.singlePosts.content}
                      hashTag={globalState.singlePosts.hashtag}
                      comments={globalState.singlePosts.comments}
                      check={id}
                    />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="News" {...a11yProps(0)} />
                <Tab label="About" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  {
                      <SingleNews
                      key={globalState.singlePosts._id}
                      id={globalState.singlePosts._id}
                      title={globalState.singlePosts.title}
                      author={globalState.singlePosts.author.username}
                      link={globalState.singlePosts.url}
                      image={globalState.singlePosts.imageUrl}
                      post={globalState.singlePosts.content}
                      hashTag={globalState.singlePosts.hashtag}
                      comments={globalState.singlePosts.comments}
                      check={id}
                    />
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  <About
                    key={globalState.guessUser._id}
                    id={globalState.guessUser._id}
                    bio={globalState.guessUser.bio}
                    firstName={globalState.guessUser.firstName}
                    lastname={globalState.guessUser.lastname}
                    username={globalState.guessUser.username}
                    email={globalState.guessUser.email}
                    role={globalState.guessUser.role}
                    verified={globalState.guessUser.verified}
                    following={globalState.guessUser.following.length}
                    followers={globalState.guessUser.followers.length}
                    posts={globalState.guessUser.posts}
                    causes={globalState.guessUser.causes}
                    profileImg={globalState.guessUser.profileImg}
                    bannerImg={globalState.guessUser.bannerImg}
                    orgName={globalState.guessUser.orgName}
                    phoneNumber={globalState.guessUser.phoneNumber}
                    website={globalState.guessUser.website}
                    address={globalState.guessUser.address}
                  />
                </Grid>
              </TabPanel>
            </>
          )}
        </Grid>
        <Gradient />
        {/* <Splash /> */}
        <Footer />
      </CssBaseline>
    </div>
  );
};

export default SinglePost;
