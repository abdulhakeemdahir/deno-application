import { Typography, Paper, Card, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	textStyle: {
		textDecoration: "none",
	},
	margin: {
		marginTop: "15px",
		marginBottom: "15px",
	},
});
export default function Trending(props) {
	const classes = useStyles();
	return (
		<div className='Trending'>
			<a href={props.link} className={classes.textStyle}>
				<Typography variant='body1'># {props.name}</Typography>
			</a>
		</div>
	);
}
