// import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./style.css";
import { useState } from "react";
import api from "../../../utils/api";
import donateStyles from "./donateStyles";

const Donate = props => {
  const classes = donateStyles();
  const [donateState, setDonateState] = useState({
    amount: "",
    title: props.title
  });

  const handleChange = function(event) {
    const { name, value } = event.target;
    setDonateState({
      ...donateState,
      [name]: value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    //Todo please add a nice styling for validation numbers
    if (!donateState.amount.match(/^\d+/)) {
      alert("numbers only");
      return;
    }
    const pay = await api.donate(donateState);

    console.log(donateState);
  };

  return (
    <Grid className="cardPost">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <Grid container>
            <Typography variant="h6" className={classes.textStyle}>
              Please Support this Cause!
            </Typography>
            <TextField
              name="amount"
              value={donateState.amount}
              onChange={handleChange}
              id="donate"
              label="Donation Amount"
              variant="filled"
              fullWidth
              size="small"
            />
          </Grid>
        </div>
        <Button size="small" type="submit" className={classes.styleMain}>
          <ChatBubbleOutlineIcon /> Donate
        </Button>
      </form>
    </Grid>
  );
};

export default Donate;
