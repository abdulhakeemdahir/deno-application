import { makeStyles } from "@material-ui/core/styles";

const useNewsStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    color: "#e57373"
  },
  shadow: {
    boxShadow: "none",
    // background: "#f7f7f7",
    borderRadius: "0px !important",
    width: "100%"
  },
  commentStyle: {
    backgroundColor: "#e57373",
    color: "white",
    borderRadius: "50px"
  },
  gridStyle: {
    borderBottom: "1px dashed #e7e7e7",
    paddingBottom: "2px"
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px",
    // marginTop: "10px",
    borderRadius: "0px"
  },
  inputMargin: {
    // margin: "5px",
  }
}));

export default useNewsStyles;
