import { fade, makeStyles } from "@material-ui/core";

const useNavStyles = makeStyles(theme => ({
  appBar: {
    // boxShadow: "0 3.42857px 23px rgba(0, 0, 0, 0.1)",
    boxShadow: "0 8px 32px 0 rgb(31 38 135 / 7%)",
    background: "#3f4d67"
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  },
  logoText: {
    fontWeight: `900`,
    textTransform: `uppercase`,
    color: `white`
  },
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    // marginRight: theme.spacing(0),
    marginLeft: 0,
    height: "50px",
    top: ".3rem",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // marginLeft: theme.spacing(3),
      width: "50%"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: `white`
  },
  inputRoot: {
    color: "#ffffff"
  },
  inputInput: {
    padding: theme.spacing(2, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "70%",
    [theme.breakpoints.up("md")]: {
      width: "90%"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  logoutStyle: {
    background: "linear-gradient(-135deg, #e57373, #f06292)",
    color: "white",
    textDecoration: "none"
  },
  loginStyle: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "white",
    textDecoration: "none"
  },
  activeLink: {
    borderBottom: "2px solid #e57373"
  }
}));

export default useNavStyles;
