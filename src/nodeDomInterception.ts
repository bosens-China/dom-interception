import { JSDOM } from "jsdom";
import { domInterception } from "./domInterception";
import type { Options } from "./domInterception";

/**
 * 在node环境下截取字符串
 *
 */
export function nodeInterception(html: string, options: Partial<Options> = {}) {
  const doc = new JSDOM(``);

  const { window } = doc;
  const { document } = window;

  const el = document.createElement("div");
  el.innerHTML = html;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return domInterception(el.firstElementChild!, options, true);
}
