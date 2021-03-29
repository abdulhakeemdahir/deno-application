import { makeStyles } from "@material-ui/core/styles";

const useNavDrawerStyles = makeStyles({
  list: {
    width: 250
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    padding: "10px"
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
    color: "#e57373"
  },
  spanStyle: {
    margin: "10px"
  }
});

export default useNavDrawerStyles;
