import { Typography, Grid, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo@2x.png";
import useWelcomeStyles from "./useWelcomeStyles";

const Welcome = () => {
  const classes = useWelcomeStyles();

  return (
    <Grid item className={classes.welcomeContainer} md={6} xs={12}>
      <figure className={classes.logoContainer}>
        <img src={Logo} alt='dono-logo' className={classes.logo} />
      </figure>
      <Typography variant='h3' color='primary' style={{ fontWeight: "100" }}>
        Welcome to Dono
      </Typography>
      <Typography variant='h6' className={classes.bgstyle}>
        Where Giving is a Social Experience
      </Typography>
      <Typography variant='body2' color='initial' style={{ margin: "1em" }}>
        Please Log In/Sign up to create content! Or check out the good deeds.
      </Typography>
      <NavLink key='explore' to='/explore'>
        <Button variant='outlined' color='secondary'>
          <span className='linkStyle'>Explore</span>
        </Button>
      </NavLink>
    </Grid>
  );
};

export default Welcome;
