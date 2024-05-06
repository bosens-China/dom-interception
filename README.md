# dom-interception

对 dom 元素或者富文本编辑器进行内容截取，不会丧失层级关系。

什么时候需要它？

想象下如果有一个场景，需要对内容进行限制，例如只有付费之后才能查看更多内容，为了安全起见可能需要对内容进行分层。
这个工具可以辅助你完成上述工作。

## 使用方式

```sh
npm i dom-interception
```

```sh
yarn i dom-interception
```

```sh
pnpm i dom-interception
```

```js
import domInterception from "dom-interception";

const text = `<h1>协议</h1><img src="test.com.png" /><video src="test/video.mp4"></video><p>欢迎您来到。</p>`;
const div = document.createElement("div");
div.innerHTML = text;

const { text: t, dom } = domInterception(div, { length: 5 });
console.log(t); // 协议欢迎您
console.log(dom.innerHTML); // <h1>协议</h1><img src="test.com.png"><video src="test/video.mp4"></video><p>欢迎您</p>
```

## 选项

```js
export interface Options {
  length: number;
  fill: boolean;
}
```

### length

- type: `number`

需要截取的长度

### fill

- type: `boolean`
- default: `true`

是否填充截取长度刚好等于 `length`，例如 length 设置为 200 fill 为 `true`，则会截取刚好为 200 字符。

如果为 `false`，则删除超出节点，可以看下面这个测试例子。

- fill `false`

```js
import domInterception from "dom-interception";

const text = `<h1>协议</h1><p>更新日期：2023 年 9 月 10 日 <br>生效日期：2023 年 9 月 15 日</p><p>欢迎您来到。</p>`;
const div = document.createElement("div");
div.innerHTML = text;

const { text: t, dom } = domInterception(div, { length: 10, fill: false });
console.log(t); // 协议
console.log(dom.innerHTML); // <h1>协议</h1>
```

- fill `true`

```js
import domInterception from "dom-interception";

const text = `<h1>协议</h1><p>更新日期：2023 年 9 月 10 日 <br>生效日期：2023 年 9 月 15 日</p><p>欢迎您来到。</p>`;
const div = document.createElement("div");
div.innerHTML = text;

const { text: t, dom } = domInterception(div, { length: 10 });
console.log(t); // 协议更新日期：202
console.log(dom.innerHTML); // <h1>协议</h1><p>更新日期：202</p>
```

## 协议

MIT
