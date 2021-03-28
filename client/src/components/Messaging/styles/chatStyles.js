import { makeStyles } from "@material-ui/core/styles";

const chatStyles = makeStyles(theme => ({
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px"
  },

  chatContainer: {
    position: "relative",
    height: "60vh",
    overflowY: "scroll",
    clear: "both",
    "&::-webkit-scrollbar": {
      width: "0"
    }
  },

  bubbleContainer: {
    width: "100%",
    display: "flex",
    flexFlow: "column wrap"
  },

  bubbleMe: {
    color: "white",
    backgroundColor: "#a36fad",
    borderRadius: "10px 10px 0 10px",
    padding: "0 1em",
    display: "inline-block"
  },

  bubbleThem: {
    backgroundColor: "#dedede",
    borderRadius: "10px 10px 10px 0",
    padding: "0 1em",
    display: "inline-block"
  },

  fromMe: {
    display: "flex",
    justifyContent: "flex-end"
  },

  fromThem: {
    display: "flex",
    justifyContent: "flex-start"
  }
}));

export default chatStyles;
