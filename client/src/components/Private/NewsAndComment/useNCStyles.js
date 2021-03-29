import { makeStyles } from "@material-ui/core/styles";

const useNCStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    color: "#E57373"
  },
  shadow: {
    boxShadow: "none",
    // background: "#F7F7F7",
    borderRadius: "0px !important",
    width: "100%"
  },
  commentStyle: {
    backgroundColor: "#E57373",
    color: "white",
    borderRadius: "50px"
  },
  gridStyle: {
    borderBottom: "1px dashed #E7E7E7",
    paddingBottom: "2px"
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1DE9B6,#1DC4E9)",
    color: "#FFFFFF",
    padding: "15px",
    // marginTop: "10px",
    borderRadius: "0px"
  },
  inputMargin: {
    // margin: "5px",
  }
}));

export default useNCStyles;
