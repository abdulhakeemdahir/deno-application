// Import all relevant packages and components
import React, { useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
import PropTypes from "prop-types";
import Nav from "../../../components/Navigation";
import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import UserCard from "../../../components/Card";
import News from "../../../components/Private/News";
import Causes from "../../../components/Private/Causes";
import Trending from "../../../components/Trending";
import API from "../../../utils/api";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { LOADING, UPDATE } from "../../../utils/actions/actions.js";
import { useParams } from "react-router-dom";
import NProgress from "nprogress";

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

  let { action, search } = useParams();

  // Get post Data
  useEffect(() => {
    console.log(action, search, "Search console");
    API.getSearchResults(action, search).then(res => {
      if (res.data[0]?.username) {
        const payload = { search: res.data[0] };
        dispatch(payload);
        return;
      }

      console.log(res.data);

      const payload = { search: res.data };
      dispatch(payload);
    });

    return () => {
      const payload = { search: {} };
      dispatch(payload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const dispatch = async payload => {
    console.log(payload);

    if (payload.search === undefined) return;

    await globalDispatch({ type: LOADING });

    await globalDispatch({
      type: UPDATE,
      payload
    });

    console.log("GlobalSearch: ", globalState);
    return;
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
          {/* If the search has no results. */}
          {Object.keys(globalState.search).length === 0 && (
            <Typography>No results found. Please try again! 😃</Typography>
          )}
          {/* If the globalState is loading then this message will appear. */}
          {globalState.loading && <Typography>Loading...</Typography>}
          {/* If the globalState.search contains a user */}
          {!globalState.loading &&
            Object.keys(globalState.search).length !== 0 &&
            globalState.search.username && (
              <UserCard {...globalState?.search}></UserCard>
            )}
          {/* If the globalState.search contains posts */}
          {!globalState.loading &&
            globalState.search.length &&
            window.location.pathname.includes("Post") &&
            globalState.search.map(card => (
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
            ))}
          {/* If the globalState.search contains Causes */}
          {!globalState.loading &&
            globalState.search.length &&
            window.location.pathname.includes("Causes") &&
            globalState.search.map(card => {
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
          {/* If the globalState.search contains Hashtags */}
          {!globalState.loading &&
            globalState.search.length &&
            window.location.pathname.includes("Hashtag") &&
            globalState.search.map((card, index) => (
              <Trending
                hashTag={card.hashtag}
                post={card.posts}
                link={card._id}
                key={index}
              />
            ))}
        </Grid>
        <Gradient />
        <Footer />
      </CssBaseline>
    </main>
  );
};
export default Search;
