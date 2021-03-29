// Import all relevant packages and components
import React, { useState, useRef } from "react";
import {
	AppBar,
	Toolbar,
	Container,
	IconButton,
	InputBase,
	CssBaseline,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NavDrawer from "./NavDrawer";
import Logo from "../../images/logo@2x.png";
import {
	useAuthTokenStore,
	useIsAuthenticated,
	useLogout,
} from "../../utils/auth";
import { useHistory } from "react-router-dom";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles(theme => ({
	appBar: {
		boxShadow: "0 8px 32px 0 rgb(31 38 135 / 7%)",
		background: "#3f4d67",
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
		color: `white`,
	},
	logoText: {
		fontWeight: `900`,
		textTransform: `uppercase`,
		color: `white`,
	},
	search: {
		position: "relative",
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		height: "50px",
		top: ".3rem",
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "50%",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: `white`,
	},
	inputRoot: {
		color: "#ffffff",
	},
	inputInput: {
		padding: theme.spacing(2, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "100%",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
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
		borderBottom: "2px solid #e57373",
	},
}));
// Create the component function and export for use
const Nav = () => {
	const navLinks = [
		{ title: `landing`, path: `/` },
		{ title: `explore`, path: `/explore` },
		{ title: `newsfeed`, path: `/newsfeed` },
		{ title: `dashboard`, path: `/dashboard` },
	];
	// Create the set and setState from useState
	const [search, searchState] = useState("");
	// Call the styles function
	const classes = useStyles();
	// Call the logout function
	const logout = useLogout();
	// Call the useHistory function
	const history = useHistory();
	// Call the login function
	const login = () => {
		history.push("/");
	};

	const searchBarRef = useRef();
	const handleInputChange = event => searchBarRef.current.value;
	// Call the useAuth function
	useAuthTokenStore();
	const isAuth = useIsAuthenticated();
	// Create the JSX for the component
	return (
		<CssBaseline>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Container maxWidth='lg' className={classes.navbarDisplayFlex}>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='AccountCircle'
							to='/'
						>
							<img
								src={Logo}
								alt='logo'
								style={{ height: "40px", width: "auto" }}
							/>{" "}
						</IconButton>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
								ref={searchBarRef}
								onChange={handleInputChange}
								fullWidth
							/>
						</div>
						<div className={classes.grow} />

						{/* <Hidden mdUp> */}
						<NavDrawer navLinks={navLinks} />
						{/* </Hidden> */}
					</Container>
				</Toolbar>
			</AppBar>
		</CssBaseline>
	);
};

export default Nav;
