import * as React from "react";
import {
	AppBar,
	Toolbar,
	Container,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Hidden,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import NavDrawer from "./NavDrawer";
import Logo from "../../images/logo@2x.png";

const useStyles = makeStyles({
	appBar: {
		// boxShadow: "0 3.42857px 23px rgba(0, 0, 0, 0.1)",
		boxShadow: "0 8px 32px 0 rgb(31 38 135 / 7%)",
		background: "white",
	},
	navbarDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	navDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	linkText: {
		textDecoration: `none`,
		textTransform: `uppercase`,
		color: `grey`,
	},
});

const navLinks = [
	{ title: `news feed`, path: `#news` },
	{ title: `dashboard`, path: `#dashboard` },
	{ title: `sign in`, path: `#sign-in` },
];

export default function Nav() {
	const classes = useStyles();

	return (
		<AppBar position='static' className={classes.appBar}>
			<Toolbar>
				<Container maxWidth='lg' className={classes.navbarDisplayFlex}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='AccountCircle'
						href='/'
					>
						<img
							src={Logo}
							alt='logo'
							style={{ height: "30px", width: "auto" }}
						/>
						{/* <AccountCircle fontSize='large' /> */}
						{/* <Typography variant='h6'>Dono Logo</Typography> */}
					</IconButton>
					<Hidden smDown>
						<List
							component='nav'
							aria-labelledby='main navigation'
							className={classes.navDisplayFlex}
						>
							{navLinks.map(({ title, path }) => (
								<a href={path} key={title} className={classes.linkText}>
									<ListItem button>
										<ListItemText primary={title} />
									</ListItem>
								</a>
							))}
						</List>
					</Hidden>
					<Hidden mdUp>
						<NavDrawer navLinks={navLinks} />
					</Hidden>
				</Container>
			</Toolbar>
		</AppBar>
	);
}
