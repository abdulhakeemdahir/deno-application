import {
	Typography,
	Grid,
	CardMedia,
	Divider,
	CardContent,
	Button,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import "./style.css";

export default function Causes(props) {
	console.log(props.image);
	return (
		<Grid item className='card'>
			<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
				{props.title}
			</Typography>
			<Divider />
			<Grid container direction='row' spacing={1}>
				{/* <Grid item xs={12} sm={4}>
					<CardMedia className={"media"} image={props.image} />
				</Grid> */}
				<Grid item xs={12} sm={12}>
					<CardContent>
						<Typography variant='body2' color='textSecondary'>
							{props.post}
						</Typography>
					</CardContent>
				</Grid>
				<Button size='large' className='styleButton' fullWidth>
					<CreditCardIcon /> Support Cause
				</Button>
			</Grid>
		</Grid>
	);
}
