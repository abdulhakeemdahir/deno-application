// Import all relevant packages and components
import { Grid, Button, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import usePostStyles from "./usePostStyles";
import "./style.css";
import {
  LOADING,
  UPDATE
} from "../../utils/actions/actions";
import findHashtags from "find-hashtags";
import api from "../../utils/api.js";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";
import useForm from "../Forms/Utils/useForm";
import { useValidateLength } from "../Forms/Utils/useValidations";

// Create the component function and export for use
const Post = () => {
  // Destructure State and Dispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  const validateLength = useValidateLength;
  // Call the styles function
  const classes = usePostStyles();

  const { inputs, handleChange, setInputs, clearForm } = useForm({
		type: "",
		title: "",
		titleError: "",
		content: "",
		contentError: "",
		imageUrl: ""
  });

  // Create the handleSubmit function
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const post = {
			...inputs,
			author: globalState.user._id
		};
      //check is there is an image
      if (inputs.imageUrl) {
			post.imageUrl = inputs.imageUrl;
		}
      const hashtags = await findHashtags(inputs.content);
      if (hashtags.length) {
        const createHashtags = await api.createHashtag({ hashtag: hashtags });
        post.hashtags = createHashtags.data._id;
      }
      if (globalState.user.role === "Personal" || inputs.type === "Post") {
			setInputs({
				...inputs,
				type: "Post"
			});
			const { data } = await api.createPost(post);
			if (post.hashtags) {
				await api.updateHashtag(post.hashtags, {
					posts: data._id
				});
			}
			await api.updateUserObjectID(post.author, {
				posts: data._id
			});

			const postInfo = await api.getAllPost();
			dispatch(UPDATE, { posts: postInfo.data, loading: false });

			const hashInfo = await api.getHashtagAll();
			dispatch(UPDATE, { hashtag: hashInfo.data, loading: false });
		} else {
			const { data } = await api.createCause(post);
			if (post.hashtags) {
				await api.updateHashtag(post.hashtags, {
					causes: data._id
				});
			}

			await api.updateUserObjectID(post.author, {
				causes: data._id
			});
			const causes = await api.getAllCauses();
			dispatch(UPDATE, { causes: causes.data, loading: false });
		}

      const userInfo = await api.getUser(globalState.user._id);
      dispatch(UPDATE, { user: userInfo.data, loading: false });

      clearForm();
    } catch (err) {}
  };

  const dispatch = async (action, payload) => {
    await globalDispatch({ type: LOADING });
    await globalDispatch({
      type: action,
      payload: {
        ...payload,
      },
    });
    return;
  };

  const validate = (event) => validateLength(event, setInputs, inputs);
  // Create the JSX for the component
  return (
		<Grid className="cardPost">
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}>
				{globalState.user.role === "Personal" ? null : (
					<FormControl variant="outlined">
						<InputLabel id="post">Post Type</InputLabel>
						<Select
							labelId="post"
							id="post"
							label="post type"
							name="type"
							onChange={handleChange}>
							<MenuItem value={"Post"}>Post</MenuItem>
							<MenuItem value={"Cause"}>Cause</MenuItem>
						</Select>
					</FormControl>
				)}
				<div>
					<Grid container>
						<TextField
							error={inputs.titleError}
							helperText={inputs.titleError}
							name="title"
							value={inputs.title}
							onChange={handleChange}
							onBlur={validate}
							id="title"
							// label='Title'
							placeholder="Enter Title"
							className="postBackground"
							size="small"
							variant="outlined"
							fullWidth
						/>

						<TextField
							error={inputs.contentError}
							helperText={inputs.contentError}
							name="content"
							value={inputs.content}
							onChange={handleChange}
							onBlur={validate}
							id="post"
							// label='Post'
							placeholder="Post a Message"
							variant="outlined"
							multiline
							rows={4}
							fullWidth
							size="small"
							className="postBackground"
						/>
					</Grid>
				</div>

				<TextField
					type="file"
					name="imageUrl"
					onChange={handleChange}
					value={""}
					variant="outlined"
				/>
				<Button
					type="submit"
					size="small"
					className={classes.styleMain}>
					<ChatBubbleOutlineIcon /> Post
				</Button>
			</form>
			{inputs.imageUrl && (
				<img
					src={inputs.imageUrl}
					alt="chosen"
					className={classes.imgStyle}
				/>
			)}
		</Grid>
  );
};

export default Post;
