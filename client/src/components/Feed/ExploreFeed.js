// Import all relevant packages and components
import React from "react";
import {
  Typography,
  Grid,
  CardMedia,
  Divider,
  CardContent,
  Accordion,
  AccordionSummary
} from "@material-ui/core";
import useNewsStyles from "./styles/useNewsStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./styles/style.css";
import { Link } from "react-router-dom";
import CommentSection from "./components/CommentSection";

// Create the component function and export for use
const ExploreFeed = props => {
  // Call the styles function
  const classes = useNewsStyles();
  // Destructure State and Dispatch from Context

  // Create the JSX for the component
  return (
    <>
      <Grid item className="card" xs={12}>
        <Grid container className="headerContainer">
          <Grid item xs={9} sm={10}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {props.title}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" component="p">
          <span className="authorStyle"> Author:</span>
          <Link to={`/dashboard/${props.authorId}`}>{props.author}</Link>
        </Typography>
        <Divider />
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12} sm={4}>
            <CardMedia
            style={{ height: "190px" }}
              className={"media"}
              image={`https://res.cloudinary.com/astralgnome/image/upload/${props.image}`}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography variant="body" color="textSecondary" component="p">
                {props.post}
              </Typography>
              <a href={props.link} className="hashTagStyle">
                #{props.hashTag}
              </a>
            </CardContent>
            <Divider />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Accordion className={classes.shadow}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.commentStyle} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Read {props.comments.length} Comments
              </Typography>
            </AccordionSummary>
            <CommentSection comments={props.comments} author={props.author} />
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default ExploreFeed;
