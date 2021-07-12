import { makeStyles } from "@material-ui/core/styles";

const useFooterStyles = makeStyles({
  footerStyle: {
    width: "100%",
    zIndex: "1",
    color: "#008394 !important",
    padding: 0,
    marginBottom: 0,
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
    display: "flex",
    justifyContent: "center",
    flexFlow: "wrap"
  }
});

export default useFooterStyles;
