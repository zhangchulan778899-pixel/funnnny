import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../public/portfolio-book/index.html', import.meta.url), 'utf8');
const bridge = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const origin = 'http://localhost:5173';

async function setup({ imageFails = false, initFails = false } = {}) {
  const messages = [];
  const listeners = {};
  const parent = { postMessage: (message, target) => messages.push({ message, target }) };
  const window = { parent, location: { origin }, addEventListener: (type, handler) => { listeners[type] = handler; } };
  vm.runInNewContext(bridge, {
    window,
    pageFlip: { getPageCount: () => { if (initFails) throw new Error('not ready'); return 34; } },
    document: {
      querySelectorAll: () => ({ length: 34 }),
      querySelector: () => ({ decode: () => imageFails ? Promise.reject(new Error('image offline')) : Promise.resolve() }),
    },
  });
  await Promise.resolve();
  return { messages, listeners, parent };
}

test('initialization and cover decode announce readiness to the same origin', async () => {
  const { messages } = await setup();
  assert.equal(messages[0].message.type, 'ready');
  assert.equal(messages[0].target, origin);
});
test('missing image or failed initialization reports a recoverable error', async () => {
  for (const options of [{ imageFails: true }, { initFails: true }]) {
    assert.equal((await setup(options)).messages[0].message.type, 'error');
  }
});
test('only the expected parent may probe; Escape requests modal close', async () => {
  const { messages, listeners, parent } = await setup();
  const probe = { channel: 'portfolio-book', type: 'probe' };
  listeners.message({ source: {}, origin, data: probe });
  listeners.message({ source: parent, origin: 'https://unrelated.example', data: probe });
  assert.equal(messages.length, 1);
  listeners.message({ source: parent, origin, data: probe });
  assert.equal(messages.length, 2);
  let prevented = false;
  listeners.keydown({ key: 'Escape', preventDefault: () => { prevented = true; } });
  assert.equal(messages.at(-1).message.type, 'close');
  assert.equal(prevented, true);
});
