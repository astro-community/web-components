// @ts-check

import { defineConfig } from 'astro/config';
import webcomponents from '@astropub/web-components'

export default defineConfig({
	vite: {
		plugins: [
			webcomponents()
		]
	}
})
