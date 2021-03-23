import React from "react";
import {
	Typography,
	Grid,
	Divider,
	CardContent,
	CardMedia,
	Button,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import "./style.css";

export default function Causes(props) {
	return (
		<Grid item className='card'>
			<Grid container className='headerContainer'>
				<Grid item xs={9}>
					<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
						{props.title}
					</Typography>
				</Grid>
			</Grid>
			<Divider />
			<Grid container direction='row' spacing={1}>
				<Grid item xs={12}>
					<CardMedia className={"media"} image={props.image} />
				</Grid>
				<Divider />
				<Grid item xs={12}>
					<CardContent>
						<Typography variant='body2' color='textSecondary'>
							{props.post}
						</Typography>
					</CardContent>
				</Grid>
				<Button size='large' className='styleButton' fullWidth id={props.id}>
					<CreditCardIcon /> Support Cause
				</Button>
			</Grid>
		</Grid>
	);
}
