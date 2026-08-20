/**
 * Dados fictícios de supermercados.
 * Em produção, este array pode ser substituído por uma chamada de API
 * (ver js/services/dataService.js) sem alterar o restante do aplicativo.
 */
window.AppData = window.AppData || {};

AppData.stores = [
  {
    id: 0,
    name: "Supermais",
    neighborhood: "Pontes e Lacerda",
    hours: "07h às 22h",
    icon: "🏬",
    isOpenNow: true,
  },
  {
    id: 1,
    name: "Supermais",
    neighborhood: "Tangará da Serra",
    hours: "08h às 21h",
    icon: "🛒",
    isOpenNow: true,
  },
  {
    id: 2,
    name: "Farturão",
    neighborhood: "Pontes e Lacerda",
    hours: "Aberto 24 horas",
    icon: "🏪",
    isOpenNow: true,
  },
];
