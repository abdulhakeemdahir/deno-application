import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { useHistory } from "react-router";
import { useLogin } from "../../utils/auth";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import { GET_USER_INFO, USER_LOADING } from "../../utils/actions/actions";
import api from "../../utils/api";

const useStyles = makeStyles({
	paper: {
		background:
			"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		borderRadius: "0px",
		boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
		padding: "20px",
	},
	centerPosition: {
		padding: "20px",
		textAlign: "center",
	},
	centerContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	bgstyle: {
		color: "#3f4d67",
	},
	mgstyle: {
		marginTop: "5px",
		marginBottom: "5px",
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
		borderRadius: "0px",
	},
	styleSecondary: {
		background: "linear-gradient(-135deg,#899fd4,#a389d4)",
		color: "#ffffff",
	},
	styleIcon: {
		background: "#3f4d67",
	},
});
export default function Signin() {
	const classes = useStyles();

	const [stateSignIn, setStateSignIn] = useState({
		email: "",
		emailError: "",
		username: "",
		usernameError: "",
	});

	const history = useHistory();
	// Get the helper login function from the `useLogin` hook.
	const login = useLogin();

	const handleChange = function(event) {
		const { name, value } = event.target;
		setStateSignIn({
			...stateSignIn,
			[name]: value,
		});
	};
	const [, userDispatch] = useUserContext();
	const handleSubmit = async event => {
		event.preventDefault();
		// console.log(event)
		try {
			const { _id } = await login(stateSignIn);

			// User has been successfully logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.

			await userDispatch({
				type: USER_LOADING,
			});
			await userDispatch({
				type: GET_USER_INFO,
				payload: {
					_id,
					loading: false,
				},
			});
			// console.log(stateSignIn);

			history.push("/newsfeed");
		} catch (err) {
			// Handle error responses from the API
			if (err.response && err.response.data) {
				console.log(err.response.data);
				validateLogin(err.response.data);
			}
		}
	};
	// Form validation for inputs to be more than 6 characters
	const validateLogin = response => {
		let isError = false;
		const errors = {};

		if (response) {
			errors[`usernameError`] = "Username/Password is Wrong";
			errors[`passwordError`] = "Username/Password is Wrong";
			setStateSignIn({
				...stateSignIn,
				...errors,
			});
		}

		return isError;
	};

	// Form validation for inputs to be more than 6 characters
	const validate = event => {
		const { name, value } = event.target;
		console.log(event.target);
		let isError = false;
		const errors = {};
		if (value.length < 1) {
			isError = true;
			errors[`${name}Error`] = "Input cannot be empty";
		}
		console.log(value.length);
		if (isError) {
			setStateSignIn({
				...stateSignIn,
				...errors,
			});
		}
		if (value.length >= 1) {
			errors[`${name}Error`] = "";
			setStateSignIn({
				...stateSignIn,
				...errors,
			});
		}

		return isError;
	};

	// console.log(stateSignIn);
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
					<LockOutlinedIcon />
				</Avatar>
				<Typography variation='h6' color='default'>
					Log In
				</Typography>
			</Grid>
			<form autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					error={stateSignIn.usernameError}
					helperText={stateSignIn.usernameError}
					name='username'
					value={stateSignIn.username}
					onChange={handleChange}
					onBlur={validate}
					variant='outlined'
					label='Username'
					placeholder='Enter Username'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					error={stateSignIn.passwordError}
					helperText={stateSignIn.passwordError}
					name='password'
					value={stateSignIn.password}
					onChange={handleChange}
					onBlur={validate}
					variant='outlined'
					label='Password'
					placeholder='Enter Password'
					type='password'
					fullWidth
					className={classes.mgstyle}
				/>
				<Button
					size='large'
					className={classes.styleMain}
					fullWidth
					onClick={handleSubmit}
				>
					Log In
				</Button>
			</form>
		</Grid>
	);
}
