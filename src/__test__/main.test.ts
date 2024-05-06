import { domInterception } from "../main";

test(`default`, () => {
  const text = "test";
  const div = document.createElement("div");
  div.innerHTML = text;

  expect(domInterception(div).text).toBe("");
  expect(domInterception(div, { length: 6 }).text).toBe(text);
  expect(domInterception(div).dom).not.toBe(div);

  expect(domInterception(div, { fill: false, length: text.length }).text).toBe(
    text
  );
  expect(
    domInterception(div, { fill: false, length: text.length }).dom
  ).not.toBe(div);
});

test(`intercept`, () => {
  const text = `<h1>协议</h1>
  <p>更新日期：2023 年 9 月 10 日 <br>
  生效日期：2023 年 9 月 15 日</p>
  <p>欢迎您来到。</p>`;
  const div = document.createElement("div");
  div.innerHTML = text;

  const { text: t, dom } = domInterception(div, { length: 10 });
  expect(t).toBe(`协议\n  更新日期：`);
  expect(t).toHaveLength(10);
  expect(dom).not.toBe(div);
  expect(dom.innerHTML).toBe(`<h1>协议</h1>\n  <p>更新日期：</p>`);
});

test(`intercept not fill`, () => {
  const text = `<h1>协议</h1>
  <p>更新日期：2023 年 9 月 10 日 <br>
  生效日期：2023 年 9 月 15 日</p>
  <p>欢迎您来到。</p>`;
  const div = document.createElement("div");
  div.innerHTML = text;

  const { text: t, dom } = domInterception(div, { length: 10, fill: false });
  expect(t).toBe(`协议\n  `);
  expect(t).toHaveLength(5);
  expect(dom).not.toBe(div);
  expect(dom.innerHTML).toBe(`<h1>协议</h1>\n  `);
});

test(`Mixed elements`, () => {
  const text = `<h1>协议</h1><img src="test.com.png" /><video src="test/video.mp4"></video><p>欢迎您来到。</p>`;
  const div = document.createElement("div");
  div.innerHTML = text;

  const { text: t, dom } = domInterception(div, { length: 5 });
  expect(t).toBe(`协议欢迎您`);
  expect(t).toHaveLength(5);
  expect(dom).not.toBe(div);
  expect(dom.innerHTML).toBe(
    `<h1>协议</h1><img src="test.com.png"><video src="test/video.mp4"></video><p>欢迎您</p>`
  );
});

test(`edge case`, () => {
  const text = `<h1>协议</h1><p>欢迎您来到。</p>`;
  const div = document.createElement("div");
  div.innerHTML = text;

  const { text: t, dom } = domInterception(div, { length: -100 });
  expect(t).toBe(``);
  expect(dom).not.toBe(div);

  expect(() => domInterception(123 as never)).toThrow(
    "Passing a dom element is not a"
  );
});
