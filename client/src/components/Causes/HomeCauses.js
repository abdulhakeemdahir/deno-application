//Import all relevant packages and components
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Divider,
  CardContent,
  CardMedia,
  Button,
  ButtonGroup,
  Dialog,
  Fade,
  Backdrop
} from "@material-ui/core";
import "./style.css";
import { ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import api from "../../utils/api";
import { LOADING, UPDATE } from "../../utils/actions/actions";
import { useAuthTokenStore, useIsAuthenticated } from "../../utils/auth";
import Donate from "../Forms/Donate";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";

//Create the component function and export for use
const HomeCauses = props => {
  // Destructure State and Dispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  const handleFollow = async id => {
    if (globalState.user.role === "Organization") {
      //TODO error message
      console.log("you are an organization");
      return;
    }

    const found = globalState.user.causes.find(cause => cause._id === id);

    if (found) {
      await api.removeUserObjectID(globalState.user._id, {
        causes: id
      });
    } else {
      await api.updateUserObjectID(globalState.user._id, {
        causes: id
      });
    }

    const userInfo = await api.getUser(globalState.user._id);
    await globalDispatch({
      type: LOADING
    });
    await globalDispatch({
      type: UPDATE,
      payload: {
        user: userInfo.data,
        loading: false
      }
    });
  };
  // Call Authentication Store
  useAuthTokenStore();
  // Get User Authentication
  const isAuth = useIsAuthenticated();
  // Create the Dialog state
  const [open, setOpen] = useState(false);
  // Create the handleOpen function for the Dialog Component
  const handleOpen = () => {
    setOpen(true);
  };
  // Create the handleClose function for the Dialog Component
  const handleClose = () => {
    setOpen(false);
  };
  //Create the JSX for the component
  return (
    <Grid item className="card">
      <Grid container className="headerContainer">
        <Grid item xs={9}>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            {props.title}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="body2" color="textSecondary" component="p">
        <span className="authorStyle"> Org:</span>
        <Link to={`/dashboard/${props.causeId}`}>{props.author}</Link>
      </Typography>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <CardMedia
            style={{ height: "275px" }}
            className={"media"}
            image={`https://res.cloudinary.com/astralgnome/image/upload/${props.image}`}
          />
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {props.post}
            </Typography>
          </CardContent>
        </Grid>
        {isAuth ? (
          <ButtonGroup justify="center" fullWidth>
            <Button
              size="large"
              className="styleButton"
              onClick={handleOpen}
              fullWidth
              id={props.id}
            >
              <i class="fab fa-paypal"></i>
              Support
            </Button>
            <Button
              size="large"
              className="followButton"
              onClick={() => handleFollow(props.id)}
              fullWidth
            >
              {globalState.user.causes.find(cause => cause._id === props.id) ? (
                <ThumbDownAlt />
              ) : (
                <ThumbUpAlt />
              )}
              {globalState.user.causes.find(cause => cause._id === props.id)
                ? "unfollow"
                : "follow"}
            </Button>
          </ButtonGroup>
        ) : null}
        <Dialog
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
          fullWidth
        >
          <Fade in={open}>
            <Donate onClose={handleClose} cause={props.id} />
          </Fade>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default HomeCauses;
