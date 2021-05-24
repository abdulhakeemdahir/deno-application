import { Divider, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const PayComponentData = ({ handleOpen }) => {
	return (
		<List style={{ padding: "0px 0px 0px 10px" }} component="nav">
			{/* PayPal  */}

			<ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
				<ListItemText primary="PayPal:" />
				<ListItemText primary=" - - - - " />
				<IconButton
					className="editButton"

          // I disabled the onClick for the edit button until we can add PayPal info
					// onClick={() => handleOpen("password")}
					
          edge="end"
					aria-label="edit">
					<EditIcon />
				</IconButton>
			</ListItem>
			<Divider />
		</List>
	);
};

export default PayComponentData;