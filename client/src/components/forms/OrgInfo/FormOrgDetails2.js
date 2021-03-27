import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Button, ButtonGroup } from "@material-ui/core";

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
	styleSecondary: {
		background: "linear-gradient(-135deg, #899fd4, #a389d4)",
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

export default function FormOrgDetails2(props) {
	const continueOne = e => {
		e.preventDefault();
		props.nextStep();
	};
	const previousOne = e => {
		e.preventDefault();
		props.previousStep();
	};

	const { values, handleChange, validate, validatePassword } = props;
	const classes = useStyles();

	return (
		<>
			<TextField
				name='role'
				value={values.role}
				onChange={handleChange}
				variant='outlined'
				label='Role'
				placeholder='Enter Role'
				fullWidth
				className={classes.mgstyle}
			/>
			<TextField
				error={values.usernameError}
				helperText={values.usernameError}
				onBlur={validate}
				name='username'
				value={values.username}
				onChange={handleChange}
				variant='outlined'
				label='Username'
				placeholder='Enter Username'
				fullWidth
				className={classes.mgstyle}
			/>
			<TextField
				error={values.passwordError}
				helperText={values.passwordError}
				onBlur={validatePassword}
				name='password'
				value={values.password}
				onChange={handleChange}
				variant='outlined'
				label='Password'
				placeholder='Enter Password'
				type='password'
				fullWidth
				className={classes.mgstyle}
			/>
			<ButtonGroup fullWidth>
				<Button
					size='large'
					className={classes.styleSecondary}
					onClick={previousOne}
				>
					Go Back
				</Button>
				<Button
					size='large'
					className={classes.styleMain}
					onClick={continueOne}
				>
					Continue
				</Button>
			</ButtonGroup>
		</>
	);
}
