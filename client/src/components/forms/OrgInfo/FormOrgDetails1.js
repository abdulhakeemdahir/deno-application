// Import all relevant packages and components
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
// Create a useStyles Material UI component for styling
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
// Create the component function and export for use
export default function FormOrgDetails1(props) {
	// Create the continueOne function
	const continueOne = e => {
		e.preventDefault();
		props.nextStep();
	};

	const { values, handleChange, validate, validateEmail } = props;
	// Call the styles function
	const classes = useStyles();
	// Create the JSX for the component
	return (
		<>
			<TextField
				error={values.firstNameError}
				helperText={values.firstNameError}
				onBlur={validate}
				name='firstName'
				value={values.firstName}
				onChange={handleChange}
				variant='outlined'
				label='First Name'
				placeholder='Enter First Name'
				fullWidth
				className={classes.mgstyle}
			/>
			<TextField
				error={values.lastnameError}
				helperText={values.lastnameError}
				onBlur={validate}
				name='lastname'
				value={values.lastname}
				onChange={handleChange}
				variant='outlined'
				label='Last Name'
				placeholder='Enter Last Name'
				fullWidth
				className={classes.mgstyle}
			/>
			<TextField
				error={values.orgnameError}
				helperText={values.orgnameError}
				onBlur={validate}
				name='orgname'
				value={values.orgname}
				onChange={handleChange}
				variant='outlined'
				label='Organization Name'
				placeholder='Enter Organization Name'
				fullWidth
				className={classes.mgstyle}
			/>
			<TextField
				error={values.emailError}
				helperText={values.emailError}
				onBlur={validateEmail}
				name='email'
				value={values.email}
				onChange={handleChange}
				variant='outlined'
				label='E-mail'
				placeholder='Enter Email'
				fullWidth
				type='email'
				className={classes.mgstyle}
			/>
			<Button
				size='large'
				className={classes.styleMain}
				onClick={continueOne}
				fullWidth
			>
				Continue
			</Button>
		</>
	);
}
