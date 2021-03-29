// Import all relevant packages and components
import { Grid, Button, TextField } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { makeStyles } from "@material-ui/core";
import "./style.css";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(0),
			width: "100%",
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
		marginTop: "10px",
		borderRadius: "0px",
	},
	inputMargin: {
		margin: "5px",
	},
}));
// Create the component function and export for use
export default function UpdateCause() {
	// Call the styles function
	const classes = useStyles();
	// Create the JSX for the component
	return (
		<Grid className='cardPost'>
			<form className={classes.root} noValidate autoComplete='off'>
				<div>
					<Grid container>
						<TextField
							id='title'
							label='Edit Title'
							multiline
							rowsMax={4}
							className={classes.inputMargin}
							size='small'
						/>
						<TextField
							id='imageUrl'
							label=' Edit Image Url'
							multiline
							rowsMax={4}
							className={classes.inputMargin}
							size='small'
						/>
						<TextField
							id='post'
							label='Edit Cause'
							variant='filled'
							multiline
							rows={4}
							fullWidth
							size='small'
						/>
					</Grid>
				</div>
				<Button size='small' className={classes.styleMain}>
					<ChatBubbleOutlineIcon /> Update
				</Button>
			</form>
		</Grid>
	);
}
