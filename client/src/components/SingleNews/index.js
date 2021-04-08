// Import all relevant packages and components
import React from "react";
import {
  Typography,
  Grid,
  CardMedia,
  Divider,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import useSingleStyles from "./useSingleStyles";
import "./style.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";

// Create the component function and export for use
const SingleNews = props => {
  // Call the styles function
  const classes = useSingleStyles();
  const [globalState] = useGlobalContext();
  // Create the JSX for the component
  return (
    <Grid container>
      <Grid item className="card" xs={12}>
        <Grid container className="headerContainer">
          <Grid item xs={9} sm={10}>
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "bold",
              }}
            >
              {props.title}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" component="p">
          <span className="authorStyle"> Author:</span> {props.author}
        </Typography>
        <Divider />
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12} sm={4}>
            <CardMedia
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
            <Grid className="cardComment">
              {props.comments.map((card) => (
                <AccordionDetails>
                  <Grid container xs={12} className={classes.gridStyle}>
                    <Grid item xs={4}>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        component="p"
                      >
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
                      <Typography
                        variant="body"
                        color="textSecondary"
                        component="p"
                      >
                        {card.content}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              ))}
            </Grid>
          </Accordion>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleNews;
