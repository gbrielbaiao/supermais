/**
 * Camada de acesso a dados.
 *
 * Hoje ela lê os arrays de js/data/*.js e devolve Promises, simulando uma
 * pequena latência de rede. No futuro, basta reescrever o corpo destas
 * funções para usar fetch("/api/...") — o restante do aplicativo (que só
 * conhece esta camada, nunca os dados brutos) não precisa mudar.
 */
window.App = window.App || {};

App.dataService = (function () {
  const SIMULATED_LATENCY_MS = 250;

  function delay(value) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), SIMULATED_LATENCY_MS);
    });
  }

  function getStores() {
    return delay([...AppData.stores]);
  }

  function getCategories() {
    return delay([...AppData.categories]);
  }

  function getProductsByStore(storeId) {
    const products = AppData.products.filter((product) => product.storeId === storeId);
    return delay(products);
  }

  return {
    getStores,
    getCategories,
    getProductsByStore,
  };
})();
