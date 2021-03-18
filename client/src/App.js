import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Landing";
import Main from "./containers/Newsfeed";
import Dashboard from "./containers/Dashboard";
import { UserProvider } from "./utils/GlobalStates/UserContext";
import { CauseProvider } from "./utils/GlobalStates/CauseContext";
import { NewsProvider } from "./utils/GlobalStates/NewsContext";
import { PostProvider } from "./utils/GlobalStates/PostContext";
import { TrendProvider } from "./utils/GlobalStates/TrendContext";
import { useAuthTokenStore } from "./utils/auth.js";

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
	useAuthTokenStore();

	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<div className='App'>
					<UserProvider>
						<CauseProvider>
							<NewsProvider>
								<PostProvider>
									<TrendProvider>
										<Switch>
											<Route path='/newsfeed' exact component={Main} />
											<Route path='/dashboard' exact component={Dashboard} />
											<Route path='/' exact component={Landing} />
										</Switch>
									</TrendProvider>
								</PostProvider>
							</NewsProvider>
						</CauseProvider>
					</UserProvider>
				</div>
			</MuiThemeProvider>
		</Router>
	);
}

export default App;
