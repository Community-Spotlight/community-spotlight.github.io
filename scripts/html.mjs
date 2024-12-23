import {
  Component,
  Fragment,
  cloneElement,
  createContext,
  createElement,
  createRef,
  h,
  hydrate,
  isValidElement,
  options,
  render,
  toChildArray,
} from './preact.mjs';
const Preact = {
  Component,
  Fragment,
  cloneElement,
  createContext,
  createElement,
  createRef,
  h,
  hydrate,
  isValidElement,
  options,
  render,
  toChildArray,
};
import htm from './htm.mjs';
const html = htm.bind(h);
export { Preact, htm, html };
export default { Preact, htm, html };
