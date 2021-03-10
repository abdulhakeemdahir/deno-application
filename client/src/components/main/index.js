import {
	Typography,
	Grid,
	Paper,
	Avatar,
	TextField,
	Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles({
	paper: {
		background:
			"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		borderRadius: "10px",
		boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
		padding: "20px",
		height: "30vh",
		width: "280px",
		textAlign: "center",
	},
	bgstyle: {
		backgroundColor: "#e9e9e9",
	},
	mgstyle: {
		marginTop: "5px",
		marginBottom: "5px",
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
	},
	styleSecondary: {
		background: "linear-gradient(-135deg,#899fd4,#a389d4)",
		color: "#ffffff",
	},
});
export default function Main() {
	const classes = useStyles();
	return (
		<Grid container direction='row' justify='center' alignItems='center'>
			<Paper className={classes.paper}>
				<Grid align='center'>
					<Avatar className={classes.styleMain}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variation='h6' color='default'>
						Sign In
					</Typography>
				</Grid>
				<form autoComplete='off'>
					<TextField
						variant='outlined'
						label='Username'
						placeholder='Enter Username'
						fullWidth
						className={classes.mgstyle}
					/>
					<TextField
						variant='outlined'
						label='Password'
						placeholder='Enter Password'
						type='password'
						fullWidth
						className={classes.mgstyle}
					/>
					<Button size='large' className={classes.styleMain} fullWidth>
						Sign In
					</Button>
				</form>
			</Paper>
		</Grid>
	);
}
