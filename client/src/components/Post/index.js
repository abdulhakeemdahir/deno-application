// import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import { useState } from "react";
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import api from "../../utils/api.js";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(0),
			width: "100%",
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
		marginTop: "10px",
		borderRadius: "0px",
	},
	inputMargin: {
		margin: "5px",
	},
}));

export default function Post() {
	const classes = useStyles();

	const [createPost, setCreatePost] = useState({
		type:"",
		title: "",
		content: "",
		imageUrl:""
  });

  const handleChange = function(event) {
    const { name, value } = event.target;
    setCreatePost({
      ...createPost,
      [name]: value,
    });
  };

  const [userState, ] = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
		try {
			const post = {
				...createPost,
				author: userState._id,
			}

		if(createPost.type === "Post"){
			await api.createPost(post)
			return 
    	}
		
		await api.createCause(post); 

}catch (err) {
      console.log(err)
    }
}

	
	
    
  

	return (
    <Grid className="cardPost">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl variant="outlined">
          <InputLabel id="post">Post Type</InputLabel>
          <Select
            labelId="post"
            id="post"
            label="post type"
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={"Post"}>Post</MenuItem>
            <MenuItem value={"Cause"}>Cause</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Grid container>
            <TextField
              name="title"
              value={createPost.title}
              onChange={handleChange}
              id="title"
              label="Title"
              multiline
              rowsMax={4}
              className={classes.inputMargin}
              size="small"
            />
            <TextField
              name="imageUrl"
              value={createPost.imageUrl}
              onChange={handleChange}
              id="imageUrl"
              label="Image Url"
              multiline
              rowsMax={4}
              className={classes.inputMargin}
              size="small"
            />
            <TextField
              name="content"
              value={createPost.content}
              onChange={handleChange}
              id="post"
              label="Post a Message"
              variant="filled"
              multiline
              rows={4}
              fullWidth
              size="small"
            />
          </Grid>
        </div>
        <Button
          size="small"
          className={classes.styleMain}
          onClick={handleSubmit}
        >
          <ChatBubbleOutlineIcon /> Post
        </Button>
      </form>
    </Grid>
  );
}
