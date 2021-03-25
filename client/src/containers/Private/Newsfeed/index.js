import React, { useEffect,  } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
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
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
// import Splash from "../../../components/Splash";
import { useCauseContext } from "../../../utils/GlobalStates/CauseContext";
import { usePostContext } from "../../../utils/GlobalStates/PostContext";
import { useTrendingContext } from "../../../utils/GlobalStates/TrendingContext";
import {
	CAUSE_LOADING,
	POST_LOADING,
	ADD_CAUSE,
	ADD_POST,
	ADD_TREND,
	TREND_LOADING,
} from "../../../utils/actions/actions.js";
import API from "../../../utils/api";
import { useSocket } from "../../../utils/GlobalStates/SocketProvider";
import { useStoreContext } from "../../../utils/GlobalStates/AuthStore";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const Newsfeed = () => {
	const [causeState, causeDispatch] = useCauseContext();
	const [postState, postDispatch] = usePostContext();
	const [trendingStates, trendingDispatch] = useTrendingContext();
  const [userState] = useUserContext();
	const socket = useSocket();
	const [state] = useStoreContext();

	useEffect(() => {
    async function fetchAllPostsAndCauses() {
      await causeDispatch({ type: CAUSE_LOADING });

      const causes = await API.getAllCauses();

      await causeDispatch({
        type: ADD_CAUSE,
        payload: {
          causes: causes.data,
          loading: false,
        },
      });

      const postInfo = await API.getAllPost();

	  await postDispatch({ type: POST_LOADING });

      await postDispatch({
        type: ADD_POST,
        payload: {
          posts: postInfo.data,
          loading: false,
        },
      });

      await trendingDispatch({ type: TREND_LOADING });
      const hashInfo = await API.getHashtagAll();

      await trendingDispatch({
        type: ADD_TREND,
        payload: {
          hashtag: hashInfo.data,
          loading: false,
        },
      });
    }
    fetchAllPostsAndCauses();

    if (!socket) return;

    socket.emit("join:server", state.userAuth.user.username);
  }, []);

	//const classes = useStyles();
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
                  {trendingStates.hashtag.map((card, index) => (
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
                  {postState.posts.map((card) => {
                    return (
                      <News
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        author={card.author.firstName}
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
                  {causeState.causes.map((card) => {
                    return (
                      <Causes
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        author={card.author.firstName}
                        link={card.url}
                        image={card.imageUrl}
                        post={card.content}
                        hashTag={card.hashtag}
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
                  {postState.posts.map((card) => {
                    return (
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
                        liked={card.likes}
                      />
                    );
                  })}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  {trendingStates.hashtag.map((card, index) => (
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
                  {causeState.causes.map((card) => {
                    return (
                      <Causes
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        author={card.author.firstName}
                        link={card.url}
                        image={card.imageUrl}
                        post={card.content}
                        hashTag={card.hashtag}
                      />
                    );
                  })}
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
