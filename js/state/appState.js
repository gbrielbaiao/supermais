/**
 * Estado central do aplicativo com um mecanismo simples de "publish/subscribe".
 * Componentes se inscrevem para saber quando algo relevante muda, em vez de
 * lerem/escreverem variáveis globais soltas.
 */
window.App = window.App || {};

App.state = (function () {
  const state = {
    selectedStore: null, // objeto da loja selecionada
    storeProducts: [], // produtos carregados para a loja atual
    searchTerm: "",
    activeCategory: "todos",
  };

  const listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function notify() {
    listeners.forEach((listener) => listener(state));
  }

  function setSelectedStore(store, products) {
    state.selectedStore = store;
    state.storeProducts = products;
    state.searchTerm = "";
    state.activeCategory = "todos";
    notify();
  }

  function setSearchTerm(term) {
    state.searchTerm = term;
    notify();
  }

  function setActiveCategory(categoryId) {
    state.activeCategory = categoryId;
    notify();
  }

  function reset() {
    state.selectedStore = null;
    state.storeProducts = [];
    state.searchTerm = "";
    state.activeCategory = "todos";
    notify();
  }

  function getState() {
    return state;
  }

  /** Aplica busca por nome + filtro de categoria sobre os produtos da loja atual. */
  function getVisibleProducts() {
    const term = App.format.normalize(state.searchTerm);

    return state.storeProducts.filter((product) => {
      const matchesCategory = state.activeCategory === "todos" || product.category === state.activeCategory;
      const matchesSearch = term === "" || App.format.normalize(product.name).includes(term);
      return matchesCategory && matchesSearch;
    });
  }

  return {
    subscribe,
    setSelectedStore,
    setSearchTerm,
    setActiveCategory,
    reset,
    getState,
    getVisibleProducts,
  };
})();
