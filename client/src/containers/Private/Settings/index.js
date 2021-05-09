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
} from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Nav from "../../../components/Navigation";
import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import { TabPanel, useWindowDimensions } from "../../utils";
import EditIcon from "@material-ui/icons/Edit";
import { MenuBook, Payment, Person, Security, Settings } from "@material-ui/icons";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import updateFormStyles from "../../../components/Forms/useStyles/formStyles";
import api from "../../../utils/api";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import SettingsUpdateForm from "./Forms";
// Create TabPanel

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
// Create the component function and export for use
const SettingsPage = () => {
  // Call the Window Width function
  const { width } = useWindowDimensions();
  // Create the JSX for the component
  const [userState, userDispatch] = useUserContext();
  const [globalState, globalDispatch] = useGlobalContext();

  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");

  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [stateUpdate, setStateUpdate] = useState({
    firstName: "",
    lastname: "",
    bio: "",
  });

  //*Associated with cloudinary
  const upDateUser = async (update) => {
    const updateUser = await api.settingsPage(userState._id, update);
    console.log(updateUser);
  };
  // Call the styles function
  const classes = updateFormStyles();
  // Create the handleFileInputChange function
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (action) => {
    setOpen(true);
    setAction(action);
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleButton = (index) => {
    setToggleState(index);
  };

  return (
    <div className="Main">
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
          {width > 600 ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={3} className="card-container">
                  <Typography variant="subtitle2">SETTINGS</Typography>
                </Grid>

                <Grid item xs={9} sm={9} className="card-container">
                  <Typography variant="subtitle2">GENERAL ACCOUNT SETTINGS</Typography>
                </Grid>

                <Grid
                  style={{ padding: "0px 20px 0px 0px" }}
                  item
                  xs={3}
                  sm={3}
                  className="card-container"
                >
                  <Grid>
                    <List>
                      <ListItem
                        button
                        onClick={() => toggleButton(1)}
                        style={
                          toggleState === 1
                            ? {backgroundColor: "#fbe0ff" }
                            : {backgroundColor: "transparent" }
                        }
                      >
                        <Settings />
                        <ListItemText 
                        style={{ paddingLeft: "10px" }}
                        primary="General Account Settings" />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid>
                    <List>
                      <ListItem
                        button
                        onClick={() => toggleButton(2)}
                        style={
                          toggleState === 2
                            ? {backgroundColor: "#fbe0ff" }
                            : {backgroundColor: "transparent" }
                        }
                      >
                        <Security />
                        <ListItemText 
                        style={{ paddingLeft: "10px" }}
                        primary="Security and Login" />
                      </ListItem>
                    </List>
                  </Grid>

                  <Divider />

                  <Grid>
                    <List>
                      <ListItem
                        button
                        onClick={() => toggleButton(3)}
                        style={
                          toggleState === 3
                            ? {backgroundColor: "#fbe0ff" }
                            : {backgroundColor: "transparent" }
                        }
                      >
                        <Payment />
                        <ListItemText 
                        style={{ paddingLeft: "10px" }}
                        primary="PayPal" />
                      </ListItem>
                    </List>
                  </Grid>

                  <Divider />

                  {/* Profile Picture  */}

                  <Grid style={{ marginTop: "25px" }}>
                    <Divider />

                    <List>
                      <ListItem>
                        <Person />
                        <ListItemText style={{ paddingLeft: "10px" }} primary="Profile Picture" />
                        <IconButton
                          className="editButton"
                          onClick={() => handleOpen("profileImg")}
                          edge="end"
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItem>
                      <CardMedia
                        style={{ height: "292px" }}
                        className="media"
                        image={`https://res.cloudinary.com/astralgnome/image/upload/${globalState.user.profileImg}`}
                      />
                    </List>
                    <Divider />
                  </Grid>

                  {/* Bio  */}

                  <Grid style={{ marginTop: "25px" }}>
                    <Divider />
                    <List>
                      <ListItem style={{ marginBottom: "10px" }}>
                        <MenuBook />
                        <ListItemText
                          style={{ paddingLeft: "10px" }}
                          primary={`${globalState.user.username}'s Bio`}
                        />

                        <IconButton
                          className="editButton"
                          onClick={() => handleOpen("bio")}
                          edge="end"
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItem>
                      <ListItemText
                        primary={`${
                          globalState.user.bio ? globalState.user.bio : "Stuff about you!"
                        }`}
                      />
                    </List>
                    <Divider />
                  </Grid>
                </Grid>

                <Divider orientation="vertical" />

                <Grid
                  style={{ marginTop: "0px", paddingTop: "0px", paddingRight: "0px" }}
                  item
                  xs={8}
                  sm={8}
                  className="card-container"
                >
                  <List style={{ padding: "0px 0px 0px 12px" }} component="nav">
                    {/* Org Name  */}

                    {globalState.user.role === "Organization" && (
                      <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <ListItemText primary="Org Name:" />
                        <ListItemText primary={`${globalState.user.orgName}`} />
                        <IconButton
                          className="editButton"
                          onClick={() => handleOpen("orgName")}
                          edge="end"
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItem>
                    )}

                    {globalState.user.role === "Organization" && <Divider />}

                    {/* Username  */}

                    <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <ListItemText primary="Username:" />
                      <ListItemText primary={`${globalState.user.username}`} />
                      <IconButton
                        className="editButton"
                        onClick={() => handleOpen("username")}
                        edge="end"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />

                    {/* Password  */}

                    <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <ListItemText primary="Password:" />
                      <ListItemText primary="**********" />
                      <IconButton
                        className="editButton"
                        onClick={() => handleOpen("password")}
                        edge="end"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />

                    {/* Email  */}

                    <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <ListItemText primary="Email:" />
                      <ListItemText
                        className="boldify"
                        primary={`${globalState.user.email ? globalState.user.email : "- - -"}`}
                      />
                      <IconButton
                        className="editButton"
                        onClick={() => handleOpen("email")}
                        edge="end"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />

                    {/* Phone  */}

                    <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <ListItemText primary="Phone:" />
                      <ListItemText
                        primary={`${
                          globalState.user.phoneNumber ? globalState.user.phoneNumber : "- - -"
                        }`}
                      />
                      <IconButton
                        className="editButton"
                        onClick={() => handleOpen("phoneNumber")}
                        edge="end"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />

                    {/* Website  */}

                    <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <ListItemText primary="Website:" />
                      <ListItem button style={{ justifyContent: "center", fontSize: "1.3em" }}>
                        <a href={`${globalState.user.website}`} target="_blank" rel="noreferrer">
                          {`${globalState.user.website ? globalState.user.website : "- - -"}`}
                        </a>
                      </ListItem>
                      <IconButton
                        className="editButton"
                        onClick={() => handleOpen("website")}
                        edge="end"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />

                    {/* Addy  */}

                    <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <ListItemText primary="Address:" />
                      <ListItemText
                        primary={`${globalState.user.address ? globalState.user.address : "- - -"}`}
                      />
                      <IconButton
                        className="editButton"
                        onClick={() => handleOpen("address")}
                        edge="end"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </List>
                </Grid>

                <Dialog
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <SettingsUpdateForm onClose={handleClose} action={action} />
                  </Fade>
                </Dialog>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Gradient />
        <Footer />
      </CssBaseline>
    </div>
  );
};
export default SettingsPage;
