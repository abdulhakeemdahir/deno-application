import Main from "./components/main/index";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Gradient from "./components/backgroundGradient/Gradient";
import Footer from "./components/footer";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1dc4e9",
		},
		secondary: { main: "#899fd4" },
		default: { main: "#454545" },
	},
});
function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className='App'>
				<Main />
				<Footer />
				<Gradient />
			</div>
		</MuiThemeProvider>
	);
}

export default App;
