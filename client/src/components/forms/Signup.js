import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const handleChange = function() {};

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
}));
export default function Signin() {
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
				<Avatar className={classes.styleMain}>
					<CreateIcon />
				</Avatar>
				<Typography variation='h6' color='default'>
					Sign Up
				</Typography>
			</Grid>
			<form autoComplete='off'>
				<TextField
					// name='firstName'
					// value=''
					variant='outlined'
					label='Firstname'
					placeholder='Enter First Name'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					// name='lastName'
					// value=''
					variant='outlined'
					label='Lastname'
					placeholder='Enter Last Name'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					// name='userName'
					// value=''
					variant='outlined'
					label='Username'
					placeholder='Enter Username'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					// name='password'
					// value=''
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
					<InputLabel id='role'>Select a Role</InputLabel>
					<Select labelId='role' id='role' onChange={handleChange}>
						<MenuItem>User</MenuItem>
						<MenuItem>Organization</MenuItem>
					</Select>
				</FormControl>
				<Button size='large' className={classes.styleMain} fullWidth>
					Sign Up
				</Button>
			</form>
		</Grid>
	);
}
