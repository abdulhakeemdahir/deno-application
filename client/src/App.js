import Main from "./components/main/index";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1dc4e9",
		},
		secondary: { main: "#1de9b6" },
		default: { main: "#454545" },
	},
});
function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className='App'>
				<Main />
			</div>
		</MuiThemeProvider>
	);
}

export default App;
