// Import all relevant packages and components
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Grid,
  CssBaseline,
  IconButton,
} from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Nav from "../../../components/Navigation";
import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import { TabPanel,useWindowDimensions } from "../../utils";
import EditIcon from "@material-ui/icons/Edit";
import { Payment, Security, Settings } from "@material-ui/icons";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
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

  const [globalState, globalDispatch] = useGlobalContext();



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

                <Grid style={{ padding: "0px 20px 0px 0px" }} item xs={3} sm={3} className="card-container">
                  
                  <Grid>
                    <List>
                      <ListItem button>
                      <Settings />
                        <ListItemText style={{paddingLeft: "10px"}} primary="General Account Settings" />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid>
                    <List>
                      <ListItem button>
                        <Security />
                        <ListItemText style={{paddingLeft: "10px"}} primary="Security and Login" />
                      </ListItem>
                    </List>
                  </Grid>

                  <Divider />

                  <Grid>
                    <List>
                      <ListItem button>
                      <Payment />
                        <ListItemText style={{paddingLeft: "10px"}} primary="PayPal" />
                      </ListItem>
                    </List>
                  </Grid>
                  
                </Grid>
                <Divider orientation="vertical" />

                <Grid style={{ paddingRight: "0px" }} item xs={3} sm={3} className="card-container">
                  <List style={{ padding: "0px 0px 0px 12px" }} component="nav">
                    
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Profile Image:" />
                    </ListItem>
                    <Divider />
                    
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Bio:" />
                    </ListItem>
                    <Divider />
                    
                    {globalState.user.role === "Organization" && 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Org Name:" />
                    </ListItem>}
                    
                    {globalState.user.role === "Organization" && <Divider />}
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Username:" />
                    </ListItem>
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Password:" />
                    </ListItem>
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Email:" />
                    </ListItem>
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Phone:" />
                    </ListItem>
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Website:" />
                    </ListItem>
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Address:" />
                    </ListItem>
                    <Divider />
 
                  </List>
                </Grid>

                <Grid style={{ paddingLeft: "0px" }} item xs={5} sm={5} className="card-container">
                  <List style={{ padding: "0px 0px 0px 0px" }} component="nav">
                    
                    {
                      //todo If user role is org then render orgname otherwise render nothing .
                    }

                    
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px"}} primary={`${globalState.user.profileImg ? globalState.user.profileImg : "- - -"}`} />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />

                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px"}} primary={`${globalState.user.bio ? globalState.user.bio : "- - -"}`} />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
                    
                    {globalState.user.role === "Organization" && 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px"}} primary={`${globalState.user.orgName}`} />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>}
                    
                    {globalState.user.role === "Organization" && <Divider />}
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary={`${globalState.user.username}`} />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="**********" />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText className="boldify" style={{ marginTop: "15px", marginBottom: "15px" }} primary={`${globalState.user.email ? globalState.user.email : "- - -"}`} />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary={`${globalState.user.phoneNumber ? globalState.user.phoneNumber : "- - -"}`} />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary={`${globalState.user.website ? globalState.user.website : "- - -"}`} />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary={`${globalState.user.address ? globalState.user.address : "- - -"}`} />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                  </List>
                </Grid>
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
