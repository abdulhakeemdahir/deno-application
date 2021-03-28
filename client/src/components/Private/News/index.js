import React, { useState } from "react";

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
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Edit } from "@material-ui/icons";

import "./style.css";
import UpdatePost from "../../Forms/UpdatePost/UpdatePost";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import { useGuessContext } from "../../../utils/GlobalStates/GuessContext";
import api from "../../../utils/api";
import {
	UPDATE_USER,
	USER_LOADING,
	ADD_GUESS_USER,
	USER_GUESS_LOADING,
} from "../../../utils/actions/actions";

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

export default function News(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const [userState, userDispatch] = useUserContext();

	const [guessState, guessDispatch] = useGuessContext();

	const [commentState, setCommentState] = useState({
		content: "",
	});

	const handleChange = function(event) {
		console.log("you are here");
		const { name, value } = event.target;
		setCommentState({
			...commentState,
			[name]: value,
		});
	};

	const handleSubmit = async id => {
		try {
			console.log("you are here");
			const comment = {
				...commentState,
				user: userState._id,
				post: id,
			};

			const { data } = await api.createComments(comment);

			await api.updateObjectID(id, { comments: data._id });

			const userInfo = await api.getUser(userState._id);

			await userDispatch({ type: USER_LOADING });

			await userDispatch({
				type: UPDATE_USER,
				payload: {
					...userInfo.data,
					loading: false,
				},
			});

			if (guessState._id) {
				const guessInfo = await api.getUser(guessState._id);

				await guessDispatch({ type: USER_GUESS_LOADING });

				await guessDispatch({
					type: ADD_GUESS_USER,
					payload: {
						...guessInfo.data,
						loading: false,
					},
				});
			}
			clearState();
		} catch (err) {}
	};

	const clearState = () => {
		setCommentState({
			content: "",
		});
		return;
	};

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
          <Grid item xs={3} sm={2}>
            {props.check ? null : (
              <Button className="editButton" onClick={handleOpen}>
                <Edit /> Edit
              </Button>
            )}
            <Dialog
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <UpdatePost
                  className={"cardPost"}
                  id={props.id}
                  onClose={handleClose}
                />
              </Fade>
            </Dialog>
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
              {
                // <a href={props.link} className="hashTagStyle">
                //   #{props.hashTag}
                // </a>
              }
            </CardContent>
            <Divider />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={12} sm={8}>
            <TextField
              name="content"
              value={commentState.content}
              onChange={handleChange}
              id={props.id}
              label="Post a Comment"
              variant="filled"
              size="small"
              multiline
              rowsMax={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              size="small"
              id={props.id}
              className={classes.styleMain}
              fullWidth
              onClick={() => handleSubmit(props.id)}
            >
              <ChatBubbleOutlineIcon id={props.id} /> Comment
            </Button>
          </Grid>
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
                        {card.user.firstName}
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
    </>
  );
}
