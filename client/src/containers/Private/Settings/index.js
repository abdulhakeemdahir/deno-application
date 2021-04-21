// Import all relevant packages and components
import React, { useEffect } from "react";
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

                <Grid style={{ paddingRight: "0px" }} item xs={2} sm={2} className="card-container">
                  <List style={{ padding: "0px 0px 0px 12px" }} component="nav">
                    
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="Organization Name:" />
                    </ListItem>
                    <Divider />
 
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
 
                  </List>
                </Grid>

                <Grid style={{ paddingLeft: "0px" }} item xs={6} sm={6} className="card-container">
                  <List style={{ padding: "0px 0px 0px 0px" }} component="nav">
                    
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px"}} primary="Cogswell Cogs" />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="ElJefe99" />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="ILovePizza99" />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText className="boldify" style={{ marginTop: "15px", marginBottom: "15px" }} primary="therealmrcogswell@gmail.com" />
                      <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </ListItem>
                    
                    <Divider />
 
                    <ListItem>
                      <ListItemText style={{ marginTop: "15px", marginBottom: "15px" }} primary="206123456" />
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
