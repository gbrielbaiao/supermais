/**
 * Ponto de entrada do aplicativo.
 * Orquestra: carregamento de dados -> estado -> renderização dos componentes.
 */
(function () {
  const { qs, debounce } = App.dom;

  const els = {
    headerSearch: qs("#header-search"),
    searchInput: qs("#product-search"),
    filterMenu: qs("#filter-menu"),
    filterToggle: qs("#filter-toggle"),
    filterBadge: qs("#filter-badge"),
    filterPopover: qs("#filter-popover"),
    filterOptions: qs("#filter-options"),
    headerContext: qs("#header-store-context"),
    headerStoreName: qs("#header-store-name"),
    changeStoreBtn: qs("#btn-change-store"),
    viewStoreSelect: qs("#view-store-select"),
    viewCatalog: qs("#view-catalog"),
    storeGrid: qs("#store-grid"),
    productGrid: qs("#product-grid"),
    resultsSummary: qs("#results-summary"),
  };

  function showView(view) {
    [els.viewStoreSelect, els.viewCatalog].forEach((v) => v.classList.remove("is-active"));
    view.classList.add("is-active");
  }

  /** Os controles de busca/filtro/loja atual só existem junto com o cabeçalho
   *  em modo "catálogo" — somem e aparecem juntos. */
  function setHeaderControlsVisible(isVisible) {
    els.headerSearch.hidden = !isVisible;
    els.filterMenu.hidden = !isVisible;
    els.headerContext.hidden = !isVisible;
    if (!isVisible) closeFilterPopover();
  }

  function updateHeaderForCatalog(store) {
    els.headerStoreName.textContent = store.name;
  }

  /** Distância mínima que o popover deve manter das bordas da tela. */
  const POPOVER_VIEWPORT_MARGIN = 16;

  /** Garante que o popover de filtro nunca saia da área visível da tela,
   *  recalculando sua posição horizontal toda vez que ele é aberto (e ao
   *  redimensionar a janela/rotacionar o celular enquanto está aberto). */
  function positionFilterPopover() {
    const popover = els.filterPopover;
    const menuRect = els.filterMenu.getBoundingClientRect();
    const margin = POPOVER_VIEWPORT_MARGIN;
    const viewportWidth = window.innerWidth;

    // Estado padrão: popover ancorado pela borda direita do botão de filtro.
    popover.style.right = "0";
    popover.style.left = "auto";
    popover.style.maxWidth = "";

    // Mede como o popover ficaria nesse estado padrão (via largura real do
    // elemento, já que ele está visível nesse ponto) e corrige se estourar
    // para fora dos dois lados da tela.
    const popoverWidth = popover.getBoundingClientRect().width;
    const defaultLeftEdge = menuRect.right - popoverWidth; // borda esquerda resultante do "right: 0"

    if (defaultLeftEdge < margin) {
      // Estouraria pela esquerda: desloca para a direita até respeitar a margem,
      // convertendo para coordenadas locais ao .filter-menu.
      const neededLeftEdge = Math.max(margin, 0);
      const shift = neededLeftEdge - defaultLeftEdge;
      popover.style.right = `${-shift}px`;
    }

    // Depois do ajuste, se ainda não couber (telas muito estreitas), limita a
    // largura para caber exatamente entre as duas margens da viewport.
    const rectAfter = popover.getBoundingClientRect();
    if (rectAfter.left < margin || rectAfter.right > viewportWidth - margin) {
      popover.style.right = "auto";
      popover.style.left = `${margin - menuRect.left}px`;
      popover.style.maxWidth = `${viewportWidth - margin * 2}px`;
    }
  }

  function openFilterPopover() {
    els.filterPopover.hidden = false;
    els.filterToggle.classList.add("is-open");
    els.filterToggle.setAttribute("aria-expanded", "true");
    positionFilterPopover();
  }

  function closeFilterPopover() {
    els.filterPopover.hidden = true;
    els.filterToggle.classList.remove("is-open");
    els.filterToggle.setAttribute("aria-expanded", "false");
  }

  function toggleFilterPopover() {
    if (els.filterPopover.hidden) {
      openFilterPopover();
    } else {
      closeFilterPopover();
    }
  }

  function renderFilterMenu() {
    const state = App.state.getState();
    App.filterBar.render(els.filterOptions, {
      categories: AppData.categories,
      activeCategory: state.activeCategory,
      onCategoryChange: (categoryId) => {
        App.state.setActiveCategory(categoryId);
        closeFilterPopover();
      },
    });
    els.filterBadge.hidden = state.activeCategory === "todos";
  }

  function renderResults() {
    const state = App.state.getState();
    const visibleProducts = App.state.getVisibleProducts();

    if (state.storeProducts.length === 0) {
      App.productGrid.renderEmptyState(els.productGrid, {
        title: "Este mercado ainda não cadastrou produtos",
        message: "Volte em breve ou escolha outro estabelecimento.",
        actionLabel: "Escolher outro mercado",
        onAction: goToStoreSelect,
      });
      els.resultsSummary.textContent = "";
      return;
    }

    if (visibleProducts.length === 0) {
      App.productGrid.renderEmptyState(els.productGrid, {
        title: "Nenhum produto encontrado",
        message: "Tente buscar por outro termo ou remova o filtro de categoria.",
        actionLabel: "Limpar filtros",
        onAction: clearFilters,
      });
      els.resultsSummary.textContent = "";
      return;
    }

    App.productGrid.renderProducts(els.productGrid, visibleProducts);
    els.resultsSummary.innerHTML = "";
    els.resultsSummary.appendChild(
      App.dom.el("span", {}, [
        "Mostrando ",
        App.dom.el("strong", {}, [String(visibleProducts.length)]),
        ` de ${state.storeProducts.length} produtos`,
      ])
    );
  }

  function clearFilters() {
    App.state.setActiveCategory("todos");
    App.state.setSearchTerm("");
    els.searchInput.value = "";
  }

  function goToStoreSelect() {
    App.state.reset();
    setHeaderControlsVisible(false);
    showView(els.viewStoreSelect);
  }

  async function selectStore(store) {
    showView(els.viewCatalog);
    setHeaderControlsVisible(true);
    updateHeaderForCatalog(store);
    App.productGrid.renderSkeleton(els.productGrid, 6);
    els.resultsSummary.textContent = "";

    const products = await App.dataService.getProductsByStore(store.id);
    App.state.setSelectedStore(store, products);
  }

  function wireFilterPopoverDismissal() {
    document.addEventListener("click", (event) => {
      if (els.filterPopover.hidden) return;
      const clickedInsideMenu = els.filterMenu.contains(event.target);
      if (!clickedInsideMenu) closeFilterPopover();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !els.filterPopover.hidden) closeFilterPopover();
    });

    window.addEventListener("resize", debounce(() => {
      if (!els.filterPopover.hidden) positionFilterPopover();
    }, 100));
  }

  async function init() {
    els.changeStoreBtn.addEventListener("click", goToStoreSelect);
    els.filterToggle.addEventListener("click", toggleFilterPopover);
    els.searchInput.addEventListener("input", debounce((event) => App.state.setSearchTerm(event.target.value), 200));
    wireFilterPopoverDismissal();

    App.state.subscribe(() => {
      renderFilterMenu();
      renderResults();
    });

    const stores = await App.dataService.getStores();
    App.storeSelector.render(els.storeGrid, stores, selectStore);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
