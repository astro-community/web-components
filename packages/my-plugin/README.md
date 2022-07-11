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
