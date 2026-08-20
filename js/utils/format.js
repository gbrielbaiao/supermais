/**
 * Funções de formatação reutilizadas pelos componentes.
 */
window.App = window.App || {};

App.format = (function () {
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function price(value) {
    return currencyFormatter.format(value);
  }

  const STOCK_LABELS = {
    in: { label: "Em estoque", className: "stock-badge--in" },
    low: { label: "Últimas unidades", className: "stock-badge--low" },
    out: { label: "Indisponível", className: "stock-badge--out" },
  };

  function stockInfo(stockCode) {
    return STOCK_LABELS[stockCode] || STOCK_LABELS.in;
  }

  /** Remove acentos e caixa para permitir busca tolerante ("acucar" encontra "Açúcar"). */
  function normalize(text) {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  return { price, stockInfo, normalize };
})();
