import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Public/Landing";
import Explore from "./containers/Public/Explore";
import Newsfeed from "./containers/Private/Newsfeed";
import Dashboard from "./containers/Private/Dashboard";
import { UserProvider } from "./utils/GlobalStates/UserContext";
import { CauseProvider } from "./utils/GlobalStates/CauseContext";
import { PostProvider } from "./utils/GlobalStates/PostContext";
import { useAuthTokenStore } from "./utils/auth.js";
import { useSocketConnection } from "./utils/GlobalStates/SocketProvider";
// import { ConvoProvider } from "./utils/GlobalStates/ConvoContext";
import PrivateRoute from "./components/PrivateRoute.js";
import { useStoreContext } from "./utils/GlobalStates/AuthStore";
import Chatroom from "./containers/Private/Chatroom";
import SinglePost from "./containers/SinglePost";
import Analytics from "./containers/Private/Analytics";
import ErrorPage from "./containers/Public/ErrorPage";
//import GuestRoute from "./components/GuestRoute.js"

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

	useSocketConnection();

	useAuthTokenStore();

	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<div className='App'>
					<UserProvider>
						<CauseProvider>
							<PostProvider>
								<Switch>
									<PrivateRoute
										exact
										path='/newsfeed'
										redirectTo='/'
										component={Newsfeed}
									/>

									<PrivateRoute
										exact
										path='/dashboard'
										redirectTo='/'
										component={Dashboard}
									/>
									<PrivateRoute
										exact
										path='/chatroom'
										redirectTo='/'
										component={Chatroom}
									/>

									<Route path='/explore' exact component={Explore} />
									<Route path='/post' exact component={SinglePost} />
									<Route path='/analytics' exact component={Analytics} />
									<Route path='/404' exact component={ErrorPage} />

									<Route path='/' exact component={Landing} />
								</Switch>
							</PostProvider>
						</CauseProvider>
					</UserProvider>
				</div>
			</MuiThemeProvider>
		</Router>
	);
}

export default App;
