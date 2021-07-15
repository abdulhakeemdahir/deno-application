// Import all relevant packages and components
import React from "react";
import { Typography, Grid, AccordionDetails, Button } from "@material-ui/core";
import useNewsStyles from "../styles/useNewsStyles";
import "../styles/style.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { Delete } from "@material-ui/icons";
import api from "../../../utils/api";
import { LOADING, UPDATE } from "../../../utils/actions/actions";

const CommentSection = ({ comments, author }) => {
  const classes = useNewsStyles();

  const [globalState, globalDispatch] = useGlobalContext();

  const handleRemove = async (commentId, postId) => {
    await api.removeComments(commentId, postId);

    const postInfo = await api.getAllPost();
    dispatch(UPDATE, { posts: postInfo.data, loading: false });
  };

  const dispatch = async (action, payload) => {
    await globalDispatch({
      type: LOADING
    });

    await globalDispatch({
      type: action,
      payload: {
        ...payload
      }
    });
  };

  return (
    <Grid className='cardComment'>
      {comments.map(card => (
        <AccordionDetails key={card._id}>
          <Grid container className={classes.gridStyle}>
            <Grid item xs={4}>
              <Typography variant='body2' color='textSecondary' component='p'>
                <Link
                  to={
                    card.user._id === globalState.user._id
                      ? "/dashboard"
                      : `/dashboard/${card.user._id}`
                  }>
                  {card.user.username}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant='body2' color='textSecondary' component='p'>
                {card.content}
              </Typography>
            </Grid>

            {card.user._id === globalState.user._id ||
            globalState.user.username === author ? (
              <Grid item xs={1}>
                <Button
                  className='editButton'
                  onClick={() => handleRemove(card._id, card.post)}>
                  <Delete />
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </AccordionDetails>
      ))}
    </Grid>
  );
};

export default CommentSection;
