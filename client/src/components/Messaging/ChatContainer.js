import {
	Button,
	Divider,
	FormGroup,
	Grid,
	TextField,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
	},
}));

export default function ChatContainer() {
	const classes = useStyles();

	return (
		<Grid container class='chat-container'>
			<Grid item>
				<Typography>Chatroom:</Typography>
				<Divider />
				<FormGroup>
					<form id='chat-form'>
						<TextField
							name='chatform'
							variant='outlined'
							label='Chat'
							placeholder='Enter Message'
							fullWidth
						/>
						<Button size='large' className={classes.styleMain} fullWidth>
							Send Message
						</Button>
					</form>
				</FormGroup>
			</Grid>
		</Grid>
	);
}
