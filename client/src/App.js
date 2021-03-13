import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Landing";
import Gradient from "./components/backgroundGradient/Gradient";
import Footer from "./components/footer";
import Main from "./containers/Main";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1dc4e9",
		},
		secondary: { main: "#d500f9" },
		default: {
			main: "#454545",
			// second: "#899fd4"
		},
	},
});
function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className='App'>
				{/* <Landing /> */}
				<Main />
				<Footer />
				<Gradient />
			</div>
		</MuiThemeProvider>
	);
}

export default App;
