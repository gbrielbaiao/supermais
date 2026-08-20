/**
 * Utilitários genéricos de DOM.
 */
window.App = window.App || {};

App.dom = (function () {
  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);

    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (key === "class") {
        node.className = value;
      } else if (key === "html") {
        node.innerHTML = value;
      } else if (key.startsWith("on") && typeof value === "function") {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (value !== undefined && value !== null) {
        node.setAttribute(key, value);
      }
    });

    (children || []).forEach((child) => {
      if (child === null || child === undefined) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });

    return node;
  }

  function clear(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function debounce(fn, waitMs) {
    let timeoutId;
    return function debounced(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), waitMs);
    };
  }

  return { qs, el, clear, debounce };
})();
