# Web Components

**Web Components** lets you use native Web Components (`.web.js`) as Astro Components.

**components/Button.web.js**:
```js
export default class Button extends HTMLElement {
  constructor() {
    let host = super()
    let root = host.attachShadow({ mode: 'open' })

    root.innerHTML = `<button><slot></slot></button>`
  }
}

customElements.define('h-button', Button)
```

**pages/index.astro**:
```astro
---
import Button from '../components/Button.web.js'
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Button Example</title>
  </head>
  <body>
    <h1>Button Example</h1>
    <Button>click me</Button>
  </body>
</html>
```

**Rendered HTML**:
```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Button Example</title>
    <script type="module">class o extends HTMLElement{constructor(){let t=super().attachShadow({mode:"open"});t.innerHTML="<button><slot></slot></button>"}}customElements.define("h-button",o)</script>
  </head>
  <body>
    <h1>Button Example</h1>
    <h-button>click me</h-button>
  </body>
</html>
```



## Usage

Install **Web Components** to your project.

```shell
npm install @astropub/web-components
```

Add **Web Components** to your Astro configuration.

```js
import { webcomponents } from '@astropub/web-components'

/** @type {import('astro').AstroUserConfig} */
const config = {
  vite: {
    plugins: [
      webcomponents()
    ]
  }
}

export default config
```

Enjoy!

[![Open in StackBlitz][open-img]][open-url]



## Project Structure

Inside of the project, you'll see the following folders and files:

```
/
├── demo/
│   ├── public/
│   └── src/
│       └── pages/
│           └── index.astro
└── packages/
    └── web-components/
        ├── index.js
        └── package.json
```

This project uses **workspaces** to develop a single package, `@atropub/web-components`.

It also includes a minimal Astro project, `demo`, for developing and demonstrating the plugin.



## Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                       |
|:----------------|:---------------------------------------------|
| `npm install`   | Installs dependencies                        |
| `npm run start` | Starts local dev server at `localhost:3000`  |
| `npm run build` | Build your production site to `./dist/`      |
| `npm run serve` | Preview your build locally, before deploying |

Want to learn more?
Read [our documentation][docs-url] or jump into our [Discord server][chat-url].


[chat-url]: https://astro.build/chat
[docs-url]: https://github.com/withastro/astro
[open-img]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[open-url]: https://stackblitz.com/github/astro-community/web-components/
