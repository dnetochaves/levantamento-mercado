## Why

A auditoria de UX/UI (persona `ui-ux-lead`) sobre o visualizador do relatório de mercado apontou pendências de acessibilidade e navegação que ficaram fora dos ajustes de prioridade P1/P2 já aplicados (reordenação do accordion, contexto entre Comparáveis/Apêndice, alvo de toque dos links). Os itens restantes (P3) melhoram a experiência de quem usa leitor de tela e de quem revisita o relatório, sem alterar a decisão de produto de manter uma página única mobile-first.

## What Changes

- Cada link de anúncio (Comparáveis e Apêndice) passa a indicar, para tecnologia assistiva, que abre em uma nova aba fora do app.
- É adicionado um texto de apoio avisando que anúncios de terceiros podem ter sido removidos/vendidos, gerenciando a expectativa de quem clicar em um link "morto".
- É adicionada uma navegação rápida (âncoras) para pular entre as 7 seções do relatório, sem introduzir rotas do Angular Router — continua sendo a mesma página única.

## Capabilities

### New Capabilities
(nenhuma)

### Modified Capabilities
- `market-report-viewer`: adiciona requisitos de acessibilidade para links externos, aviso sobre disponibilidade de anúncios de terceiros, e navegação rápida por âncoras entre as seções da página única.

## Impact

- Código afetado: `frontend/src/app/report/report-page.html` e `report-page.scss` (marcação e estilo dos links, do aviso, e da navegação por âncoras). Nenhuma mudança em `report-data.ts`/`report-data.model.ts`.
- Não introduz Angular Router nem novas rotas — a navegação por âncora é apenas `href="#id"` dentro da mesma página, compatível com o requisito existente de página única.
