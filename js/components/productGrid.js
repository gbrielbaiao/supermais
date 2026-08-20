/**
 * Componente: grade de produtos + estados de vazio/carregamento.
 */
window.App = window.App || {};

App.productGrid = (function () {
  const { el, clear } = App.dom;

  function renderSkeleton(container, count) {
    clear(container);
    container.classList.remove("product-grid");
    container.classList.add("product-grid");
    for (let i = 0; i < count; i += 1) {
      container.appendChild(el("div", { class: "skeleton-card" }));
    }
  }

  function renderProducts(container, products) {
    clear(container);
    products.forEach((product) => {
      container.appendChild(App.productCard.render(product));
    });
  }

  function renderEmptyState(container, { title, message, actionLabel, onAction }) {
    clear(container);
    const panel = el("div", { class: "state-panel is-active" }, [
      el("span", { class: "state-panel__icon", "aria-hidden": "true" }, ["🛒"]),
      el("p", { class: "state-panel__title" }, [title]),
      el("p", {}, [message]),
    ]);

    if (actionLabel && onAction) {
      panel.appendChild(
        el(
          "button",
          {
            class: "state-panel__action",
            type: "button",
            onclick: onAction,
          },
          [actionLabel]
        )
      );
    }

    container.appendChild(panel);
  }

  return { renderSkeleton, renderProducts, renderEmptyState };
})();
