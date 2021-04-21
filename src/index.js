import Router from "preact-router";
import RouteDirector from "./router";
import "./assets/global.css"

import {
	Provider,
	createClient,
	dedupExchange,
	fetchExchange,
} from "@urql/preact"

const client = createClient({
	url: "http://localhost:4000",
	exchanges: [
		dedupExchange,
		fetchExchange,
	]
})

export default function Core() {
	return (
		<Provider value={client}>
			<RouteDirector/>
		</Provider>
	);
}
