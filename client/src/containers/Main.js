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
import Nav from "../components/navigation/Nav";
import Logo from "../images/logo@2x.png";

const useStyles = makeStyles({
	paper: {
		background:
			"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		borderRadius: "10px",
		boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
		padding: "20px",
	},
});
export default function Main() {
	const classes = useStyles();
	return (
		<div className='Main'>
			<Nav />
			<Grid
				container
				direction='row'
				justify='center'
				alignItems='center'
				className={`${classes.centerContainer}`}
				xs={12}
				sm={8}
				xl={6}
			></Grid>
		</div>
	);
}
