import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Grid, ListItem, List } from "@material-ui/core";
import { LinkedIn } from "@material-ui/icons";
import useFooterStyles from "./useFooterStyles";

const Footer = () => {
  const classes = useFooterStyles();
  return (
    <footer>
      <CssBaseline>
        <Grid container className={classes.footerGrid}>
          <Typography variant='body1' className={classes.footerStyle}>
            Built with <span className={classes.heart}>♥︎</span> by:
          </Typography>
          <List className={classes.devList}>
            <a href='https://www.linkedin.com/in/abdulhakeem-dahir-5330b5177/'>
              <ListItem className={classes.heart}>
                <LinkedIn />
                <Typography>Abdulhakeem Dahir</Typography>
              </ListItem>
            </a>
            <a href='https://www.linkedin.com/in/taani-maama-b86583157/'>
              <ListItem className={classes.heart}>
                <LinkedIn />
                <Typography>Taani Maama</Typography>
              </ListItem>
            </a>
            <a href='https://www.linkedin.com/in/daniel-soledad-1834a61b3/'>
              <ListItem className={classes.heart}>
                <LinkedIn />
                <Typography>Daniel Soledad</Typography>
              </ListItem>
            </a>
            <a href='https://www.linkedin.com/in/keenancodes/'>
              <ListItem className={classes.heart}>
                <LinkedIn />
                <Typography>Keenan Reed</Typography>
              </ListItem>
            </a>
          </List>
          <Typography variant='body2' className={classes.footerStyle}>
            Please click a name to view their Linked In. Thank you!
          </Typography>
        </Grid>
      </CssBaseline>
    </footer>
  );
};

export default Footer;
