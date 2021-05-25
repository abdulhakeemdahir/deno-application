// Import all relevant packages and components
import { Grid, Button, TextField } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./style.css";
// Create a useStyles Material UI component for styling

import api from "../../../utils/api";
import useUpdateStyles from "../useStyles/useUpdateStyles";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { LOADING, UPDATE } from "../../../utils/actions/actions";
import useForm from "../Utils/useForm";

const UpdateCause = props => {
  // Call the styles function
  const classes = useUpdateStyles();
  const [globalState, globalDispatch] = useGlobalContext();
  const { inputs, handleChange, resetForms } = useForm({
		title: "",
		content: "",
		imageUrl: ""
  });

  const handleSubmit = async event => {
    event.preventDefault();
    const updateUser = {};
    if (inputs.title !== "") {
		updateUser.title = inputs.title;
	}
    if (inputs.content !== "") {
		updateUser.content = inputs.content;
	}
    //*Associated with cloudinary
    if (inputs.imageUrl !== "") {
		updateUser.imageUrl = inputs.imageUrl;
	}

    await updateCause(updateUser);
    props.onClose();
  };

  //*update post by sending post id and update object
  const updateCause = async update => {
   await api.updateCause(props.id, update);

   const { data } = await api.getUser(globalState.user._id);
   await globalDispatch({
		type: LOADING
   });

   await globalDispatch({
		type: UPDATE,
		payload: {
			user: { ...data },
			loading: false
		}
   });

  };
  // Create the JSX for the component
  return (
		<Grid className="cardPost">
			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<Grid container>
						<TextField
							id="title"
							label="Edit Title"
							name="title"
							value={inputs.title}
							onChange={handleChange}
							multiline
							rowsMax={4}
							className={classes.inputMargin}
							size="small"
						/>
						<TextField
							id="imageUrl"
							label=" Edit Image Url"
							multiline
							rowsMax={4}
							className={classes.inputMargin}
							size="small"
						/>
						<TextField
							id="post"
							label="Edit Cause"
							name="content"
							value={inputs.content}
							onChange={handleChange}
							variant="filled"
							multiline
							rows={4}
							fullWidth
							size="small"
						/>
						<TextField
							type="file"
							name="image"
							onChange={handleChange}
							value={inputs.imageUrl}
							variant="outlined"
						/>
					</Grid>
				</div>
				<Button
					size="small"
					className={classes.styleMain}
					onClick={handleSubmit}>
					<ChatBubbleOutlineIcon /> Update
				</Button>
			</form>
			{inputs.imageUrl !== "" && (
				<img
					src={inputs.imageUrl}
					alt="chosen"
					className={classes.imgStyle}
				/>
			)}
		</Grid>
  );
};

export default UpdateCause;