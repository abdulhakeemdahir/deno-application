import React from "react";
import {
	Typography,
	Grid,
	Divider,
	CardContent,
	CardMedia,
	Button,
	ButtonGroup,
	Dialog,
	Fade,
	Backdrop,
	TextField,
} from "@material-ui/core";
//import CreditCardIcon from "@material-ui/icons/CreditCard";
import "./style.css";
import { ThumbUpAlt } from "@material-ui/icons";
import api from "../../utils/api";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import { USER_LOADING, UPDATE_USER } from "../../utils/actions/actions";

import { useAuthTokenStore, useIsAuthenticated } from "../../utils/auth";
import Donate from "../Forms/Donate/Donate";
import { Link } from "react-router-dom";

export default function Causes(props) {
	const [userState, userDispatch] = useUserContext();
	const handleFollow = async id => {
		if (userState.role === "Organization") {
			//TODO error message
			console.log("you are an organization");
			return;
		}

		const checkIfLiked = await api.findIfUserLikesCause(userState._id, id);

		if (checkIfLiked.data) {
			//TODO error message you like this already
			console.log("sorry");
			return;
		}

		await api.updateUserObjectID(userState._id, {
		causes: id,
		});
		const userInfo = await api.getUser(userState._id);

		await userDispatch({ type: USER_LOADING });

		await userDispatch({
			type: UPDATE_USER,
			payload: {
				...userInfo.data,
				loading: false,
			},
		});
	};

	useAuthTokenStore();

	const isAuth = useIsAuthenticated();

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
    <Grid item className="card">
      <Grid container className="headerContainer">
        <Grid item xs={9}>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            {props.title}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" component="p">
          <span className="authorStyle"> Org:</span>
          <Link to={`/dashboard/${props.causeId}`}>{props.author}</Link>
        </Typography>
      <Divider />
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <CardMedia className={"media"} image={props.image} />
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {props.post}
            </Typography>
          </CardContent>
        </Grid>
        {isAuth ? (
          <ButtonGroup justify="center" fullWidth>
            <Button
              size="large"
              className="styleButton"
              onClick={handleOpen}
              fullWidth
              id={props.id}
            >
              <i class="fab fa-paypal"></i>
              Support
            </Button>
            <Button
              size="large"
              className="followButton"
              onClick={() => handleFollow(props.id)}
              fullWidth
            >
              <ThumbUpAlt /> Follow
            </Button>
          </ButtonGroup>
        ) : null}
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
          fullWidth
        >
          <Fade in={open}>
            <Donate onClose={handleClose} cause={props.id}/>
          </Fade>
        </Dialog>
      </Grid>
    </Grid>
  );
}
