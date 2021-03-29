import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button, ButtonGroup, List, ListItem } from "@material-ui/core";
import updateFormStyles from "../useStyles/formStyles";

const FormUserConfirm = props => {
  const continueOne = async e => {
    e.preventDefault();

    await props.handleSubmit();

    props.nextStep();
  };
  const previousOne = e => {
    e.preventDefault();
    props.previousStep();
  };

  const {
    values: {
      firstName,
      lastname,
      role,
      email,
      username,
      password,
      bio,
      thumbnail
    }
  } = props;
  const classes = updateFormStyles();

  return (
    <>
      <List>
        <ListItem primaryText="First Name" secondaryText={firstName} />
        <ListItem primaryText="Last Name" secondaryText={lastname} />
        <ListItem primaryText="E-mail" secondaryText={email} />
        <ListItem primaryText="Bio" secondaryText={bio} />
        <ListItem primaryText="Thumbnail Picture" secondaryText={thumbnail} />
        <ListItem primaryText="Role" secondaryText={role} />
      </List>
      <ButtonGroup fullWidth>
        <Button
          size="large"
          className={classes.styleSecondary}
          onClick={previousOne}
        >
          Go Back
        </Button>
        <Button
          size="large"
          className={classes.styleMain}
          onClick={continueOne}
        >
          Submit
        </Button>
      </ButtonGroup>
    </>
  );
};

export default FormUserConfirm;
