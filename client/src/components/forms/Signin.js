import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { useHistory } from "react-router";
import { useLogin } from "../../utils/auth";

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
		username: "" 
	});

	const history = useHistory();
	// Get the helper login function from the `useLogin` hook.
    const login = useLogin();

	const handleChange = function(event) {
		const {name, value} = event.target;
		setStateSignIn({
			...stateSignIn,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
        event.preventDefault();
		
		try {

        	await login(stateSignIn);

            // User has been successfully logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
			
			history.push("/newsfeed")


        } catch(err) {

             // Handle error responses from the API
             if( err.response && err.response.data ) console.log(err.response.data);

        }
    }

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
					name='username'
					value={stateSignIn.username}
					onChange={handleChange}
					variant='outlined'
					label='Username'
					placeholder='Enter Username'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					name='password'
					value={stateSignIn.password}
					onChange={handleChange}
					variant='outlined'
					label='Password'
					placeholder='Enter Password'
					type='password'
					fullWidth
					className={classes.mgstyle}
				/>
				<Button size='large' className={classes.styleMain} fullWidth onClick={handleSubmit}>
					Log In
				</Button>
			</form>
		</Grid>
	);
}
