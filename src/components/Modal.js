import {useRef, useEffect, useState} from "preact/hooks"
import {createPortal} from "preact/compat"
import styles from "./Modal.module.css"

function ClientOnlyPortal({ children, selector }) {
	const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}

export default ({selector, render}) => (
	<ClientOnlyPortal selector={selector}>
		<div class={styles.backdrop}>
			<div class={styles.modal}>
				{render}
			</div>
		</div>
	</ClientOnlyPortal>
)
