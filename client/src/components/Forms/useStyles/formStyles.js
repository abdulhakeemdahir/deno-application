import { makeStyles } from "@material-ui/core/styles";

const updateFormStyles = makeStyles(theme => ({
  paper: {
    background:
      "linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
    borderRadius: "0px",
    boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
    padding: "20px"
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
    background: "linear-gradient(-135deg, #899fd4, #a389d4)",
    color: "#ffffff",
    padding: "15px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },

  styleIcon: {
    background: "#3f4d67"
  },

  imgStyle: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "5px"
  }
}));

export default updateFormStyles;
