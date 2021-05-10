import { Divider, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useGlobalContext } from "../../../../utils/GlobalStates/GlobalState";



const SalComponentData = ({ handleOpen }) => {
	const [globalState] = useGlobalContext();

	return (
		<List style={{ padding: "0px 0px 0px 10px" }} component="nav">
			{/* Username  */}

			<ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
				<ListItemText primary="Username:" />
				<ListItemText primary={`${globalState.user.username}`} />
				<IconButton
					className="editButton"
					onClick={() => handleOpen("username")}
					edge="end"
					aria-label="edit">
					<EditIcon />
				</IconButton>
			</ListItem>
			<Divider />

			{/* Password  */}

			<ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
				<ListItemText primary="Password:" />
				<ListItemText primary="****" />
				<IconButton
					className="editButton"
					onClick={() => handleOpen("password")}
					edge="end"
					aria-label="edit">
					<EditIcon />
				</IconButton>
			</ListItem>
			<Divider />
		</List>
	);
};

export default SalComponentData;