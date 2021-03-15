import {
	Typography,
	Grid,
	CardMedia,
	Divider,
	CardContent,
	Button,
} from "@material-ui/core";
import "./style.css";

export default function About(props) {
	console.log(props.image);
	return (
		<Grid item className='card'>
			<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
				{props.title}
			</Typography>
			<Divider />
			<CardMedia className='media' image={props.image} />
			<Grid container direction='row' spacing={1}>
				<Grid item xs={12} sm={12}>
					<Button size='large' className='aboutButton' fullWidth>
						Support Us
					</Button>
					<CardContent>
						<Typography variant='body2' color='textSecondary'>
							{props.bio}
						</Typography>
					</CardContent>
					<Divider />
					<Typography variant='body2' color='textSecondary'>
						Website: {props.website}
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						Address: {props.address}
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						Phone: {props.phone}
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						E-mail: {props.email}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}
