## Why

O levantamento de mercado imobiliário (`Relatorio_Ilha_Aratuba_Vera_Cruz.pdf`) hoje só existe como PDF estático. Para que qualquer usuário consiga consultar os dados do relatório de forma rápida a partir do celular — sem precisar abrir/rolar um PDF — precisamos de um app web simples, mobile-first, que apresente as mesmas informações de forma fácil de visualizar, com os comparáveis linkados de volta ao anúncio original no portal de origem.

## What Changes

- Novo app Angular de página única (`frontend/`, já com Angular Material configurado) que exibe os dados do relatório de mercado da Ilha de Aratuba/Vera Cruz-BA.
- Layout mobile-first: otimizado primeiro para tela de celular, com adaptação progressiva para telas maiores.
- Os dados do relatório (sumário executivo, metodologia, estatísticas, comparáveis, estimativa do imóvel-alvo, potencial de pousada, próximos passos, apêndice) são modelados como dados estáticos dentro do próprio app (não há backend, API ou persistência nesta primeira versão).
- Tabela de comparáveis com link clicável (nova aba) para o anúncio original (ZAP/Wimoveis) em cada linha que possuir uma fonte rastreável.
- Organização da página única em seções colapsáveis/em abas (decisão de UX detalhada em `design.md`), sem múltiplas rotas de navegação.

## Capabilities

### New Capabilities
- `market-report-viewer`: exibição, em uma página única mobile-first, dos dados do levantamento de mercado (KPIs do sumário executivo, metodologia/fontes, estatísticas de mercado, tabela de comparáveis com link para o anúncio original, estimativa do imóvel-alvo, potencial de negócio de pousada, próximos passos e apêndice com a base completa de imóveis).

### Modified Capabilities
(nenhuma — projeto greenfield, sem specs existentes)

## Impact

- Código afetado: `frontend/` (novo componente/página, novo arquivo de dados estáticos com o conteúdo do relatório, ajustes de estilo mobile-first e tema Angular Material).
- Sem impacto em backend, APIs externas ou dados persistidos — nenhuma dependência nova além do que já foi instalado (`@angular/material`, `@angular/cdk`).
- Fonte de verdade dos dados exibidos é o PDF do relatório; qualquer atualização de dados nesta primeira versão exige atualizar o arquivo de dados estático no app.
