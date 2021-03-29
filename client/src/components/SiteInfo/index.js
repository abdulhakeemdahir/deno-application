// Import all relevant packages and components
import React from "react";
import {
	Typography,
	Grid,
	Divider,
	CardContent,
	CardMedia,
	Container,
} from "@material-ui/core";
import "./style.css";
import Newsfeed from "../../images/newsfeed@2x.jpg";
import Direct from "../../images/direct@2x.jpg";
import Verified from "../../images/verified@2x.jpg";
import Gamified from "../../images/gamified@2x.jpg";
// Create the component function and export for use
export default function SiteInfo(props) {
	// Create the JSX for the component
	return (
		<Container className='card'>
			<Grid container xs={12}>
				<Grid container className='headerContainer'>
					<Grid item xs={12}>
						<Typography variant='h5' className='headerColor'>
							The DONO Difference!
						</Typography>
						<Typography variant='subtitle1' className='subtitleColor'>
							Welcome to Social Giving!
						</Typography>
					</Grid>
				</Grid>
				<Divider />
				<Grid container direction='row' spacing={1}>
					<Grid item xs={12}>
						<CardMedia image={Newsfeed} className='logo' />
					</Grid>
					<Grid item xs={12}>
						<CardContent>
							<Typography
								variant='subtitle1'
								style={{
									fontWeight: "bold",
								}}
							>
								Newsfeed Full of Good:
							</Typography>
							<Divider />
							<Typography variant='body2' color='textSecondary'>
								We built this service so that Non Profit Organizations that are
								helping to solve world issues have a clear and direct platform.
								It is impractical to get Social Awareness for causes on other
								Social Platforms. Our <strong>Newsfeed</strong> places Causes
								and Programs first,{" "}
								<strong>
									so you can help solve problems you are passionate about.
								</strong>
							</Typography>
							<Grid item xs={12}>
								<CardMedia image={Direct} className='logo' />
							</Grid>

							<Typography
								variant='subtitle1'
								style={{
									fontWeight: "bold",
								}}
							>
								Direct Cause Support:
							</Typography>
							<Divider />
							<Typography variant='body2' color='textSecondary'>
								Here at Dono we don't force anyone to create an account to
								support a cause they believe in. You can explore pertinent
								issues in your area or Programs you haven't heard of.{" "}
								<strong>You can support anonymously.</strong> But, with an
								account, we make it worthwhile to do good!
							</Typography>
							<Grid item xs={12}>
								<CardMedia image={Verified} className='logo' />
							</Grid>

							<Typography
								variant='subtitle1'
								style={{
									fontWeight: "bold",
								}}
							>
								Verified and Certified:
							</Typography>
							<Divider />
							<Typography variant='body2' color='textSecondary'>
								We make sure that any organization that uses our platform has
								proper <strong>IRS certification</strong>, and
								<strong> we verify all information</strong> regarding their Non
								Profit Status and Standing. You can be sure you're giving to
								real organizations.
							</Typography>
							<Grid item xs={12}>
								<CardMedia image={Gamified} className='logo' />
							</Grid>

							<Typography
								variant='subtitle1'
								style={{
									fontWeight: "bold",
								}}
							>
								Gamified Giving:
							</Typography>
							<Divider />
							<Typography variant='body2' color='textSecondary'>
								Doing good makes you feel good. What if it was fun as well?
								Sometimes well natured competition is healthy. We believe you
								should see and be proud of your Philanthropy.{" "}
								<strong>Accumulate stats, stars and badges!</strong>
							</Typography>
						</CardContent>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
