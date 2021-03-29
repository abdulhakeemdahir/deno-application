import { makeStyles } from "@material-ui/core/styles";

const useFooterStyles = makeStyles({
  footerStyle: {
    // bottom: "20px",
    position: "relative",
    // height: "45vh",
    width: "100%",
    zIndex: "1",
    color: "#008394 !important",
    // padding: "10px",
    textAlign: "center",
    justifyContent: "center"
  },
  heart: {
    color: "#ed4b82"
  },
  bottomPadding: {
    marginBottom: "20px"
  },
  linkedIn: {
    position: "relative",
    width: "100%",
    zIndex: "1",
    color: "#ed4b82 !important",
    textAlign: "center",
    justifyContent: "center"
  }
});

export default useFooterStyles;
