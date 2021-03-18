import { Typography, Grid, Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../images/logo@2x.png";

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
export default function Welcome() {
	const classes = useStyles();

	return (
		<Grid item align='center'>
			<img src={Logo} alt='logo' style={{ height: "50px", width: "auto" }} />
			<Typography variant='h3' color='primary' style={{ fontWeight: "100" }}>
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
				{/* <Button variant='outlined' color='primary' href='/signup'>
					Sign Up
				</Button> */}
				<Button variant='outlined' color='secondary' href='/explore'>
					Explore
				</Button>
			</ButtonGroup>
		</Grid>
	);
}
