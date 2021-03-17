import React, { useRef, useState } from "react";
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import api from "../../utils/api.js"

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
export default function Signin() {

	const emailRef = useRef()
	const userNameRef = useRef()
	const passwordRef  = useRef()
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const roleNameRef = useRef()
	
	const handleSubmit = async e => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
		const username = emailRef.current.value;
        const firstName = passwordRef.current.value;
		const lastName = emailRef.current.value;
        const roleNameRef = passwordRef.current.value;

       try {

            // Register the user.
            await api.register({ email, password, username,firstName,lastName,roleNameRef });

            // User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.

        } catch(err) {

             // Handle error responses from the API. This will include
             if( err.response && err.response.data ) console.log(err.response.data);
             
        }
    }


	const classes = useStyles();

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
					Sign Up
				</Typography>
			</Grid>
			<form autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					// name='firstName'
					// value=''
					ref={firstNameRef}
					variant='outlined'
					label='Firstname'
					placeholder='Enter First Name'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					// name='lastName'
					// value=''
					ref={lastNameRef}
					variant='outlined'
					label='Lastname'
					placeholder='Enter Last Name'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					// name='userName'
					// value=''
					ref={userNameRef}
					variant='outlined'
					label='Username'
					placeholder='Enter Username'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					// name='password'
					// value=''
					ref={passwordRef}
					variant='outlined'
					label='Password'
					placeholder='Enter Password'
					type='password'
					fullWidth
					className={classes.mgstyle}
				/>
				<FormControl
					variant='outlined'
					className={(classes.formControl, classes.mgstyle)}
					fullWidth
				>
					<InputLabel id='Role'>Role</InputLabel>
					<Select labelId='role' id='role' ref={roleNameRef} label='Role'>
						<MenuItem value={"user"}>User</MenuItem>
						<MenuItem value={"organization"}>Organization</MenuItem>
					</Select>
				</FormControl>
				<Button size='large' className={classes.styleMain} fullWidth>
					Sign Up
				</Button>
			</form>
		</Grid>
	);
}
