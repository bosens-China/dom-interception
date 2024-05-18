# dom-interception

[中文文档](./README_ZH.md)

Intercept the content of DOM elements or rich text editors without losing the hierarchical structure.

When do you need it?

Imagine a scenario where content needs to be restricted, for example, only allowing more content to be viewed after payment. For security reasons, it may be necessary to layer the content. This tool can help you achieve that.

## Usage

```txt
npm i dom-interception
```

```txt
yarn i dom-interception
```

```txt
pnpm i dom-interception
```

```js
import { domInterception } from "dom-interception";

const text = `<h1>Protocol</h1><img src="test.com.png" /><video src="test/video.mp4"></video><p>Welcome.</p>`;
const div = document.createElement("div");
div.innerHTML = text;

const { text: t, dom } = domInterception(div, { length: 5 });
console.log(t); // ProtocolWelcome
console.log(dom.innerHTML); // <h1>Protocol</h1><img src="test.com.png"><video src="test/video.mp4"></video><p>Welcome</p>
```

## Options

```js
export interface Options {
  length?: number;
  fill?: boolean;
}
```

### length

- type: number

The length to be intercepted. By default, it does not intercept and returns all content.

### fill

- type: `boolean`
- default: `true`

Whether to fill the intercepted content to exactly match the length. For example, if length is set to 200 and fill is true, it will intercept exactly 200 characters.

If false, it will remove the exceeding nodes. You can see the following test example.

- fill `false`

```js
import { domInterception } from "dom-interception";

const text = `<h1>Protocol</h1><p>Updated: September 10, 2023 <br>Effective: September 15, 2023</p><p>Welcome.</p>`;
const div = document.createElement("div");
div.innerHTML = text;

const { text: t, dom } = domInterception(div, { length: 10, fill: false });
console.log(t); // Protocol
console.log(dom.innerHTML); // <h1>Protocol</h1>
```

- fill `true`

```js
import { domInterception } from "dom-interception";

const text = `<h1>Protocol</h1><p>Updated: September 10, 2023 <br>Effective: September 15, 2023</p><p>Welcome.</p>`;
const div = document.createElement("div");
div.innerHTML = text;

const { text: t, dom } = domInterception(div, { length: 10 });
console.log(t); // Protocol Updated: Sep
console.log(dom.innerHTML); // <h1>Protocol</h1><p>Updated: Sep</p>
```

## Usage in Node

```js
import { nodeInterception } from "dom-interception/node";

const div = `<h1>Protocol</h1><p>Updated: September 10, 2023 <br>Effective: September 15, 2023</p><p>Welcome.</p>`;

const div = `<h1>test</h1>`;
const result = nodeInterception(div);

expect(result.text).toBe("test");
expect(result.dom.nodeName).toBe("H1");
```

## License

MIT
