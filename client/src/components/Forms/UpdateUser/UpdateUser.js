import React, { useState } from "react";
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import api from "../../../utils/api.js";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import { UPDATE_USER, USER_LOADING } from "../../../utils/actions/actions.js";

const useStyles = makeStyles(theme => ({
	paper: {
		background:
			"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		borderRadius: "0px",
		boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
		padding: "20px",
	},
	mgstyle: {
		marginTop: "5px",
		marginBottom: "5px",
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},

	styleIcon: {
		background: "#3f4d67",
	},
}));
export default function UpdateUser(props) {
	const [userState, userDispatch] = useUserContext();
	//*Associated with cloudinary
	const [fileInputState] = useState("");
	const [previewSource, setPreviewSource] = useState("");
	const [stateUpdate, setStateUpdate] = useState({
		firstName: "",
		lastname: "",
	});

	const handleChange = function(event) {
		const { name, value } = event.target;
		setStateUpdate({
			...stateUpdate,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const udateUser = {};

		if (stateUpdate.firstName !== "") {
			udateUser.firstName = stateUpdate.firstName;
		}
		if (stateUpdate.lastname !== "") {
			udateUser.lastname = stateUpdate.lastname;
		}

		//*Associated with cloudinary
		if (previewSource) {
			udateUser.profileImg = previewSource;
		}
		upDateUser(udateUser);

		const userInfo = await api.getUser(userState._id);

		await userDispatch({ type: USER_LOADING });

		await userDispatch({
			type: UPDATE_USER,
			payload: {
				...userInfo.data,
				loading: false,
			},
		});

		props.onClose();
	};

	//*Associated with cloudinary
	const upDateUser = async update => {
		const updateUser = await api.updateUser(userState._id, update);
		console.log(updateUser);
	};

	const classes = useStyles();

	const handleFileInputChange = e => {
		const file = e.target.files[0];
		previewFile(file);
	};

	const previewFile = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	return (
		<Grid
			container
			direction='column'
			justify='center'
			alignItems='center'
			className={classes.paper}
		>
			<Grid item align='center'>
				<Avatar className={classes.styleIcon}>
					<CreateIcon />
				</Avatar>
				<Typography variation='h6' color='default'>
					Update User
				</Typography>
			</Grid>
			<form autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					name='firstName'
					value={stateUpdate.firstName}
					onChange={handleChange}
					variant='outlined'
					label='Firstname' //*Spelling?
					placeholder='Enter First Name'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					name='lastname'
					value={stateUpdate.lastname}
					onChange={handleChange}
					variant='outlined'
					label='Lastname'
					placeholder='Enter Last Name'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					name='bio'
					value={stateUpdate.bio}
					onChange={handleChange}
					variant='outlined'
					label='Bio'
					placeholder='Enter Bio'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField //*Associated with cloudinary
					type='file'
					name='image'
					onChange={handleFileInputChange}
					value={fileInputState}
					variant='outlined'
					fullWidth
					className={classes.mgstyle}
				/>
				<Button
					type='submit'
					size='large'
					className={classes.styleMain}
					fullWidth
				>
					Update
				</Button>
			</form>
			{previewSource && (
				<img src={previewSource} alt='chosen' style={{ width: "75%" }} />
			)}
		</Grid>
	);
}
