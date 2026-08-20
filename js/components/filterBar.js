/**
 * Componente: opções de categoria exibidas dentro do menu de filtro (popover).
 * O campo de busca fica fixo no cabeçalho (ver app.js) e não é responsabilidade
 * deste componente.
 */
window.App = window.App || {};

App.filterBar = (function () {
  const { el, clear } = App.dom;

  function renderOption(label, categoryId, isActive, onCategoryChange) {
    return el(
      "button",
      {
        class: `filter-option ${isActive ? "is-active" : ""}`,
        type: "button",
        role: "menuitemradio",
        "aria-checked": String(isActive),
        "data-category": categoryId,
        onclick: () => onCategoryChange(categoryId),
      },
      [el("span", {}, [label]), el("span", { class: "filter-option__check", "aria-hidden": "true" }, ["✓"])]
    );
  }

  function render(container, { categories, activeCategory, onCategoryChange }) {
    clear(container);
    container.appendChild(renderOption("Todas as categorias", "todos", activeCategory === "todos", onCategoryChange));
    categories.forEach((category) => {
      container.appendChild(
        renderOption(`${category.icon}  ${category.label}`, category.id, activeCategory === category.id, onCategoryChange)
      );
    });
  }

  return { render };
})();
