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
	const [singleState, SingleStateDispatch] = useState({post:{}});
	// Get ID from useParams
	const { id } = useParams();
	// Call useHistory function
	const history = useHistory();
	// Get all user Data
	useEffect(() => {
		async function fetchUserInfo() {
			const singlePost = await API.findUserPosts(id);
			console.log(singlePost.data);
			if (!singlePost) {
        history.push("/404");
      }
			await SingleStateDispatch({post:singlePost.data});
			console.log(singleState);
		}
		fetchUserInfo();
	}, []);

	console.log(singleState);
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
                <Grid item xs={12} sm={3} className="card-container">
                  <Typography variant="subtitle2">ABOUT</Typography>

                  <About
                    // key={singleState.post.author._id}
                    // id={singleState.post.author._id}
                    // bio={singleState.post.author.bio}
                    // firstName={singleState.post.author.firstName}
                    // lastname={singleState.post.author.lastname}
                    // username={singleState.post.author.username}
                    // email={singleState.post.author.email}
                    // role={singleState.post.author.role}
                    // verified={singleState.post.author.verified}
                    // following={singleState.post.author.following.length}
                    // followers={singleState.post.author.followers.length}
                    // posts={singleState.post.author.posts}
                    // causes={singleState.post.author.causes}
                    // profileImg={singleState.post.author.profileImg}
                    // bannerImg={singleState.post.author.bannerImg}
                    // orgName={singleState.post.author.orgName}
                    // phoneNumber={singleState.post.author.phoneNumber}
                    // website={singleState.post.author.website}
                    // address={singleState.post.author.address}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="card-container">
                  <Typography variant="subtitle2">NEWS FEED</Typography>

                  <SingleNews
                    // title={singleState.post.title}
                    // author={singleState.post.author}
                    // link={singleState.post.url}
                    // image={singleState.post.thumbnail}
                    // post={singleState.post.post}
                    // hashTag={singleState.post.hashTag}
                    // comments={singleState.post.comments}
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
                  <SingleNews
                    // title={singleState.post.title}
                    // author={singleState.post.author}
                    // link={singleState.post.url}
                    // image={singleState.post.thumbnail}
                    // post={singleState.post.post}
                    // hashTag={singleState.post.hashTag}
                    // comments={singleState.post.comments}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  <About
                    // key={singleState.post.author._id}
                    // id={singleState.post.author._id}
                    // bio={singleState.post.author.bio}
                    // firstName={singleState.post.author.firstName}
                    // lastname={singleState.post.author.lastname}
                    // username={singleState.post.author.username}
                    // email={singleState.post.author.email}
                    // role={singleState.post.author.role}
                    // verified={singleState.post.author.verified}
                    // following={singleState.post.author.following.length}
                    // followers={singleState.post.author.followers.length}
                    // posts={singleState.post.author.posts}
                    // causes={singleState.post.author.causes}
                    // profileImg={singleState.post.author.profileImg}
                    // bannerImg={singleState.post.author.bannerImg}
                    // orgName={singleState.post.author.orgName}
                    // phoneNumber={singleState.post.author.phoneNumber}
                    // website={singleState.post.author.website}
                    // address={singleState.post.author.address}
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
