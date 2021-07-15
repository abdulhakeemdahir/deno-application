// Import all relevant packages and components
import React from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import PropTypes from "prop-types";

import Nav from "../../../components/Navigation";
import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import Results from "./Results";

import { TabPanel } from "../../utils";

// import NProgress from "nprogress";

// Create TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
// Create the component function and export for use
const Search = () => {
  // Create the JSX for the component
  return (
    <main className='Main'>
      <CssBaseline>
        <Nav />
        <Grid
          container
          direction='row'
          justifyContent='center'
          className={"container"}
          xs={12}
          lg={10}
          xl={8}>
          <Results />
        </Grid>
        <Gradient />
        <Footer />
      </CssBaseline>
    </main>
  );
};

export default Search;
