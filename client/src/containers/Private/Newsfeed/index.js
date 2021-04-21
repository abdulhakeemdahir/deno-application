// Import all relevant packages and components
import React, { useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../../components/Navigation";
import News from "../../../components/Private/NewsAndComment";
import Post from "../../../components/Post";
import Gradient from "../../../components/Gradient";
import Trending from "../../../components/Trending";
import Causes from "../../../components/Causes";
import Footer from "../../../components/Footer";
import API from "../../../utils/api";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { useSocket } from "../../../utils/GlobalStates/SocketProvider";
import {
	LOADING,
  UPDATE,
	ADD
} from "../../../utils/actions/actions.js";
import { useStoreContext } from "../../../utils/GlobalStates/AuthStore";
import api from "../../../utils/api";
// Create TabPanel
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
// Create the component function and export for use
const Newsfeed = () => {
	// Destructure causeState and causeDispatch from Context
	const [globalState, globalDispatch] = useGlobalContext();

	const socket = useSocket();
	// Destructure State and Dispatch from Context
	const [state] = useStoreContext();

	// Get post Data
	useEffect(() => {
		async function fetchAllPostsAndCauses() {
			const userInfo = await api.getUser(globalState.user._id);
			dispatch(ADD, { user: userInfo.data, loading: false });

			const causes = await API.getAllCauses();
			dispatch(UPDATE, { causes: causes.data, loading: false });

			const postInfo = await API.getAllPost();
			dispatch(UPDATE, { posts: postInfo.data, loading: false });

			const hashInfo = await API.getHashtagAll();
			dispatch(UPDATE, { hashtag: hashInfo.data, loading: false });

		}

		fetchAllPostsAndCauses();

		if (!socket) return;
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
	// Use Socket IO for real time updates
	useEffect(() => {
		if (state.socket.id === globalState.user.socketId) return;
		socket.emit("join:server", state.userAuth.user.username);
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
                  {globalState.hashtag.map((card, index) => (
                    <Trending
                      hashTag={card.hashtag}
                      post={card.posts}
                      link={card._id}
                      key={index}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} sm={6} className="card-container">
                  <Typography variant="subtitle2">NEWS FEED</Typography>
                  <Post className="card" />
                  {globalState.posts?.map((card) => {
                    return (
                      <News
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        author={card.author.username}
                        authorId={card.author._id}
                        link={card.url}
                        image={card.imageUrl}
                        post={card.content}
                        hashTag={card.hashtags}
                        comments={card.comments}
                        liked={card.likes}
                      />
                    );
                  })}
                </Grid>
                <Grid item xs={12} sm={3} className="card-container">
                  <Typography variant="subtitle2">CAUSES</Typography>
                  {globalState.causes.map((card) => {
                    return (
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
                    );
                  })}
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
                <Tab label="Trending" {...a11yProps(1)} />
                <Tab label="Causes" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  <Post className="card" />
                  {globalState.posts.map((card) => {
                    return (
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
                        liked={card.likes}
                      />
                    );
                  })}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  {globalState.hashtag.map((card, index) => (
                    <Trending
                      hashTag={card.hashtag}
                      link={card._id}
                      key={index}
                    />
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid item xs={12}>
                  {globalState.causes.map((card) => {
                    return (
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
                    );
                  })}
                </Grid>
              </TabPanel>
            </>
          )}
        </Grid>
        <Gradient />
        <Footer />
      </CssBaseline>
    </div>
  );
};
export default Newsfeed;
