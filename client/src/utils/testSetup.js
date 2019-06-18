// Source: https://airbnb.io/enzyme/docs/guides/jsdom.html
// Only used to set up testing environment, not in production

// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
copyProps(window, global);
