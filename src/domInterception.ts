export interface Options {
  length: number;
  fill: boolean;
}

/**
 * 截取指定长度字符串...
 *
 */
export function domInterception<T extends Node>(
  dom: T,
  options: Partial<Options> = {},
  uncheck?: boolean
) {
  // 开后门，不需要校验在node环境下

  // eslint-disable-next-line prefer-rest-params
  if (!uncheck && !(dom instanceof Node)) {
    throw new Error(
      `Passing a dom element is not a node type! But rather ${Object.prototype.toString.call(
        dom
      )}`
    );
  }

  // 如果没有赋值，则全部返回即可
  if (options.length == null) {
    return {
      dom: dom as T,
      text: dom.textContent ?? "",
    };
  }
  const cloneElement = dom.cloneNode(true);
  let len = Math.max(options.length ?? 0, 0);
  const { fill = true } = options;

  // 向上删除元素
  const deleteBlank = (el: Node | null) => {
    while (el) {
      const parent = el.parentNode;
      parent?.removeChild(el);
      if (!parent?.textContent) {
        el = parent;
      } else {
        break;
      }
    }
  };

  const next = (el: Node) => {
    for (const iterator of Array.from(el.childNodes)) {
      if (len === -1) {
        deleteBlank(iterator);
        continue;
      }
      // 找到文本节点，判断长度
      if (iterator.nodeName === "#text") {
        const text = iterator as Text;
        const textLen = text.length;
        if (textLen > len) {
          if (fill) {
            // 直接截取长度即可
            text.deleteData(len, textLen - len);
          } else {
            deleteBlank(text);
          }
          len = -1;
          continue;
        }
        len -= textLen;

        continue;
      }
      next(iterator);
    }
  };

  next(cloneElement);

  return {
    dom: cloneElement as T,
    text: cloneElement.textContent ?? "",
  };
}
