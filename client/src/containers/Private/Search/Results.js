import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import UserCard from "../../../components/Card";
import News from "../../../components/Private/News";
import Causes from "../../../components/Private/Causes";
import Trending from "../../../components/Trending";
import API from "../../../utils/api";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { LOADING, UPDATE } from "../../../utils/actions/actions.js";
import { useParams } from "react-router-dom";

const Results = () => {
  const [globalState, globalDispatch] = useGlobalContext();

  let { action, search } = useParams();

  // Get post Data
  useEffect(() => {
    API.getSearchResults(action, search).then(res => {
      const payload = { search: res.data };
      dispatch(payload);
    });

    return () => {
      const payload = { search: [] };
      dispatch(payload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const dispatch = async payload => {
    if (payload.search === undefined) return;

    await globalDispatch({ type: LOADING });

    await globalDispatch({
      type: UPDATE,
      payload
    });

    return;
  };

  return (
    <div>
      {/* If the search has no results. */}
      {Object.keys(globalState.search).length === 0 && (
        <Typography>No results found. Please try again! 😃</Typography>
      )}
      {/* If the globalState is loading then this message will appear. */}
      {globalState.loading && <Typography>Loading...</Typography>}
      {/* If the globalState.search contains a user */}
      {!globalState.loading &&
        Object.keys(globalState.search).length !== 0 &&
        globalState.search.username &&
        globalState.search.map(user => <UserCard key={user._id} {...user} />)}
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
    </div>
  );
};

export default Results;
