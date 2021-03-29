import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
	AccountCircle,
	Chat,
	Dashboard,
	Equalizer,
	Explore,
	HomeSharp,
	Menu,
} from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

import {
	useAuthTokenStore,
	useIsAuthenticated,
	useLogout,
} from "../../../utils/auth";

import "../style.css";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	linkText: {
		textDecoration: `none`,
		textTransform: `uppercase`,
		color: `white`,
		padding: "10px",
	},
	logoutStyle: {
		background: "linear-gradient(-135deg, #e57373, #f06292)",
		color: "white",
		textDecoration: "none",
	},
	loginStyle: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "white",
		textDecoration: "none",
	},
	activeLink: {
		color: "#e57373",
	},
	spanStyle: {
		margin: "10px",
	},
});

const SideDrawer = ({ navLinks }) => {
	const classes = useStyles();
	const [state, setState] = useState({ right: false });

	const logout = useLogout();

	const history = useHistory();

	const login = () => {
		history.push("/");
	};

	useAuthTokenStore();

	const isAuth = useIsAuthenticated();

	const toggleDrawer = (anchor, open) => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ [anchor]: open });
	};

	const sideDrawerList = anchor => (
		<div
			className={classes.list}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			{/* <List component='nav'>
				{navLinks.map(({ title, path }) => (
					<Link  to={path} key={title} className={classes.linkText}>
						<ListItem button>
							<ListItemText primary={title} />
						</ListItem>
					</Link>
				))}
				<Link to='/' className={classes.logoutStyle}>
					<ListItem button>
						<ListItemText className={classes.logoutStyle}>
							<span className={classes.spanStyle}>LOG OUT</span>
						</ListItemText>
					</ListItem>
				</Link>
			</List> */}
			<List
				component='nav'
				aria-labelledby='main navigation'
				className={classes.navDisplayFlex}
			>
				{isAuth ? (
					<>
						<NavLink
							to='/newsfeed'
							key='newsfeed'
							className={classes.linkText}
							activeClassName={classes.activeLink}
						>
							<ListItem>
								<HomeSharp />
								<Typography>newsfeed</Typography>
							</ListItem>
						</NavLink>
						<NavLink
							to={`/dashboard`}
							key='dashboard'
							className={classes.linkText}
							activeClassName={classes.activeLink}
						>
							<ListItem>
								<Dashboard />
								<Typography>dashboard</Typography>
							</ListItem>
						</NavLink>
						<NavLink
							to='/chatroom'
							key='chatroom'
							className={classes.linkText}
							activeClassName={classes.activeLink}
						>
							<ListItem>
								<Chat />
								<Typography>chat</Typography>
							</ListItem>
						</NavLink>
						<NavLink
							to='/analytics'
							key='analytics'
							className={classes.linkText}
							activeClassName={classes.activeLink}
						>
							<ListItem>
								<Equalizer />
								<Typography>analytics</Typography>
							</ListItem>
						</NavLink>
						<NavLink
							onClick={logout}
							to='/'
							key='/'
							activeClassName={classes.activeLink}
						>
							<ListItem className={classes.logoutStyle}>
								<AccountCircle />
								<Typography>LOGOUT</Typography>
							</ListItem>
						</NavLink>
					</>
				) : (
					<>
						<NavLink
							key='explore'
							to='/explore'
							className={classes.linkText}
							activeClassName={classes.activeLink}
						>
							<ListItem button>
								<Explore />
								<Typography>EXPLORE</Typography>
							</ListItem>
						</NavLink>
						<ListItem onClick={login} button className={classes.loginStyle}>
							<AccountCircle />
							<Typography>LOGIN</Typography>
						</ListItem>
					</>
				)}
			</List>
		</div>
	);

	return (
		<React.Fragment>
			<IconButton
				edge='start'
				aria-label='menu'
				onClick={toggleDrawer("right", true)}
			>
				<Menu fontSize='large' style={{ color: `white` }} />
			</IconButton>

			<Drawer
				anchor='right'
				open={state.right}
				onOpen={toggleDrawer("right", true)}
				onClose={toggleDrawer("right", false)}
			>
				{sideDrawerList("right")}
			</Drawer>
		</React.Fragment>
	);
};

export default SideDrawer;
