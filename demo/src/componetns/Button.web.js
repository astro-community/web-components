
export default class Button extends HTMLElement {
	constructor() {
		let host = super()
		let root = host.attachShadow({ mode: 'open' })

		root.innerHTML = `<button><slot></slot></button>`
	}
}

customElements.define('h-button', Button)
