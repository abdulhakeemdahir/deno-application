import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    margin: ".6rem"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    // backgroundColor: red[500],
    ":hover": { cursor: "pointer" }
  }
}));

export const UserCard = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const history = useHistory();

  return (
    <Card className={classes.root} fullWidth>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {props?.firstName?.charAt(0) + props?.lastname?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label='View Profile'>
            <MoreVertIcon />
          </IconButton>
        }
        title={props?.username}
        onClick={() => history.push(`/dashboard/${props._id}`)}
      />
      {props.profileImg && (
        <CardMedia
          className={classes.media}
          image={`https://res.cloudinary.com/astralgnome/image/upload/${props.profileImg}`}
          title='Paella dish'
        />
      )}
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {props?.bio}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Posts: {props?.posts?.length}
        </Typography>
        {props.causes && (
          <Typography variant='body2' color='textSecondary' component='p'>
            Causes: {props?.causes?.length}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

// export default UserCard;
