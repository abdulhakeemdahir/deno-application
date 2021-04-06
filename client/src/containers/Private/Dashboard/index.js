// Import all relevant packages and components
import React from "react";
import { Typography, Grid, CssBaseline, Breadcrumbs } from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../../components/Navigation";
import News from "../../../components/Private/News";
import Gradient from "../../../components/Gradient";
import Causes from "../../../components/Private/Causes";
import About from "../../../components/About";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import AddContent from "../../../components/Forms/AddContent";
import { NavLink } from "react-router-dom";
import Post from "../../../components/Post";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
// Create TabPanel
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
// Create the component function and export for use
const Dashboard = () => {
	// Destructure State and Dispatch from Context
  const [globalState, ] = useGlobalContext();
	
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
              <Breadcrumbs style={{ position: "absolute" }}>
                <NavLink to="newsfeed">Home</NavLink>
                <Typography color="textSecondary">Dashboard</Typography>
              </Breadcrumbs>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} className="card-container">
                  <Typography variant="subtitle2">ABOUT</Typography>
                  <About
                    key={globalState.user._id}
                    id={globalState.user._id}
                    bio={globalState.user.bio}
                    firstName={globalState.user.firstName}
                    lastname={globalState.user.lastname}
                    username={globalState.user.username}
                    email={globalState.user.email}
                    role={globalState.user.role}
                    verified={globalState.user.verified}
                    following={globalState.user.following.length}
                    followers={globalState.user.followers.length}
                    posts={globalState.user.posts}
                    causes={globalState.user.causes}
                    profileImg={globalState.user.profileImg}
                    bannerImg={globalState.user.bannerImg}
                    website={globalState.user.website}
                    address={globalState.user.address}
                    orgName={globalState.user.orgName}
                    phone={globalState.user.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="card-container">
                  <Typography variant="subtitle2">NEWS FEED</Typography>
                  <Post className="card" />
                  {globalState.user.posts.length === 0 ? (
                    <AddContent text="Please make a Post in the Newsfeed " />
                  ) : (
                    globalState.user.posts.map((card) => (
                      <News
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        author={card.author.username}
                        authorId={card.author._id}
                        link={card.url}
                        image={card.imageUrl}
                        post={card.content}
                        hashTag={card.hashtag}
                        comments={card.comments}
                      />
                    ))
                  )}
                </Grid>
                <Grid item xs={12} sm={3} className="card-container">
                  <Typography variant="subtitle2">CAUSES</Typography>
                  {globalState.user.causes.length === 0 ? (
                    <AddContent text="Please make/follow a Cause " />
                  ) : (
                    globalState.user.causes.map((card) => (
                      <Causes
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        author={card.author.orgName}
                        causeId={card.author._id}
                        link={card.url}
                        image={card.imageUrl}
                        post={card.content}
                        hashTag={card.hashtag}
                        role={globalState.user.role}
                      />
                    ))
                  )}
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
                <Tab label="Causes" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  {globalState.user.posts.length === 0 ? (
                    <AddContent text="Please make a Post in the Newsfeed " />
                  ) : (
                    globalState.user.posts.map((card) => (
                      <News
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        author={card.author.username}
                        link={card.url}
                        image={card.imageUrl}
                        post={card.content}
                        hashTag={card.hashtag}
                        comments={card.comments}
                      />
                    ))
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  <About
                    key={globalState.user._id}
                    id={globalState.user._id}
                    bio={globalState.user.bio}
                    firstName={globalState.user.firstName}
                    lastname={globalState.user.lastname}
                    username={globalState.user.username}
                    email={globalState.user.email}
                    role={globalState.user.role}
                    verified={globalState.user.verified}
                    following={globalState.user.following.length}
                    followers={globalState.user.followers.length}
                    posts={globalState.user.posts}
                    causes={globalState.user.causes}
                    profileImg={globalState.user.profileImg}
                    bannerImg={globalState.user.bannerImg}
                    website={globalState.user.website}
                    address={globalState.user.address}
                    orgName={globalState.user.orgName}
                    phone={globalState.user.phoneNumber}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid item xs={12}>
                  {globalState.user.posts.length === 0 ? (
                    <AddContent text="Please make/follow a Cause " />
                  ) : (
                    globalState.user.causes.map((card) => (
                      <Causes
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        author={card.author.orgName}
                        causeId={card.author._id}
                        link={card.url}
                        image={card.imageUrl}
                        post={card.content}
                        hashTag={card.hashtag}
                        role={globalState.user.role}
                      />
                    ))
                  )}
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

export default Dashboard;
