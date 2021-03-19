import { Divider, Grid, List, ListItem, Typography } from "@material-ui/core";

export default function Sidebar() {
	return (
		<Grid container class='chat-sidebar'>
			<Grid item>
				<Typography>Room Name:</Typography>
				<Typography>Javascript:</Typography>
				<Divider />
				<List>
					<Typography>Users</Typography>
					<ListItem>
						<Typography>Mike</Typography>
					</ListItem>
				</List>
			</Grid>
		</Grid>
	);
}
