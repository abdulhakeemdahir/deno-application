import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

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

const AddContent = props => {
  const classes = useStyles();

  return (
    <Grid container className={classes.contentBox}>
      <Link to="/newsfeed">
        <Typography variant="subtitle1">{props.text} </Typography>
      </Link>
    </Grid>
  );
};

export default AddContent;
