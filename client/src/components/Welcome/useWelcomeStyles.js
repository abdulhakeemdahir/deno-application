import { makeStyles } from "@material-ui/core/styles";

const useWelcomeStyles = makeStyles({
  paper: {
    background:
      "linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
    borderRadius: "10px",
    boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
    padding: "20px"
  },
  centerPosition: {
    padding: "20px",
    textAlign: "center"
  },
  centerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  bgstyle: {
    color: "#3f4d67"
  },
  mgstyle: {
    marginTop: "5px",
    marginBottom: "5px"
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px"
  },
  styleSecondary: {
    background: "linear-gradient(-135deg,#899fd4,#a389d4)",
    color: "#ffffff"
  },
  linkStyle: {
    textDecoration: "none !important"
  }
});

export default useWelcomeStyles;
