//Import all relevant packages and components
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
} from "@material-ui/core";
import "./style.css";
import { ThumbUpAlt } from "@material-ui/icons";
import api from "../../utils/api";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import { USER_LOADING, UPDATE_USER } from "../../utils/actions/actions";
import { useAuthTokenStore, useIsAuthenticated } from "../../utils/auth";
import Donate from "../Forms/Donate/Donate";
//Create the component function and export for use
export default function Causes(props) {
	// Destructure State and Dispatch from Context
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

		await userDispatch({
			type: USER_LOADING,
		});

		await userDispatch({
			type: UPDATE_USER,
			payload: {
				...userInfo.data,
				loading: false,
			},
		});
	};
	// Call Authentication Store
	useAuthTokenStore();
	// Get User Authentication
	const isAuth = useIsAuthenticated();
	// Create the Dialog state
	const [open, setOpen] = React.useState(false);
	// Create the handleOpen function for the Dialog Component
	const handleOpen = () => {
		setOpen(true);
	};
	// Create the handleClose function for the Dialog Component
	const handleClose = () => {
		setOpen(false);
	};
	//Create the JSX for the component
	return (
		<Grid item className="card">
			<Grid container className="headerContainer">
				<Grid item xs={9}>
					<Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
						{props.title}
					</Typography>
				</Grid>
			</Grid>
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
