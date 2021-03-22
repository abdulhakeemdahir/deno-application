import React, { useEffect, useState } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../../components/Navigation";
import News from "../../../components/Private/NewsAndComment";
import Post from "../../../components/Post";
import Elephant from "../../../images/elephant.jpeg";
import Dolphin from "../../../images/dolphin.jpeg";
import Whale from "../../../images/whale.jpeg";
import Gradient from "../../../components/Gradient";
import Trending from "../../../components/Trending";
import Causes from "../../../components/Causes";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
// import Splash from "../../../components/Splash";
import { useCauseContext } from "../../../utils/GlobalStates/CauseContext";
import { usePostContext } from "../../../utils/GlobalStates/PostContext";
import {
  GET_CAUSE_INFO,
  GET_ALL_CAUSE_INFO,
  GET_POST_INFO,
  GET_ALL_POST_INFO,
  GET_TRENDING,
  UPDATE_CAUSE,
  UPDATE_POST,
  CAUSE_LOADING,
  REMOVE_CAUSE,
  POST_LOADING,
  REMOVE_POST,
  GET_FOLLOWING,
} from "../../../utils/actions/actions.js";

import API from "../../../utils/api";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
// const useStyles = makeStyles(theme => ({}));
const Newsfeed = () => {
  const [causeState, causeDispatch] = useCauseContext();
  const [postState, postDispatch] = usePostContext();

  useEffect(() => {
    console.log("HADSSLKJ")
    async function fetchAllPostsAndCauses() {
      causeDispatch({ type: CAUSE_LOADING });
      const causes = await API.getAllCauses();
      console.log(causes.data)
      causeDispatch({
        type: GET_ALL_CAUSE_INFO,
        payload: {
          causes: [...causes.data],
          loading: false,
        },
      });

      postDispatch({ type: POST_LOADING });
      const postInfo = await API.geAllPost();
      console.log(postInfo.data)
      postDispatch({
        type: GET_ALL_POST_INFO,
        payload: {
          posts: [...postInfo.data],
          loading: false,
        },
      });
      console.log(postState)
      // console.log(causeState)
    }
    
    fetchAllPostsAndCauses();
  }, []);

  const [trendingState] = useState([
    {
      hashTag: "Save the Dolphins",
      url: "#",
    },
    {
      hashTag: "Save the Elephants",
      url: "#",
    },
    {
      hashTag: "Save the Whales",
      url: "#",
    },
  ]);
  const [newsState] = useState([
    {
      title: "Dolphins Preservation",
      author: "Abdul",
      url: "#",
      thumbnail: Dolphin,
      post:
        "We need to save the dolphins! They are the humans of the Oceans! Plus, they were on Baywatch!",
      hashTag: "Save the Dolphins",
      comments: [
        {
          author: "Jake",
          post: "This is a test comment",
        },
        {
          author: "Bobby",
          post: "This is a test comment",
        },
        {
          author: "Drake",
          post: "This is a test comment",
        },
      ],
    },
    {
      title: "Elephant Preservation",
      author: "Abdul",
      url: "#",
      thumbnail: Elephant,
      post:
        "We need to save the Elephant! They are the humans of the Sahara! Plus, they were in the Lion King!",
      hashTag: "Save the Elephant",
      comments: [
        {
          author: "Chris",
          post: "This is a test comment",
        },
        {
          author: "Sherman",
          post: "This is a test comment",
        },
        {
          author: "Drake",
          post: "This is a test comment",
        },
      ],
    },
    {
      title: "Whale Preservation",
      author: "Abdul",
      url: "#",
      thumbnail: Whale,
      post:
        "We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
      hashTag: "Save the Whale",
      comments: [
        {
          author: "Ani",
          post:
            "We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
        },
        {
          author: "Stewart",
          post:
            "We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
        },
        {
          author: "Cassandra",
          post:
            "We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
        },
        {
          author: "Cassandra",
          post:
            "We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
        },
      ],
    },
  ]);
  // const classes = useStyles();
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
                  <Typography variant="subtitle2">TRENDING</Typography>
                  {trendingState.map((card) => (
                    <Trending hashTag={card.hashTag} link={card.url} />
                  ))}
                </Grid>
                <Grid item xs={12} sm={6} className="card-container">
                  <Typography variant="subtitle2">NEWS FEED</Typography>
                  <Post className="card" />
                  {postState.posts.map((card) => (
                    <News
                    key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtags}
                      comments={card.comments}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} sm={3} className="card-container">
                  <Typography variant="subtitle2">CAUSES</Typography>
                  {causeState.causes.map((card) => (
                    <Causes
                    key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtags}
                    />
                  ))}
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="News" {...a11yProps(0)} />
                <Tab label="Trending" {...a11yProps(1)} />
                <Tab label="Causes" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  <Post className="card" />
                  {postState.posts.map((card) => (
                    <News
                    key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtags}
                      comments={card.comments}
                    />
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  {trendingState.map((card) => (
                    <Trending hashTag={card.hashTag} link={card.url} />
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid item xs={12}>
                  {causeState.causes.map((card) => (
                    <Causes
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      author={card.author}
                      link={card.url}
                      image={card.imageUrl}
                      post={card.content}
                      hashTag={card.hashtags}
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
export default Newsfeed;
