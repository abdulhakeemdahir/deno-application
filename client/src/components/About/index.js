import {
	Typography,
	Grid,
	CardMedia,
	Divider,
	CardContent,
	Button,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
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
						<ThumbUpAltIcon /> Support Us
					</Button>
					<CardContent>
						<Typography variant='body2' color='textSecondary'>
							{props.bio}
						</Typography>
					</CardContent>
					<Divider />
					<CardContent>
						<Typography
							className='borderStyle'
							variant='body2'
							color='textSecondary'
						>
							<span className='authorStyle'> Website:</span> {props.website}
						</Typography>
						<Typography
							className='borderStyle'
							variant='body2'
							color='textSecondary'
						>
							<span className='authorStyle'> Address:</span> {props.address}
						</Typography>
						<Typography
							className='borderStyle'
							variant='body2'
							color='textSecondary'
						>
							<span className='authorStyle'> Phone:</span> {props.phone}
						</Typography>
						<Typography
							className='borderStyle'
							variant='body2'
							color='textSecondary'
						>
							<span className='authorStyle'> E-mail:</span> {props.email}
						</Typography>
					</CardContent>
					<Button size='large' className='analyticsButton' fullWidth>
						<EqualizerIcon /> Analytics
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
