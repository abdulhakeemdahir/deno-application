import { Divider, IconButton, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const PayComponentData = ({ handleOpen }) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

	return (
    <>
    {(() => {
      if (matches)
        return <Divider />;
    })()}
    <List style={!matches ? { paddingLeft: "15px" } : {padding: "0px", margin: "0px"}} component="nav">
			{/* PayPal  */}

			<ListItem style={{ padding: "0px", marginTop: "10px", marginBottom: "10px" }}>
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
    </>
	);
};

export default PayComponentData;