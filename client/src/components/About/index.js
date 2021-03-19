import React, { use } from "react";
import {
	Typography,
	Grid,
	CardMedia,
	Divider,
	CardContent,
	Button,
	Dialog,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Edit } from "@material-ui/icons";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "./style.css";
import UpdateUser from "../Forms/UpdateUser/UpdateUser";

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "0px !important",
	},
}));

export default function About(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Grid item className='card'>
			<Grid container className='headerContainer'>
				<Grid item xs={9}>
					<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
						{props.title}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Button className='editButton' onClick={handleOpen}>
						<Edit /> Edit
					</Button>
					<Dialog
						aria-labelledby='transition-modal-title'
						aria-describedby='transition-modal-description'
						className={classes.modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							<UpdateUser />
						</Fade>
					</Dialog>
				</Grid>
			</Grid>
			{/* <Divider /> */}
			<CardMedia className='media' image={props.image} />
			<Grid container direction='row' spacing={1}>
				<Grid item xs={12} sm={12}>
					<Button size='large' className='aboutButton' fullWidth>
						<ThumbUpAltIcon /> Support Us
					</Button>
					<CardContent>
						<Typography variant='body2' color='textSecondary'>
							{props.bio}
						</Typography>
					</CardContent>
					<Divider />
					<CardContent>
						<Typography
							className='borderStyle'
							variant='body2'
							color='textSecondary'
						>
							<span className='authorStyle'> Website:</span> {props.website}
						</Typography>
						<Typography
							className='borderStyle'
							variant='body2'
							color='textSecondary'
						>
							<span className='authorStyle'> Address:</span> {props.address}
						</Typography>
						<Typography
							className='borderStyle'
							variant='body2'
							color='textSecondary'
						>
							<span className='authorStyle'> Phone:</span> {props.phone}
						</Typography>
						<Typography
							className='borderStyle'
							variant='body2'
							color='textSecondary'
						>
							<span className='authorStyle'> E-mail:</span> {props.email}
						</Typography>
					</CardContent>
					<Button size='large' className='analyticsButton' fullWidth>
						<EqualizerIcon /> Analytics
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
