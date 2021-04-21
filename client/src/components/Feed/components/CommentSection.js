// Import all relevant packages and components
import React from "react";
import { Typography, Grid, AccordionDetails } from "@material-ui/core";
import useNewsStyles from "../styles/useNewsStyles";
import "../styles/style.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";

const CommentSection = ({ comments }) => {
  const classes = useNewsStyles();

  const [globalState] = useGlobalContext();

  return (
    <Grid className="cardComment">
      {comments.map(card => (
        <AccordionDetails>
          <Grid container xs={12} className={classes.gridStyle}>
            <Grid item xs={4}>
              <Typography variant="body" color="textSecondary" component="p">
                <Link
                  to={
                    card.user._id === globalState.user._id
                      ? "/dashboard"
                      : `/dashboard/${card.user._id}`
                  }
                >
                  {card.user.username}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body" color="textSecondary" component="p">
                {card.content}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      ))}
    </Grid>
  );
};

export default CommentSection;
