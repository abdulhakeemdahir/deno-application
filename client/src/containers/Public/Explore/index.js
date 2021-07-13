/* eslint-disable react-hooks/exhaustive-deps */
// Import all relevant packages and components
import React, { useEffect } from "react";

import {
  Typography,
  Grid,
  CssBaseline,
  Dialog,
  Fade,
  Backdrop,
  Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Nav from "../../../components/Navigation";
import Feed from "../../../components/Feed";
import SiteInfo from "../../../components/SiteInfo";
import Gradient from "../../../components/Gradient";
import Trending from "../../../components/Trending";
import Causes from "../../../components/Causes";
import Footer from "../../../components/Footer";

import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import { UPDATE, LOADING } from "../../../utils/actions/actions.js";
import API from "../../../utils/api";
import { Close } from "@material-ui/icons";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";

import "./style.css";

// Create TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// Create the component function and export for use
const Explore = () => {
  // Destructure causeState and causeDispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();

  // Get all user Data
  useEffect(() => {
    async function fetchAllPostsAndCauses() {
      const causes = await API.getAllCauses();
      dispatch(UPDATE, { causes: causes.data, loading: false });

      const postInfo = await API.getAllPost();
      dispatch(UPDATE, { posts: postInfo.data, loading: false });

      const hashInfo = await API.getHashtagAll();
      dispatch(UPDATE, { hashtag: hashInfo.data, loading: false });
    }

    fetchAllPostsAndCauses();
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
  // Create the set and setState from useState
  const [value, setValue] = React.useState(0);
  // Create the handleChange function
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Create the set and setState from useState
  const [open, setOpen] = React.useState(true);
  // Create the handleClose function
  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };
  // Call the Window Width function
  const { width } = useWindowDimensions();
  // Create the JSX for the component
  return (
    <div className='Main'>
      <CssBaseline>
        <Dialog
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}>
          <Fade in={open}>
            <SiteInfo />
          </Fade>
          <Button
            size='large'
            className='analyticsButton'
            fullWidth
            onClick={handleClose}>
            <Close />
            Close Modal
          </Button>
        </Dialog>
        <Nav />
        <Grid
          container
          direction='row'
          justifyContent='center'
          className={"container"}
          xs={12}
          lg={10}
          xl={8}>
          {width > 600 ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} className='card-container'>
                  <Typography variant='subtitle2'>TRENDING</Typography>
                  {globalState.hashtag.map((card, index) => (
                    <Trending
                      hashTag={card.hashtag}
                      post={card.posts}
                      link={card._id}
                      key={index}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} sm={6} className='card-container'>
                  <Typography variant='subtitle2'>NEWS FEED</Typography>
                  {globalState.posts.map(card => {
                    return (
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
                      />
                    );
                  })}
                </Grid>
                <Grid item xs={12} sm={3} className='card-container'>
                  <Typography variant='subtitle2'>CAUSES</Typography>
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
                aria-label='simple tabs example'>
                <Tab label='News' {...a11yProps(0)} />
                <Tab label='Trending' {...a11yProps(1)} />
                <Tab label='Causes' {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  {globalState.posts.map(card => {
                    return (
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
                      post={card.posts}
                      link={card._id}
                      key={index}
                    />
                  ))}
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
export default Explore;
