import {
	Typography,
	Grid,
	CardMedia,
	Divider,
	CardContent,
} from "@material-ui/core";
import "./style.css";

export default function News(props) {
	console.log(props.image);
	return (
		<Grid item className='card' xs={12}>
			<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
				{props.title}
			</Typography>
			<Typography variant='body2' color='textSecondary' component='p'>
				<span className='authorStyle'> Author:</span> {props.author}
			</Typography>
			<Divider />
			<Grid container direction='row' spacing={1}>
				<Grid item xs={12} sm={4}>
					<CardMedia className={"media"} image={props.image} />
				</Grid>
				<Grid item xs={12} sm={8}>
					<CardContent>
						<Typography variant='body' color='textSecondary' component='p'>
							{props.post}
						</Typography>
						<a href={props.link} className='hashTagStyle'>
							#{props.hashTag}
						</a>
					</CardContent>
				</Grid>
			</Grid>
		</Grid>
	);
}
