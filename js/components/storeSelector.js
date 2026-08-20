/**
 * Componente: seleção de supermercado.
 */
window.App = window.App || {};

App.storeSelector = (function () {
  const { el } = App.dom;

  function renderStoreCard(store, onSelect) {
    return el(
      "button",
      {
        class: "store-card",
        type: "button",
        "aria-label": `Ver produtos do ${store.name}`,
        onclick: () => onSelect(store),
      },
      [
        el("span", { class: "store-card__band" }),
        el("div", { class: "store-card__body" }, [
          el("div", { class: "store-card__top" }, [
            el("span", { class: "store-card__icon" }, [store.icon]),
            el(
              "span",
              {
                class: "store-card__status",
                style: store.isOpenNow ? "" : "color:#a5680f;background:#fbf0dd;",
              },
              [store.isOpenNow ? "Aberto agora" : "Fechado agora"]
            ),
          ]),
          el("h3", { class: "store-card__name" }, [store.name]),
          el("div", { class: "store-card__meta" }, [
            el("span", {}, [`📍 ${store.neighborhood}`]),
            el("span", {}, [`🕒 ${store.hours}`]),
          ]),
          el("span", { class: "store-card__cta" }, ["Ver produtos"]),
        ]),
      ]
    );
  }

  function render(container, stores, onSelect) {
    App.dom.clear(container);
    stores.forEach((store) => {
      container.appendChild(renderStoreCard(store, onSelect));
    });
  }

  return { render };
})();
