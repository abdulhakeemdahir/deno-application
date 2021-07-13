/* eslint-disable react-hooks/exhaustive-deps */
// Import all relevant packages and components
import React, { useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
import "../../pageStandards.scss";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../../components/Navigation";
import Feed from "../../../components/Feed";
import Gradient from "../../../components/Gradient";
import Causes from "../../../components/Causes";
import About from "../../../components/About";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import { LOADING, UPDATE } from "../../../utils/actions/actions";
import API from "../../../utils/api";
import { useHistory, useParams } from "react-router";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
// Create TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
// Create the component function and export for use
const PublicDash = () => {
  // Destructure globalState.guessUser and guessDispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  // Get id from useParams
  const { id } = useParams();
  // Call useHistory
  const history = useHistory();
  // Get all user Data
  useEffect(() => {
    async function fetchUserInfo() {
      const userInfo = await API.getUser(id);
      if (!userInfo) {
        history.push("/404");
      }
      await globalDispatch({ type: LOADING });
      await globalDispatch({
        type: UPDATE,
        payload: {
          guessUser: userInfo.data
        }
      });
    }
    fetchUserInfo();
  }, []);

  // Create the set and setState from useState
  const [value, setValue] = React.useState(0);
  // Create the handleChange function
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Call the Window Width function
  const { width } = useWindowDimensions();
  // Create the JSX for the component
  return (
    <div className='Main'>
      <CssBaseline>
        <Nav />
        <Grid
          container
          direction='row'
          justifyContent='center'
          className={"container"}>
          {width > 1024 ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} className='card-container'>
                  <Typography variant='subtitle2'>ABOUT</Typography>
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
                    check={id}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='card-container'>
                  <Typography variant='subtitle2'>NEWS FEED</Typography>
                  {globalState.guessUser.posts.map(card => (
                    <Feed
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author.username}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtag}
                      comments={card.comments}
                      check={id}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} sm={3} className='card-container'>
                  <Typography variant='subtitle2'>CAUSES</Typography>
                  {globalState.guessUser.causes.map(card => (
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
                    />
                  ))}
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='simple tabs example'>
                <Tab label='News' {...a11yProps(0)} />
                <Tab label='About' {...a11yProps(1)} />
                <Tab label='Causes' {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  {globalState.guessUser.posts.map(card => (
                    <Feed
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author.username}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtag}
                      comments={card.comments}
                      check={id}
                    />
                  ))}
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
                    check={id}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid item xs={12}>
                  {globalState.guessUser.causes.map(card => (
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
                    />
                  ))}
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

export default PublicDash;
