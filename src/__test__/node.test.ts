/**
 * @jest-environment node
 */

import { nodeInterception } from "../nodeDomInterception";

test(`default`, () => {
  const div = `<h1>test</h1>`;
  const result = nodeInterception(div);

  expect(result.text).toBe("test");
  expect(result.dom.nodeName).toBe("H1");
});
