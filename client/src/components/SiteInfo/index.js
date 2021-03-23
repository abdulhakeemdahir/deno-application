import React from "react";
import {
	Typography,
	Grid,
	Divider,
	CardContent,
	CardMedia,
	Button,
	Container,
} from "@material-ui/core";
import "./style.css";
import { Close } from "@material-ui/icons";
import Logo from "../../images/logo@2x.png";
import Image from "../../images/splash.jpg";

export default function SiteInfo(props) {
	console.log(props.onClose);
	return (
		<Container className='card'>
			<Grid container xs={12}>
				<Grid container className='headerContainer'>
					<Grid item xs={12}>
						<Typography variant='h4' className='headerColor'>
							DONO Features!
						</Typography>
						<Typography variant='subtitle1' className='subtitleColor'>
							Welcome to Social Giving!
						</Typography>
					</Grid>
				</Grid>
				<Divider />
				<Grid container direction='row' spacing={1}>
					<Grid item xs={12}>
						<Container justify='center'>
							{/* <img src={Image} alt='logo' className='logo' /> */}

							<CardMedia image={Image} className='logo' />
						</Container>
					</Grid>
					<Divider />
					<Grid item xs={12}>
						<CardContent>
							<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
								Section 1:
							</Typography>
							<Typography variant='body2' color='textSecondary'>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including versions of
								Lorem Ipsum.
							</Typography>
							<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
								Section 1:
							</Typography>
							<Typography variant='body2' color='textSecondary'>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including versions of
								Lorem Ipsum.
							</Typography>
							<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
								Section 1:
							</Typography>
							<Typography variant='body2' color='textSecondary'>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including versions of
								Lorem Ipsum.
							</Typography>
						</CardContent>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
