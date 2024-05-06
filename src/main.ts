export interface Options {
  length: number;
  fill: boolean;
}

export function domInterception<T extends Node>(
  dom: T,
  options: Partial<Options> = {}
) {
  if (!(dom instanceof Node)) {
    throw new Error(
      `Passing a dom element is not a node type! But rather ${Object.prototype.toString.call(
        dom
      )}`
    );
  }

  let len = Math.max(options.length ?? 0, 0);
  const { fill = true } = options;
  const cloneElement = dom.cloneNode(true);

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

export default domInterception;
