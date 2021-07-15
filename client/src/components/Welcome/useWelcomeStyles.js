import { makeStyles } from "@material-ui/core/styles";

const useWelcomeStyles = makeStyles({
  welcomeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: ".25em",
    textAlign: "center",
    flexFlow: "column"
  },

  logoContainer: {
    maxWidth: "80px"
  },

  logo: {
    width: "100%"
  }
});

export default useWelcomeStyles;
