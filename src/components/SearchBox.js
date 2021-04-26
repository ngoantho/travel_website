import styles from "./SearchBox.module.css"

import {useQuery} from "@urql/preact"
import gql from "graphql-tag";

import {useState} from "preact/hooks"

const SEARCH_QUERY = gql`
	query SearchQuery($filter: String) {
		places(filter: $filter) {
			id,
			city,
			state,
			country {
				id
				name
			}
		}
		countries(filter: $filter) {
			id,
			name
		}
	}
`

let Results = ({ filter, onSelect }) => {
	const [result] = useQuery({
		query: SEARCH_QUERY,
		variables: { filter }
	})
	const { data, fetching, error } = result;

	if (fetching) return <strong>Fetching</strong>
	if (error) return <strong>Error</strong>

	const { places, countries } = data;

	return (
		<table>
			<tbody>
				{places.map((place) => (
					<tr>
						<ResultLink key={place.id} onSelect={onSelect} {...place} />
					</tr>
				))}
				{countries.map((country) => (
					<tr>
						<ResultLink key={country.id} onSelect={onSelect} country={country} />
					</tr>
				))}
			</tbody>
		</table>
	)
}

let ResultLink = ({ onSelect, country: countryObj, ...place }) => {
	let {id: countryId, name: country} = countryObj;
	let {id: placeId, city, state} = place;

	let handleClick = () => onSelect({
		placeId, countryId
	})

	return (
		<td 
			class={styles.result_link}
			onClick={handleClick}
		>
			{city ? 
			<>
				<div>
					<strong>{city}</strong>
				</div>
				<div>
					{`${state ? state + ", " : ""}${country}`}
				</div>
			</>
			: <strong>{country}</strong>}
		</td>
	)
};

export default ({
	onClose = () => {},
	onSelect = () => {}
}) => {
	const [filter, setFilter] = useState("")

	return (<>
		<div class={styles.main_row}>
			<input 
				type="text" 
				placeholder="Search your destination"
				class={styles.input}
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				autofocus
			/>
			<button 
				class={["button-clear", styles.close_btn].join(" ")}
				onClick={onClose}
			>
				✕
			</button>
		</div>
		{filter ? <Results filter={filter} onSelect={onSelect} /> : null}
	</>)
};
