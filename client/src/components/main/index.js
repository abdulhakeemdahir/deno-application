import {
	Typography,
	Grid,
	Avatar,
	TextField,
	Button,
	ButtonGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Logo from "../../images/logo@2x.png";

const useStyles = makeStyles({
	paper: {
		background:
			"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		borderRadius: "10px",
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
	},
	styleSecondary: {
		background: "linear-gradient(-135deg,#899fd4,#a389d4)",
		color: "#ffffff",
	},
});
export default function Main() {
	const classes = useStyles();
	return (
		<Grid
			container
			direction='row'
			justify='center'
			alignItems='center'
			className={`${classes.centerContainer}`}
			xs={12}
			sm={8}
			xl={6}
		>
			<Grid item sm={6} xs={12}>
				<Grid item align='center'>
					<img
						src={Logo}
						alt='logo'
						style={{ height: "50px", width: "auto" }}
					/>
					<Typography
						variant='h3'
						color='primary'
						style={{ fontWeight: "100" }}
					>
						Welcome to Dono
					</Typography>
					<Typography variant='h6' className={classes.bgstyle}>
						Where Giving is a Social Experience
					</Typography>
					<Typography variant='body2' color='default'>
						Please Log In, otherwise, please sign up! Otherwise you can go and
						explore.
					</Typography>
					<ButtonGroup className={classes.mgstyle}>
						<Button variant='outlined' color='primary'>
							Sign Up
						</Button>
						<Button variant='outlined' color='secondary'>
							Explore
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
			<Grid item sm={6} xs={12} className={classes.centerPosition}>
				<Grid
					container
					direction='column'
					justify='center'
					alignItems='center'
					className={classes.paper}
				>
					<Grid item align='center'>
						<Avatar className={classes.styleMain}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography variation='h6' color='default'>
							Log In
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
							Log In
						</Button>
					</form>
				</Grid>
			</Grid>
		</Grid>
	);
}
