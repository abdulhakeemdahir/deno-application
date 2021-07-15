//Import all relevant packages and components
import React from "react";
import {
  Typography,
  Grid,
  CardMedia,
  Divider,
  CardContent,
  Button,
  ButtonGroup
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";

const About = props => {
  //Call the styles function
  // const classes = aboutStyles();
  //Create the Dialog state
  // const [open, setOpen] = React.useState(false);
  // Create the handleOpen function for the Dialog Component
  const [globalState] = useGlobalContext();
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // // Create the handleClose function for the Dialog Component
  // const handleClose = () => {
  //   setOpen(false);
  // };
  //Create the JSX for the component
  return (
    <Grid item className='card'>
      <Grid container className='headerContainer'>
        <Grid item xs={9}>
          <Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
            {props.title}
          </Typography>
        </Grid>
      </Grid>
      <CardMedia
        style={{ height: "275px" }}
        className='media'
        image={`https://res.cloudinary.com/astralgnome/image/upload/${props.profileImg}`}
      />
      <Grid container direction='row' spacing={1}>
        <Grid item xs={12} sm={12}>
          <ButtonGroup fullWidth>
            {props.role === "Organization" ? (
              <Button size='large' className='aboutButton' fullWidth>
                <i class='fab fa-paypal'></i>
                <span> Support</span>
              </Button>
            ) : null}
            {props.id === globalState.user._id ? null : (
              <Button size='large' className='followButton' fullWidth>
                <ThumbUpAltIcon /> Follow
              </Button>
            )}
          </ButtonGroup>

          <CardContent>
            <Typography
              variant='body2'
              style={{ fontWeight: "bold" }}
              color='textSecondary'>
              {props.orgName}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {`${props.bio} stuff`}
            </Typography>
          </CardContent>
          <Divider />
          {props.role === "Organization" ? (
            <CardContent>
              <Typography
                className='borderStyle'
                variant='body2'
                color='textSecondary'>
                <span className='authorStyle'> Website:</span> {props.website}
              </Typography>
              <Typography
                className='borderStyle'
                variant='body2'
                color='textSecondary'>
                <span className='authorStyle'> Address:</span> {props.address}
              </Typography>
              <Typography
                className='borderStyle'
                variant='body2'
                color='textSecondary'>
                <span className='authorStyle'> Phone:</span> {props.phone}
              </Typography>
              <Typography
                className='borderStyle'
                variant='body2'
                color='textSecondary'>
                <span className='authorStyle'> E-mail:</span> {props.email}
              </Typography>
            </CardContent>
          ) : (
            <CardContent>
              <Typography
                className='borderStyle'
                variant='body2'
                color='textSecondary'>
                <span className='authorStyle'> Name </span>{" "}
                {`${props.firstName} ${props.lastname}`}
              </Typography>
              <Typography
                className='borderStyle'
                variant='body2'
                color='textSecondary'>
                <span className='authorStyle'> Username:</span> {props.username}
              </Typography>
              <Typography
                className='borderStyle'
                variant='body2'
                color='textSecondary'>
                <span className='authorStyle'> E-mail:</span> {props.email}
              </Typography>
            </CardContent>
          )}
          <NavLink to='/analytics'>
            <Button size='large' className='analyticsButton' fullWidth>
              <EqualizerIcon /> Analytics
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default About;
