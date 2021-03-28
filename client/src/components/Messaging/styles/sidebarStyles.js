import { makeStyles } from "@material-ui/core";

const sidebarStyles = makeStyles(theme => ({
  chatSidebar: {
    alignItems: "start",
    position: "relative",
    height: "60vh",
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

  convoLists: {
    margin: "0 !important",
    padding: "0 .2em !important",
    width: "100%",
    textAlign: "left"
  },

  convoItems: {
    margin: ".2em !important",
    padding: ".2em !important",
    width: "100%"
  }
}));

export default sidebarStyles;
