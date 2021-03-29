// Import all relevant packages and components
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./utils/GlobalStates/AuthStore";
// Render the Application
ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
