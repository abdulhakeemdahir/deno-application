import { makeStyles } from "@material-ui/core";

const sidebarStyles = makeStyles(theme => ({
  fullConvoList: {
    alignItems: "start",
    position: "relative",
    height: "60vh !important",
    overflowY: "scroll",
    clear: "both",
    "&::-webkit-scrollbar": {
      width: "0"
    }
  },

  autoComplete: {
    marginTop: "1em",
    textAlign: "left",
    height: "fit-content"
  },

  convoStart: {
    float: "left",
    clear: "both"
  },

  convoLists: {
    margin: "0 !important",
    padding: "0 .2em !important",
    width: "100%",
    textAlign: "left"
  },

  convoItems: {
    margin: ".2em !important",
    padding: ".2em !important",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
}));

export default sidebarStyles;
