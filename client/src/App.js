import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Landing";
import Main from "./containers/Main/Main";

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
					<Switch>
						<Route path='/main' exact component={Main} />
						<Route path='/' exact component={Landing} />
					</Switch>
				</div>
			</MuiThemeProvider>
		</Router>
	);
}

export default App;
