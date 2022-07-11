/// <reference no-default-lib="true"/>
/// <reference types="node" />
// @ts-check

import * as fs from 'node:fs'

/** Returns the posix-normalized path from the given path. */
let normalize = (/** @type {string} */ path) => path.replace(/\\+/g, '/').replace(/^(?=[A-Za-z]:\/)/, '/').replace(/%/g, '%25').replace(/\n/g, '%0A').replace(/\r/g, '%0D').replace(/\t/g, '%09')

let extensionForWebComponents = /\.web(\.(js|ts))?$/

export let Element = globalThis.HTMLElement

export function webcomponents() {
	let cacheDir = new URL('/', 'file:')

	/** @type {Plugin} */
	let plugin = {
		name: '@astropub/web-components',
		configResolved(config) {
			cacheDir = new URL(normalize(config.cacheDir) + '/web-components/', 'file:')

			fs.mkdirSync(cacheDir, { recursive: true })

			let plugins = /** @type {Plugin[]} */ (config.plugins)
			let index = plugins.findIndex(configPlugin => configPlugin.name === plugin.name)

			if (index !== -1) {
				plugin = plugins[index]

				plugins.splice(index, 1)
				plugins.unshift(plugin)
			}
		},
		resolveId(importee, importer = '', options) {
			let hasExtensionForWebComponents = extensionForWebComponents.test(importee)
			let hasImportedFromGeneratedFile = importer.startsWith(cacheDir.pathname)
			let hasImportedFromIgnorableFile = !importer || importer.endsWith('.html')

			if (hasExtensionForWebComponents && !hasImportedFromGeneratedFile && !hasImportedFromIgnorableFile) {
				return this.resolve(importee, importer, { ...options, skipSelf: true }).then(
					(resolved) => {
						let originalPath = resolved?.id || ''
						let modifiedPath = new URL(toHash(originalPath) + '.astro', cacheDir).pathname
						let modifiedData = getModifiedData(originalPath)

						fs.writeFileSync(modifiedPath, modifiedData)

						return modifiedPath
					}
				)
			}
		}
	}

	return plugin
}

export default webcomponents

let getModifiedData = (importee = '') => [
	`---`,
	`import Component from '${importee}'`,
	`---`,
	`<script>import '${importee}'</script>`,
	`<Component {...Astro.props}><slot /></Component>`
].join('\n')

let toAlphabeticChar = (/** @type {number} */ code) => String.fromCharCode(code + (code > 25 ? 39 : 97))

let toAlphabeticName = (/** @type {number} */ code) => {
	let name = ''
	let x

	for (x = Math.abs(code); x > 52; x = (x / 52) | 0) name = toAlphabeticChar(x % 52) + name

	return toAlphabeticChar(x % 52) + name
}

let toPhash = (/** @type {number} */ h, /** @type {string} */ x) => {
	let i = x.length
	while (i) h = (h * 33) ^ x.charCodeAt(--i)
	return h
}

let toHash = (/** @type {any} */ value) => toAlphabeticName(
	toPhash(
		5381,
		JSON.stringify(value)
	) >>> 0
)

/** @typedef {import('./index').Plugin} Plugin */
