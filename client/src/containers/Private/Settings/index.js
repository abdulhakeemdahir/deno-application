// Import all relevant packages and components
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Grid,
  CssBaseline,
  IconButton,
  CardMedia,
  Fade,
  Dialog,
  Backdrop,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import "./style.css";
import Nav from "../../../components/Navigation";
import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import EditIcon from "@material-ui/icons/Edit";
import {
  MenuBook,
  Payment,
  Person,
  Security,
  Settings
} from "@material-ui/icons";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import updateFormStyles from "../../../components/Forms/useStyles/formStyles";
import SettingsUpdateForm from "./Forms";
import GasComponentData from "./Components/GasComponentData";
import SalComponentData from "./Components/SalComponentData";
import PayComponentData from "./Components/PayComponentData";
import { makeStyles } from "@material-ui/styles";
// Create TabPanel?

const SettingsPage = () => {
  // theme and matches are used to help enable phone view selective rendering
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const useStyles = makeStyles({
    tab: {
      padding: "10px 0px 10px 7px"
    }
  });

  const tabClass = useStyles();

  const [globalState] = useGlobalContext();

  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");

  // Call the styles function
  const classes = updateFormStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = action => {
    setOpen(true);
    setAction(action);
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleButton = index => {
    setToggleState(index);
  };

  return (
    <div className='Main'>
      <CssBaseline>
        <Nav />
        <Grid
          container
          direction='row'
          justifyContent='center'
          className={"container"}
          xs={12}
          lg={10}
          xl={8}
          style={{ paddingTop: "0px", marginTop: "0px" }}>
          <>
            <Grid container spacing={!matches ? 1 : 0}>
              {(() => {
                if (!matches)
                  return (
                    <Grid item xs={12} sm={3} className='card-container'>
                      <Typography variant='subtitle2'>SETTINGS</Typography>
                    </Grid>
                  );
              })()}

              <Grid item xs={12} sm={8} className='card-container'>
                <Typography variant={!matches ? "subtitle2" : ""}>
                  {(() => {
                    if (toggleState === 1 && !matches) {
                      return "GENERAL ACCOUNT SETTINGS";
                    } else if (toggleState === 2 && !matches) {
                      return "SECURITY AND LOGIN";
                    } else if (toggleState === 3 && !matches) {
                      return "PAYPAL";
                    }
                  })()}
                </Typography>
              </Grid>

              <Grid
                style={
                  !matches ? { paddingRight: "20px" } : { paddingRight: "0px" }
                }
                item
                xs={12}
                sm={3}
                className='card-container'>
                <Grid>
                  <List>
                    <ListItem
                      className={tabClass.tab}
                      button
                      onClick={() => toggleButton(1)}
                      style={
                        toggleState === 1
                          ? { backgroundColor: "#fbe0ff" }
                          : { backgroundColor: "transparent" }
                      }>
                      <Settings />
                      <ListItemText
                        style={{ paddingLeft: "10px" }}
                        primary='General Account Settings'
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid>
                  <List>
                    <ListItem
                      className={tabClass.tab}
                      button
                      onClick={() => toggleButton(2)}
                      style={
                        toggleState === 2
                          ? { backgroundColor: "#fbe0ff" }
                          : { backgroundColor: "transparent" }
                      }>
                      <Security />
                      <ListItemText
                        style={{ paddingLeft: "10px" }}
                        primary='Security and Login'
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Divider />

                <Grid>
                  <List>
                    <ListItem
                      className={tabClass.tab}
                      button
                      onClick={() => toggleButton(3)}
                      style={
                        toggleState === 3
                          ? { backgroundColor: "#fbe0ff" }
                          : { backgroundColor: "transparent" }
                      }>
                      <Payment />
                      <ListItemText
                        style={{ paddingLeft: "10px" }}
                        primary='PayPal'
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Divider />

                {/* Profile Picture */}
                {(() => {
                  if ((matches === true && toggleState === 1) || !matches)
                    return (
                      <Grid style={{ marginTop: "25px" }}>
                        <Divider />

                        <List>
                          <ListItem
                            style={{ marginBottom: "10px", padding: "0px" }}>
                            <Person />
                            <ListItemText
                              style={{ paddingLeft: "10px" }}
                              primary='Profile Picture'
                            />
                            <IconButton
                              className='editButton'
                              onClick={() => handleOpen("profileImg")}
                              edge='end'
                              aria-label='edit'>
                              <EditIcon />
                            </IconButton>
                          </ListItem>
                          <CardMedia
                            style={{ height: "292px" }}
                            className='media'
                            image={`https://res.cloudinary.com/astralgnome/image/upload/${globalState.user.profileImg}`}
                          />
                        </List>
                        <Divider />
                      </Grid>
                    );
                })()}

                {/* Bio  */}
                {(() => {
                  if ((matches === true && toggleState === 1) || !matches)
                    return (
                      <Grid style={{ marginTop: "25px" }}>
                        <Divider />
                        <List>
                          <ListItem
                            style={{ marginBottom: "10px", padding: "0px" }}>
                            <MenuBook />
                            <ListItemText
                              style={{ paddingLeft: "10px" }}
                              primary={`${globalState.user.username}'s Bio`}
                            />

                            <IconButton
                              className='editButton'
                              onClick={() => handleOpen("bio")}
                              edge='end'
                              aria-label='edit'>
                              <EditIcon />
                            </IconButton>
                          </ListItem>
                          <ListItemText
                            primary={`${
                              globalState.user.bio
                                ? globalState.user.bio
                                : "Stuff about you!"
                            }`}
                          />
                        </List>
                        <Divider />
                      </Grid>
                    );
                })()}
              </Grid>

              <Divider orientation={matches ? "horizontal" : "vertical"} />

              <Grid
                style={{
                  marginTop: "0px",
                  paddingTop: "0px",
                  paddingRight: "0px"
                }}
                item
                xs={12}
                sm={8}
                className='card-container'>
                {(() => {
                  if (toggleState === 1) {
                    return <GasComponentData handleOpen={handleOpen} />;
                  } else if (toggleState === 2) {
                    return <SalComponentData handleOpen={handleOpen} />;
                  } else if (toggleState === 3) {
                    return <PayComponentData handleOpen={handleOpen} />;
                  }
                })()}
              </Grid>

              <Dialog
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}>
                <Fade in={open}>
                  <SettingsUpdateForm onClose={handleClose} action={action} />
                </Fade>
              </Dialog>
            </Grid>
          </>
        </Grid>
        <Gradient />
        <Footer />
      </CssBaseline>
    </div>
  );
};
export default SettingsPage;
