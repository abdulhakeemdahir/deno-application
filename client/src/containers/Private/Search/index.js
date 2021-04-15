// Import all relevant packages and components
import React, { useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../../components/Navigation";
import News from "../../../components/Private/NewsAndComment";
import Post from "../../../components/Post";
import Gradient from "../../../components/Gradient";
import Causes from "../../../components/Causes";
import Footer from "../../../components/Footer";
import API from "../../../utils/api";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { LOADING, UPDATE, ADD } from "../../../utils/actions/actions.js";
import { useParams } from "react-router-dom";

// Create TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
// Create the component function and export for use
const Search = () => {
  // Destructure causeState and causeDispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  // Destructure State and Dispatch from Context
  const { width } = useWindowDimensions();
  const [value, setValue] = React.useState(0);
  let { action, search } = useParams();

  // Get post Data
  useEffect(() => {
    console.log(action, search, "Search console");
    API.getSearchResults(action, search).then(res => {
      console.log(res);
    });
  }, []);

  const dispatch = async (action, payload) => {
    await globalDispatch({ type: LOADING });
    await globalDispatch({
      type: action,
      payload: {
        ...payload
      }
    });
    return;
  };

  // Create the handleChange function
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Create the JSX for the component
  return (
    <main className="Main">
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
                <Grid item xs={12} sm={6} className="card-container">
                  <Typography variant="subtitle2">NEWS FEED</Typography>
                  <Post className="card" />
                  {globalState.posts?.map(card => {
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
                  {globalState.causes.map(card => {
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
                <Tab label="Causes" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  <Post className="card" />
                  {globalState.posts.map(card => {
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
              <TabPanel value={value} index={2}>
                <Grid item xs={12}>
                  {globalState.causes.map(card => {
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
    </main>
  );
};
export default Search;
