import React, { useState } from "react";
import {
	Typography,
	Grid,
	Avatar,
	Container,
	Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import api from "../../utils/api.js";
import FormUserDetails1 from "./UserInfo/FormUserDetails1.js";
import FormUserDetails2 from "./UserInfo/FormUserDetails2.js";
import FormUserConfirm from "./UserInfo/FormUserConfirm.js";
import { ThumbUp } from "@material-ui/icons";

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
export default function SignUpUser() {
	const [stateForm, setStateForm] = useState({
		step: 1,
	});

	const nextStep = () => {
		const { step } = stateForm;
		setStateForm({
			step: step + 1,
		});
	};
	const previousStep = () => {
		const { step } = stateForm;
		setStateForm({
			step: step - 1,
		});
	};

	// const handleFieldsChange = input => e => {
	// 	setStateForm({ [input]: e.target.value });
	// };

	const [stateSignUp, setStateSignUp] = useState({
		email: "",
		password: "",
		username: "",
		firstName: "",
		lastname: "",
		role: "",
		bio: "",
		thumbnail: "",
	});

	const handleChange = function(event) {
		const { name, value } = event.target;
		setStateSignUp({
			...stateSignUp,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			// Register the user.
			await api.register(setStateSignUp);

			// User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
		} catch (err) {
			// Handle error responses from the API. This will include
			if (err.response && err.response.data) console.log(err.response.data);
		}
	};

	const classes = useStyles();
	const { step } = stateForm;
	const {
		firstName,
		lastname,
		role,
		email,
		username,
		password,
		bio,
		thumbnail,
	} = stateSignUp;
	const values = {
		firstName,
		lastname,
		role,
		email,
		username,
		password,
		bio,
		thumbnail,
	};

	switch (step) {
		case 1:
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
							Signup User
						</Typography>
					</Grid>
					<FormUserDetails1
						nextStep={nextStep}
						handleChange={handleChange}
						values={values}
					/>
				</Grid>
			);
		case 2:
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
							Signup User
						</Typography>
					</Grid>
					<FormUserDetails2
						nextStep={nextStep}
						previousStep={previousStep}
						handleChange={handleChange}
						values={values}
					/>
				</Grid>
			);
		case 3:
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
							Signup User
						</Typography>
					</Grid>
					<FormUserConfirm
						nextStep={nextStep}
						previousStep={previousStep}
						values={values}
					/>
				</Grid>
			);
		case 4:
			return (
				<Grid
					container
					direction='column'
					justify='center'
					alignItems='center'
					className={classes.paper}
				>
					<Container>
						<Grid item align='center'>
							<Avatar className={classes.styleIcon}>
								<ThumbUp />
							</Avatar>
							<Typography variation='h6' color='default'>
								Congratulations
							</Typography>
						</Grid>
						<Typography variation='h6' color='default'>
							Thank you for Signing Up!
						</Typography>
						<br />
						<Divider />
						<br />
						<Typography variation='h6' color='default'>
							Please Login.
						</Typography>
					</Container>
				</Grid>
			);
		default:
			return;
	}
}
