import React, { useEffect, useState } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//import Box from "@material-ui/core/Box";

import Nav from "../../../components/Navigation";
import News from "../../../components/Private/News";

import Gradient from "../../../components/Gradient";
import Causes from "../../../components/Private/Causes";
import About from "../../../components/About";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";

import {
  ADD_GUESS_USER,
  USER_GUESS_LOADING,
  //What about USER_LOADED?
} from "../../../utils/actions/actions";

import API from "../../../utils/api";
import { useHistory, useParams } from "react-router";
import { useGuessContext } from "../../../utils/GlobalStates/GuessContext";
//import { useUserContext } from "../../../utils/GlobalStates/UserContext";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const PublicDash = () => {
  const [guessState, guessDispatch] = useGuessContext();

  const {id} = useParams()

  const history = useHistory()

  useEffect(() => {
    async function fetchUserInfo() {

      const userInfo = await API.getUser(id);

      if(!userInfo){
          history.push("/404")
      }

      await guessDispatch({ type: USER_GUESS_LOADING, });

      await guessDispatch({
        type: ADD_GUESS_USER,
        payload: {
          ...userInfo.data,
          loading: false,
        },
      });
    }

    fetchUserInfo();
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { width } = useWindowDimensions();
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
                    key={guessState._id}
                    id={guessState._id}
                    bio={guessState.bio}
                    firstName={guessState.firstName}
                    lastname={guessState.lastname}
                    username={guessState.username}
                    email={guessState.email}
                    role={guessState.role}
                    verified={guessState.verified}
                    following={guessState.following.length}
                    followers={guessState.followers.length}
                    posts={guessState.posts}
                    causes={guessState.causes}
                    profileImg={guessState.profileImg}
                    bannerImg={guessState.bannerImg}
                    orgName={guessState.orgName}
										phoneNumber={guessState.phoneNumber}
										website={guessState.website}
										address={guessState.address}
                    check={id}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="card-container">
                  <Typography variant="subtitle2">NEWS FEED</Typography>
                  {guessState.posts.map((card) => (
                    <News
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author.firstName}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtag}
                      comments={card.comments}
                      check={id}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} sm={3} className="card-container">
                  <Typography variant="subtitle2">CAUSES</Typography>
                  {guessState.causes.map((card) => (
                    <Causes
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author.firstName}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtag}
                      check={id}
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
                aria-label="simple tabs example"
              >
                <Tab label="News" {...a11yProps(0)} />
                <Tab label="About" {...a11yProps(1)} />
                <Tab label="Causes" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  {guessState.posts.map((card) => (
                    <News
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author.firstName}
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
                    key={guessState._id}
                    id={guessState._id}
                    bio={guessState.bio}
                    firstName={guessState.firstName}
                    lastname={guessState.lastname}
                    username={guessState.username}
                    email={guessState.email}
                    role={guessState.role}
                    verified={guessState.verified}
                    following={guessState.following.length}
                    followers={guessState.followers.length}
                    posts={guessState.posts}
                    causes={guessState.causes}
                    profileImg={guessState.profileImg}
                    bannerImg={guessState.bannerImg}
                    orgName={guessState.orgName}
										phoneNumber={guessState.phoneNumber}
										website={guessState.website}
										address={guessState.address}
                    check={id}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid item xs={12}>
                  {guessState.causes.map((card) => (
                    <Causes
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author.firstName}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtag}
                      check={id}
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
