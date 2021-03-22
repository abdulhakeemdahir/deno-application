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
	TextField,
	Button,
	Dialog,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./style.css";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightBold,
		color: "#e57373",
	},
	shadow: {
		boxShadow: "none",
		// background: "#f7f7f7",
		borderRadius: "0px !important",
		width: "100%",
	},
	commentStyle: {
		backgroundColor: "#e57373",
		color: "white",
		borderRadius: "50px",
	},
	gridStyle: {
		borderBottom: "1px dashed #e7e7e7",
		paddingBottom: "2px",
	},
	selectEmpty: {
		// marginTop: theme.spacing(2),
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
		// marginTop: "10px",
		borderRadius: "0px",
	},
	inputMargin: {
		// margin: "5px",
	},
}));

export default function NewsAndComment(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
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
          <Grid item xs={12} sm={8}>
            <TextField
              id="post"
              label="Post a Comment"
              variant="filled"
              size="small"
              multiline
              rowsMax={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button size="small" className={classes.styleMain} fullWidth>
              <ChatBubbleOutlineIcon /> Comment
            </Button>
          </Grid>
          {props.comments.length <= 0 ? (
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
                        {card.author}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        component="p"
                      >
                        {card.post}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
                ))}
              </Grid>
            </Accordion>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
