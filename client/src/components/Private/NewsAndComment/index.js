import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  CardMedia,
  Divider,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./style.css";
import { Favorite } from "@material-ui/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import api from "../../../utils/api";
import { usePostContext } from "../../../utils/GlobalStates/PostContext";
import { Link } from "react-router-dom";
import { ADD_POST, POST_LOADING } from "../../../utils/actions/actions";
import { useSocket } from "../../../utils/GlobalStates/SocketProvider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    color: "#E57373"
  },
  shadow: {
    boxShadow: "none",
    // background: "#F7F7F7",
    borderRadius: "0px !important",
    width: "100%"
  },
  commentStyle: {
    backgroundColor: "#E57373",
    color: "white",
    borderRadius: "50px"
  },
  gridStyle: {
    borderBottom: "1px dashed #E7E7E7",
    paddingBottom: "2px"
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1DE9B6,#1DC4E9)",
    color: "#FFFFFF",
    padding: "15px",
    // marginTop: "10px",
    borderRadius: "0px"
  },
  inputMargin: {
    // margin: "5px",
  }
}));
const NewsAndComment = props => {
  const classes = useStyles();

  const [, postDispatch] = usePostContext();

  const [userState] = useUserContext();

  const [commentState, setCommentState] = useState({
    content: ""
  });

  const socket = useSocket();

  const handleChange = function(event) {
    const { name, value } = event.target;
    setCommentState({
      ...commentState,
      [name]: value
    });
  };

  const handleSubmit = async id => {
    try {
      const comment = {
        ...commentState,
        user: userState._id,
        post: id
      };

      const { data } = await api.createComments(comment);

      await api.updateObjectID(id, { comments: data._id });

      const postInfo = await api.getAllPost();

      await postDispatch({ type: POST_LOADING });

      await postDispatch({
        type: ADD_POST,
        payload: {
          posts: postInfo.data,
          loading: false
        }
      });

      const payload = { isPost: true };

      socket.emit("send-message", payload);
      clearState();
    } catch (err) {}
  };

  const clearState = () => {
    setCommentState({
      content: ""
    });
    return;
  };

  const handleLike = async id => {
    const found = props.liked.find(l => l._id === userState._id);
    console.log(found);
    if (found) {
      await api.removeliked(id, { likes: userState._id });
    } else {
      await api.updateObjectID(id, { likes: userState._id });
    }

    const postInfo = await api.getAllPost();

    await postDispatch({ type: POST_LOADING });

    await postDispatch({
      type: ADD_POST,
      payload: {
        posts: postInfo.data,
        loading: false
      }
    });
  };

  useEffect(() => {
    const updatePosts = async posts => {
      await postDispatch({ type: POST_LOADING });

      await postDispatch({
        type: ADD_POST,
        payload: {
          posts,
          loading: false
        }
      });
    };

    socket.on("update-post", updatePosts);

    return () => socket.off("update-post");
  }, []);

  return (
    <>
      <Grid item className='card' xs={12}>
        <Grid container className='headerContainer'>
          <Grid item xs={9} sm={11}>
            <Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={1}>
            <Button className='editButton' onClick={() => handleLike(props.id)}>
              <>
                {props.liked.find(l => l._id === userState._id) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </>
            </Button>
          </Grid>
        </Grid>
        <Typography variant='body2' color='textSecondary' component='p'>
          <span className='authorStyle'> Author:</span>
          <Link
            to={
              props.authorId === userState._id
                ? "dashboard"
                : `/dashboard/${props.authorId}`
            }
          >
            {props.author}
          </Link>
        </Typography>
        <Divider />
        <Grid container direction='row' spacing={1}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              className={"media"}
              image={`https://res.cloudinary.com/astralgnome/image/upload/${props.image}`}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography variant='body' color='textSecondary' component='p'>
                {props.post}
              </Typography>

              {
                //props.hashTag != false ? (
                //<>
                //   {props.hashTag[0].hashtag.map((tag) => (
                //     <Link to={props.hashTag[0]._id} className="hashTagStyle">
                //       #{tag}
                //     </Link>
                //   ))}
                //</>
                //) : null
              }
            </CardContent>
            <Divider />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={12} sm={8}>
            <TextField
              name='content'
              value={commentState.content}
              onChange={handleChange}
              id={props.id}
              label='Post a Comment'
              variant='filled'
              size='small'
              multiline
              rowsMax={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} id={props.id}>
            <Button
              size='small'
              id={props.id}
              className={classes.styleMain}
              fullWidth
              onClick={() => handleSubmit(props.id)}
            >
              <ChatBubbleOutlineIcon id={props.id} /> Comment
            </Button>
          </Grid>
          {props.comments.length >= 0 ? (
            <Accordion className={classes.shadow}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.commentStyle} />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography className={classes.heading}>
                  Read {props.comments.length} Comments
                </Typography>
              </AccordionSummary>
              <Grid className='cardComment'>
                {props.comments.map(card => (
                  <AccordionDetails>
                    <Grid container xs={12} className={classes.gridStyle}>
                      <Grid item xs={4}>
                        <Typography
                          variant='body'
                          color='textSecondary'
                          component='p'
                        >
                          {card.user.username}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant='body'
                          color='textSecondary'
                          component='p'
                        >
                          {card.content}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                ))}
              </Grid>
            </Accordion>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default NewsAndComment;
