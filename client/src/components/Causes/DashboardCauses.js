// Import all relevant packages and components
import React from "react";
import {
  Typography,
  Grid,
  Divider,
  CardContent,
  Button,
  Dialog,
  ButtonGroup,
  CardMedia
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Edit, ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import "./style.css";
import UpdateCause from "../Forms/UpdateCause/UpdateCause";
import api from "../../utils/api";
import { UPDATE, LOADING } from "../../utils/actions/actions";
import { useAuthTokenStore, useIsAuthenticated } from "../../utils/auth";
import Donate from "../Forms/Donate";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";

// Create the component function and export for use
const DashboardCauses = props => {
  // Create the set and setState from useState
  const [open, setOpen] = React.useState(false);
  // Destructure State and Dispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  // Call useAuth function
  useAuthTokenStore();
  const isAuth = useIsAuthenticated();
  // Create the handleOpen function
  const handleOpen = () => {
    setOpen(true);
  };
  // Create the handleClose function
  const handleClose = () => {
    setOpen(false);
  };
  // Create the handleFollow function
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
  // Create the JSX for the component
  return (
    <Grid item className='card'>
      <Grid container className='headerContainer'>
        <Grid item xs={9}>
          <Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {props.check ? null : props.role === "Organization" ? (
            <Button className='editButton' onClick={handleOpen}>
              <Edit /> Edit
            </Button>
          ) : null}
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
              {props.check ? null : props.role === "Organization" ? (
                <UpdateCause
                  className={"cardPost"}
                  id={props.id}
                  onClose={handleClose}
                />
              ) : (
                <Donate
                  onClose={handleClose}
                  cause={props.id}
                  title={props.title}
                />
              )}
            </Fade>
          </Dialog>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant='body2' color='textSecondary' component='p'>
        <span className='authorStyle'> Org:</span>
        <Link to={`/dashboard/${props.causeId}`}>{props.author}</Link>
      </Typography>
      <Grid container direction='row' spacing={1}>
        <Grid item xs={12}>
          <CardMedia
            style={{ height: "275px" }}
            className={"media"}
            image={`https://res.cloudinary.com/astralgnome/image/upload/${props.image}`}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <CardContent>
            <Typography variant='body2' color='textSecondary'>
              {props.post}
            </Typography>
          </CardContent>
        </Grid>
        {isAuth ? (
          <ButtonGroup style={{ justifyContent: "center" }} fullWidth>
            <Button
              size='large'
              className='styleButton'
              onClick={handleOpen}
              fullWidth
              id={props.id}>
              <i className='fab fa-paypal'></i>
              Support
            </Button>
            <Button
              size='large'
              className='followButton'
              onClick={() => handleFollow(props.id)}
              fullWidth>
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
      </Grid>
    </Grid>
  );
};

export default DashboardCauses;
