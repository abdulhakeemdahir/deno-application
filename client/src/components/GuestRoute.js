// Import all relevant packages and components
import { Route, Redirect } from "react-router-dom";
import { useIsAuthenticated } from "../utils/auth.js";
// Create the component function and export for use
const GuestRoute = ({
	component: Component,
	children,
	redirectTo = "/",
	...props
}) => {
	const isAuth = useIsAuthenticated();

	const render = ({ location }) =>
		isAuth ? (
			<Redirect to={{ pathname: redirectTo, state: { from: location } }} />
		) : Component ? (
			<Component />
		) : (
			children
		);

	return <Route {...props} render={render} />;
};

export default GuestRoute;
