import styles from "./HomeHero.module.css"
import Modal from "./Modal"
import SearchBox from "./SearchBox"
import { useState } from "preact/hooks"

export default ({ text }) => {
	const [open, setOpen] = useState(true);

	return (
		<div class={styles.wrapper}>
			<div class={styles.bg}></div>
			<div class={[styles.overlay, "container"].join(" ")}>
				<div class={[styles.row_title, "row"].join(" ")}>
					<h1>{text}</h1>
				</div>
				<div class={[styles.row_search, "row"].join(" ")}>
					<div class="column">
						<input 
							type="text" 
							placeholder="Search your destination"
						/>
						<Modal selector="#modal" render={<SearchBox/>}></Modal>
					</div>
					<div class={[styles.fit_content, "column"]}>
						<input type="submit" value="Go" class="button-outline" />
					</div>
				</div>
			</div>
		</div>
	)
}
