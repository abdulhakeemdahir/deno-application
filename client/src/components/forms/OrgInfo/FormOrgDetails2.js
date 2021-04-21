// Import all relevant packages and components
import React from "react";
import formStyles from "../useStyles/formStyles";
import { TextField, Button, ButtonGroup } from "@material-ui/core";
import "./style.css";

// Create the component function and export for use
const FormOrgDetails2 = props => {
	// Create the continueOne function
	const continueOne = e => {
		e.preventDefault();
		props.nextStep();
	};
	// Create the previousOne function
	const previousOne = e => {
		e.preventDefault();
		props.previousStep();
	};
	const { values, handleChange, validate, validatePassword } = props;
	// Call the styles function
	const classes = formStyles();
	// Create the JSX for the component
	return (
		<>
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
				className={"mgstyle"}
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
				className={"mgstyle"}
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
};

export default FormOrgDetails2;
