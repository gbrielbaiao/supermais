# Vitrine — Consulta de Produtos por Supermercado

Aplicativo web (HTML5 + CSS3 + JavaScript puro, sem frameworks) que permite ao
cliente escolher um supermercado e visualizar seus produtos, com busca por
nome e filtro por categoria.

## Como executar

Não há build nem dependências. Basta abrir `index.html` no navegador
(duplo clique) ou, se preferir, servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Estrutura do projeto

```
vitrine-mercado/
├── index.html                  # Estrutura das duas telas (seleção de loja / catálogo)
├── css/
│   ├── variables.css           # Tokens de design: cores, tipografia, espaçamento
│   ├── reset.css                # Reset e estilos base
│   ├── styles.css               # Layout e componentes visuais
│   └── responsive.css           # Ajustes para tablet e celular
└── js/
    ├── data/
    │   ├── stores.js             # Lojas fictícias (dado de exemplo)
    │   ├── categories.js         # Categorias de produto (dado de exemplo)
    │   └── products.js           # Produtos fictícios, ligados a uma loja e categoria
    ├── utils/
    │   ├── dom.js                 # Helpers de DOM (criar elementos, debounce etc.)
    │   └── format.js              # Formatação de preço, estoque e texto de busca
    ├── services/
    │   └── dataService.js         # Única porta de entrada para os dados (ver abaixo)
    ├── state/
    │   └── appState.js            # Estado da aplicação + notificação de mudanças
    ├── components/
    │   ├── storeSelector.js       # Tela 1: grade de lojas
    │   ├── filterBar.js           # Opções de categoria dentro do botão de filtro (popover)
    │   ├── productCard.js         # Card individual de produto
    │   └── productGrid.js         # Grade de produtos + estados vazio/carregando
    └── app.js                     # Controlador principal: liga tudo
```

Cada arquivo tem uma única responsabilidade e é carregado como um script
tradicional (sem `type="module"`), evitando problemas de CORS ao abrir o
arquivo diretamente do disco (`file://`). Para não colidir nomes entre
arquivos, cada um se registra dentro dos namespaces globais `App` (lógica) e
`AppData` (dados).

## Como conectar a uma API/banco de dados real

Toda a leitura de dados passa por `js/services/dataService.js`. Hoje ele lê
os arrays de `js/data/*.js` e devolve uma `Promise` (simulando uma pequena
latência de rede). Para usar uma API de verdade, basta reescrever as funções
internas, por exemplo:

```js
function getStores() {
  return fetch("/api/lojas").then((res) => res.json());
}

function getProductsByStore(storeId) {
  return fetch(`/api/lojas/${storeId}/produtos`).then((res) => res.json());
}
```

Como o restante do aplicativo (componentes, estado, controlador) só conhece
`App.dataService`, nenhuma outra parte do código precisa mudar.

## Funcionalidades implementadas

- Seleção de supermercado (4 lojas fictícias) com card de status "aberto/fechado".
- Catálogo de produtos por loja, com ícone, nome, categoria, preço, unidade e estoque.
- Busca por nome em tempo real (com debounce e tolerante a acentuação).
- Filtro por categoria (Bebidas, Alimentos, Higiene, Limpeza, Hortifruti, Laticínios) reunido em um botão de ícone no cabeçalho, combinável com a busca.
- Estado de "nenhum produto encontrado" com ação para limpar filtros.
- Estado de carregamento (skeleton) ao trocar de loja.
- Layout responsivo (desktop, tablet e celular).
