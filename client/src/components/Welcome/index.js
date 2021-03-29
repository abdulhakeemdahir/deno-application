import { Typography, Grid, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Logo from "../images/logo@2x.png";
import useWelcomeStyles from "./useWelcomeStyles";

const Welcome = () => {
  const classes = useWelcomeStyles();

  return (
    <Grid item align="center">
      <img src={Logo} alt="logo" style={{ height: "50px", width: "auto" }} />
      <Typography variant="h3" color="primary" style={{ fontWeight: "100" }}>
        Welcome to Dono
      </Typography>
      <Typography variant="h6" className={classes.bgstyle}>
        Where Giving is a Social Experience
      </Typography>
      <Typography variant="body2" color="default">
        Please Log In, otherwise, please sign up! Otherwise you can go and
        explore.
      </Typography>
      <NavLink key="explore" to="/explore">
        <Button variant="outlined" color="secondary">
          <span className="linkStyle">Explore</span>
        </Button>
      </NavLink>
    </Grid>
  );
};

export default Welcome;
