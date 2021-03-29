// Import all relevant packages and components
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles(theme => ({
  contentBox: {
    color: "#7f0000",
    background: "#ffcdd2",
    marginTop: "15px",
    padding: "20px"
  },
  buttonStyle: {
    background: "#fff"
  }
}));
// Create the component function and export for use
const AddContent = props => {
  // Call the styles function
  const classes = useStyles();
  // Create the JSX for the component
  return (
    <Grid container className={classes.contentBox}>
      <Link to="/newsfeed">
        <Typography variant="subtitle1">{props.text} </Typography>
      </Link>
    </Grid>
  );
};

export default AddContent;
