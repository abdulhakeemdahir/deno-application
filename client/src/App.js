import { Route, BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Landing";
import Gradient from "./components/Gradient";
import Footer from "./components/Footer";
import Main from "./containers/Main";
import Signup from "./components/forms/Signup";

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
		<Router>
			<MuiThemeProvider theme={theme}>
				<div className='App'>
					<Route path='/' exact component={Landing} />
					<Route path='/main' exact component={Main} />
				</div>
			</MuiThemeProvider>
		</Router>
	);
}

export default App;
