import {
	Typography,
	Grid,
	CardMedia,
	Divider,
	CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	textStyle: {
		textDecoration: "none",
	},
	margin: {
		marginTop: "15px",
		marginBottom: "15px",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
		borderRadius: "10px",
	},
});
export default function News(props) {
	const classes = useStyles();
	console.log(props.image);
	return (
		<Grid item>
			<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
				{props.title}
			</Typography>
			<Typography variant='body2' color='textSecondary' component='p'>
				{props.author}
			</Typography>
			<Divider />
			<Grid container direction='row'>
				<Grid item xs={4}>
					<CardMedia className={classes.media} image={props.image} />
				</Grid>
				<Grid item xs={8}>
					<CardContent>
						<Typography variant='body2' color='textSecondary' component='p'>
							{props.post}
						</Typography>
					</CardContent>
					<a href={props.link}>#{props.hashTag}</a>
				</Grid>
			</Grid>
		</Grid>
	);
}
