/**
 * Catálogo fictício de produtos.
 * Cada produto pertence a um supermercado (storeId) e a uma categoria
 * (category), cujos ids devem existir em AppData.stores e AppData.categories.
 *
 * stock: "in" (em estoque) | "low" (últimas unidades) | "out" (indisponível)
 */
window.AppData = window.AppData || {};

AppData.products = [
  // ---- Supermais - Pontes e Lacerda ----
  { id: "p001", storeId: 0, name: "Suco de Laranja Natural", category: "bebidas", price: 8.49, unit: "1L", icon: "🧃", stock: "in", description: "100% suco, sem adição de açúcar." },
  { id: "p002", storeId: 0, name: "Água Mineral sem Gás", category: "bebidas", price: 2.79, unit: "500ml", icon: "💧", stock: "in", description: "Fonte natural, baixo sódio." },
  { id: "p003", storeId: 0, name: "Arroz Branco Tipo 1", category: "alimentos", price: 24.90, unit: "5kg", icon: "🍚", stock: "in", description: "Grãos selecionados." },
  { id: "p004", storeId: 0, name: "Feijão Carioca", category: "alimentos", price: 8.99, unit: "1kg", icon: "🫘", stock: "low", description: "Safra nova." },
  { id: "p005", storeId: 0, name: "Sabonete em Barra", category: "higiene", price: 2.39, unit: "unidade", icon: "🧼", stock: "in", description: "Hidratação suave para o dia a dia." },
  { id: "p006", storeId: 0, name: "Detergente Neutro", category: "limpeza", price: 2.99, unit: "500ml", icon: "🧴", stock: "in", description: "Remove gordura com eficiência." },
  { id: "p007", storeId: 0, name: "Maçã Gala", category: "hortifruti", price: 9.90, unit: "kg", icon: "🍎", stock: "in", description: "Fruta fresca selecionada." },
  { id: "p008", storeId: 0, name: "Queijo Mussarela Fatiado", category: "laticinios", price: 6.49, unit: "200g", icon: "🧀", stock: "low", description: "Ideal para lanches e sanduíches." },

  // ---- Supermais - Tangará da Serra ----
  { id: "p101", storeId: 1, name: "Refrigerante Cola", category: "bebidas", price: 7.99, unit: "2L", icon: "🥤", stock: "in", description: "Sabor tradicional, gelado na loja." },
  { id: "p102", storeId: 1, name: "Café Torrado e Moído", category: "alimentos", price: 14.50, unit: "500g", icon: "☕", stock: "in", description: "Torra média, aroma intenso." },
  { id: "p103", storeId: 1, name: "Macarrão Espaguete", category: "alimentos", price: 5.29, unit: "500g", icon: "🍝", stock: "in", description: "Massa de sêmola de trigo." },
  { id: "p104", storeId: 1, name: "Shampoo Hidratante", category: "higiene", price: 17.90, unit: "350ml", icon: "🧴", stock: "out", description: "Para cabelos secos e danificados." },
  { id: "p105", storeId: 1, name: "Desinfetante Lavanda", category: "limpeza", price: 6.79, unit: "1L", icon: "🧽", stock: "in", description: "Perfume duradouro." },
  { id: "p106", storeId: 1, name: "Alface Crespa", category: "hortifruti", price: 3.49, unit: "unidade", icon: "🥬", stock: "low", description: "Colhida no dia." },
  { id: "p107", storeId: 1, name: "Tomate Salada", category: "hortifruti", price: 7.90, unit: "kg", icon: "🍅", stock: "in", description: "Ideal para saladas e molhos." },
  { id: "p108", storeId: 1, name: "Iogurte Natural", category: "laticinios", price: 4.99, unit: "170g", icon: "🥣", stock: "in", description: "Sem conservantes." },

  // ---- Farturão - Pontes e Lacerda ----
  { id: "p201", storeId: 2, name: "Cerveja Pilsen", category: "bebidas", price: 4.29, unit: "350ml", icon: "🍺", stock: "in", description: "Long neck gelada." },
  { id: "p202", storeId: 2, name: "Chá Mate Gelado", category: "bebidas", price: 5.49, unit: "1,5L", icon: "🧉", stock: "in", description: "Sabor tradicional." },
  { id: "p203", storeId: 2, name: "Óleo de Soja", category: "alimentos", price: 7.89, unit: "900ml", icon: "🍶", stock: "in", description: "Uso culinário geral." },
  { id: "p204", storeId: 2, name: "Papel Higiênico Folha Dupla", category: "higiene", price: 19.90, unit: "12 rolos", icon: "🧻", stock: "in", description: "Extra macio." },
  { id: "p205", storeId: 2, name: "Escova Dental Macia", category: "higiene", price: 6.99, unit: "unidade", icon: "🪥", stock: "low", description: "Cerdas ultrassuaves." },
  { id: "p206", storeId: 2, name: "Sabão em Pó", category: "limpeza", price: 21.90, unit: "1,6kg", icon: "🧺", stock: "in", description: "Remove manchas difíceis." },
  { id: "p207", storeId: 2, name: "Banana Prata", category: "hortifruti", price: 5.99, unit: "kg", icon: "🍌", stock: "in", description: "Doce e macia." },
  { id: "p208", storeId: 2, name: "Leite Integral", category: "laticinios", price: 4.59, unit: "1L", icon: "🥛", stock: "in", description: "Rico em cálcio." },
  { id: "p209", storeId: 2, name: "Manteiga com Sal", category: "laticinios", price: 9.79, unit: "200g", icon: "🧈", stock: "out", description: "Cremosa, produção artesanal." },

];
