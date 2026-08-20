/**
 * Componente: card de produto.
 */
window.App = window.App || {};

App.productCard = (function () {
  const { el } = App.dom;
  const { price, stockInfo } = App.format;

  function render(product) {
    const stock = stockInfo(product.stock);
    const categoryMeta = AppData.categories.find((c) => c.id === product.category);

    return el("article", { class: "product-card" }, [
      el("div", { class: "product-card__top" }, [
        el("span", { class: "product-card__icon" }, [product.icon]),
        el("span", { class: "product-card__category" }, [categoryMeta ? categoryMeta.label : product.category]),
      ]),
      el("h3", { class: "product-card__name" }, [product.name]),
      el("p", { class: "product-card__unit" }, [product.description]),
      el("hr", { class: "product-card__divider" }),
      el("div", { class: "product-card__bottom" }, [
        el("span", { class: "product-card__price" }, [price(product.price), el("small", {}, [` / ${product.unit}`])]),
        el("span", { class: `stock-badge ${stock.className}` }, [stock.label]),
      ]),
    ]);
  }

  return { render };
})();
