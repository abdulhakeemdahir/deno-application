import React from "react";

import {
  Typography,
  Grid,
  CardMedia,
  Divider,
  CardContent
} from "@material-ui/core";

import "./style.css";
import useSingleStyles from "./useSingleStyles";

const SingleNews = props => {
  const classes = useSingleStyles();

  return (
    <Grid container>
      <Grid item className="card" xs={12}>
        <Grid container className="headerContainer">
          <Grid item xs={9} sm={10}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
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
            <CardMedia className={"media"} image={props.image} />
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
          <Typography className={classes.heading}>
            <br />
            There are {props.comments.length} Comments
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="cardPost">
        {props.comments.map(card => (
          <>
            <Grid container xs={12} className={classes.gridStyle}>
              <Grid item xs={4}>
                <Typography variant="body" color="textSecondary" component="p">
                  {card.author}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body" color="textSecondary" component="p">
                  {card.post}
                </Typography>
              </Grid>
            </Grid>
          </>
        ))}
      </Grid>
    </Grid>
  );
};

export default SingleNews;
