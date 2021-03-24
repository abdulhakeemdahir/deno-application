import React from "react";
import {
	Typography,
	Grid,
	Divider,
	CardContent,
	CardMedia,
	Button,
	ButtonGroup,
} from "@material-ui/core";
//import CreditCardIcon from "@material-ui/icons/CreditCard";
import "./style.css";
import { ThumbUpAlt } from "@material-ui/icons";
import api from "../../utils/api";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import {
  USER_LOADING,
  UPDATE_USER,
} from "../../utils/actions/actions";

export default function Causes(props) {
	const [userState, userDispatch] = useUserContext();
	const handleFollow = async (id) => {
    if(userState.role === "Organization"){
      //TODO error message
      console.log("you are an organization");
      return
    }
    await api.updateUser(userState._id, {
        causes: id,
      });	
    const userInfo = await api.getUser(userState._id);

    await userDispatch({ type: USER_LOADING });

    await userDispatch({
      type: UPDATE_USER,
      payload: {
      ...userInfo.data,
      loading: false,
      },
    });
      	console.log(id);
};

	const handleSupport = (id) => {
      console.log(id);
    };

	return (
    <Grid item className="card">
      <Grid container className="headerContainer">
        <Grid item xs={9}>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            {props.title}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <CardMedia className={"media"} image={props.image} />
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {props.post}
            </Typography>
          </CardContent>
        </Grid>
        <ButtonGroup justify="center" fullWidth>
          <Button
            size="large"
            className="styleButton"
            onClick={() => handleSupport(props.id)}
            fullWidth
            id={props.id}
          >
            <i class="fab fa-paypal"></i>
            Support
          </Button>
          <Button
            size="large"
            className="followButton"
            onClick={() => handleFollow(props.id)}
            fullWidth
          >
            <ThumbUpAlt /> Follow
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
