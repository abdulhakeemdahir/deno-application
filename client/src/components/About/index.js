//Import all relevant packages and components
import React from "react";
import { Image } from "cloudinary-react";
import {
  Typography,
  Grid,
  CardMedia,
  Divider,
  CardContent,
  Button,
  ButtonGroup,
  Dialog
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Edit } from "@material-ui/icons";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "./style.css";
import UpdateUser from "../Forms/UpdateUser/UpdateUser";
import UpdateOrg from "../Forms/UpdateOrg/UpdateOrg";
import { NavLink } from "react-router-dom";
// Create a useStyles Material UI component for styling
import aboutStyles from "./aboutStyles";

const About = props => {
  //Call the styles function
  const classes = aboutStyles();
  //Create the Dialog state
  const [open, setOpen] = React.useState(false);
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
        <Grid item xs={3}>
          {props.check ? null : (
            <Button className="editButton" onClick={handleOpen}>
              <Edit /> Edit
            </Button>
          )}
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
              {props.role === "Personal" ? (
                <UpdateUser onClose={handleClose} />
              ) : (
                <UpdateOrg onClose={handleClose} />
              )}
            </Fade>
          </Dialog>
        </Grid>
      </Grid>
      <CardMedia
        className="media"
        image={`https://res.cloudinary.com/astralgnome/image/upload/${props.profileImg}`}
      />
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12} sm={12}>
          <ButtonGroup fullWidth>
            {props.role === "Organization" && props.user ? (
              <Button size="large" className="aboutButton" fullWidth>
                <i class="fab fa-paypal"></i>
                <span> Support</span>
              </Button>
            ) : null}
            <Button size="large" className="followButton" fullWidth>
              <ThumbUpAltIcon /> Follow
            </Button>
          </ButtonGroup>

          <CardContent>
            <Typography
              variant="body2"
              style={{
                fontWeight: "bold"
              }}
              color="textSecondary"
            >
              {props.orgName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {props.bio}
            </Typography>
          </CardContent>
          <Divider />
          {props.role === "Organization" ? (
            <CardContent>
              <Typography
                className="borderStyle"
                variant="body2"
                color="textSecondary"
              >
                <span className="authorStyle"> Website:</span> {props.website}
              </Typography>
              <Typography
                className="borderStyle"
                variant="body2"
                color="textSecondary"
              >
                <span className="authorStyle"> Address:</span> {props.address}
              </Typography>
              <Typography
                className="borderStyle"
                variant="body2"
                color="textSecondary"
              >
                <span className="authorStyle"> Phone:</span> {props.phone}
              </Typography>
              <Typography
                className="borderStyle"
                variant="body2"
                color="textSecondary"
              >
                <span className="authorStyle"> E-mail:</span> {props.email}
              </Typography>
            </CardContent>
          ) : (
            <CardContent>
              <Typography
                className="borderStyle"
                variant="body2"
                color="textSecondary"
              >
                <span className="authorStyle"> Name </span>{" "}
                {`${props.firstName} ${props.lastname}`}
              </Typography>
              <Typography
                className="borderStyle"
                variant="body2"
                color="textSecondary"
              >
                <span className="authorStyle"> Username:</span> {props.username}
              </Typography>
              <Typography
                className="borderStyle"
                variant="body2"
                color="textSecondary"
              >
                <span className="authorStyle"> E-mail:</span> {props.email}
              </Typography>
            </CardContent>
          )}
          <NavLink to="/analytics">
            <Button size="large" className="analyticsButton" fullWidth>
              <EqualizerIcon /> Analytics
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default About;
