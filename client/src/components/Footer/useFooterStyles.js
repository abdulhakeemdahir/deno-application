import { makeStyles } from "@material-ui/core/styles";

const useFooterStyles = makeStyles({
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0
  },
  footerStyle: {
    width: "100%",
    zIndex: "1",
    color: "#008394 !important",
    textAlign: "center",
    justifyContent: "center"
  },
  heart: {
    color: "#ed4b82"
  },
  footerGrid: {
    marginBottom: "20px"
  },
  devList: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    zIndex: "1",
    color: "#ed4b82 !important",
    textAlign: "center"
  }
});

export default useFooterStyles;
