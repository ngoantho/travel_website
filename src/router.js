import "milligram/dist/milligram.min.css"
import Router from "preact-router";
import Home from "./pages/home";

export default () => (
	<div id="app">
		<Router>
			<Home path="/" />
		</Router>
	</div>
)
