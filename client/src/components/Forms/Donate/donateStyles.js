import { makeStyles } from "@material-ui/core";

const donateStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
      width: "100%"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "0px"
  },
  inputMargin: {
    margin: "5px"
  },
  textStyle: {
    textAlign: "center"
  }
}));

export default donateStyles;
