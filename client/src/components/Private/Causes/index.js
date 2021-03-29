// Import all relevant packages and components
import React from "react";
import {
	Typography,
	Grid,
	Divider,
	CardContent,
	Button,
	Dialog,
	ButtonGroup,
	CardMedia,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Edit, ThumbUpAlt } from "@material-ui/icons";
import "./style.css";
import UpdateCause from "../../Forms/UpdateCause/UpdateCause";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import api from "../../../utils/api";
import { UPDATE_USER, USER_LOADING } from "../../../utils/actions/actions";
import { useAuthTokenStore, useIsAuthenticated } from "../../../utils/auth";
import Donate from "../../Forms/Donate/Donate.js";
// Create the component function and export for use
export default function Causes(props) {
	// Create the set and setState from useState
	const [open, setOpen] = React.useState(false);
	// Destructure State and Dispatch from Context
	const [userState, userDispatch] = useUserContext();
	// Call useAuth function
	useAuthTokenStore();
	const isAuth = useIsAuthenticated();
	// Create the handleOpen function
	const handleOpen = () => {
		setOpen(true);
	};
	// Create the handleClose function
	const handleClose = () => {
		setOpen(false);
	};
	// Create the handleFollow function
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
	// Create the JSX for the component
	return (
		<Grid item className='card'>
			<Grid container className='headerContainer'>
				<Grid item xs={9}>
					<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
						{props.title}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					{props.check ? null : props.role === "Organization" ? (
						<Button className='editButton' onClick={handleOpen}>
							<Edit /> Edit
						</Button>
					) : null}
					<Dialog
						aria-labelledby='transition-modal-title'
						aria-describedby='transition-modal-description'
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							{props.check ? null : props.role === "Organization" ? (
								<UpdateCause className={"cardPost"} />
							) : (
								<Donate
									onClose={handleClose}
									cause={props.id}
									title={props.title}
								/>
							)}
						</Fade>
					</Dialog>
				</Grid>
			</Grid>
			<Divider />
			<Grid container direction='row' spacing={1}>
				{/* <Grid item xs={12} sm={4}>
					<CardMedia className={"media"} image={props.image} />
				</Grid> */}
				<Grid item xs={12} sm={12}>
					<CardContent>
						<Typography variant='body2' color='textSecondary'>
							{props.post}
						</Typography>
					</CardContent>
				</Grid>
				{isAuth ? (
					<ButtonGroup justify='center' fullWidth>
						<Button
							size='large'
							className='styleButton'
							onClick={handleOpen}
							fullWidth
							id={props.id}
						>
							<i class='fab fa-paypal'></i>
							Support
						</Button>
						<Button
							size='large'
							className='followButton'
							onClick={() => handleFollow(props.id)}
							fullWidth
						>
							<ThumbUpAlt /> Follow
						</Button>
					</ButtonGroup>
				) : null}
			</Grid>
		</Grid>
	);
}
