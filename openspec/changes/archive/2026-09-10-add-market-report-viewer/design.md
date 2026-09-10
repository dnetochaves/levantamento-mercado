## Context

O app Angular já existe em `frontend/` (standalone, Angular 22, file-name style guide "2025", `@angular/material` + `@angular/cdk` já instalados com tema `azure-blue`/Material 3, roteamento habilitado no scaffold mas ainda sem rotas definidas). Não há backend nem fonte de dados viva — o conteúdo vem integralmente do PDF `Relatorio_Ilha_Aratuba_Vera_Cruz.pdf`, um retrato pontual (10/09/2026). Ver `proposal.md` (Why) para a motivação e `specs/market-report-viewer/spec.md` para o contrato de comportamento.

## Goals / Non-Goals

**Goals:**
- Estrutura de arquivos simples: um componente de página + um arquivo de dados estático, fácil de re-popular quando um novo relatório for gerado.
- Layout que funciona sem rolagem horizontal em telas de celular (~360–430px), conforme exigido pela spec.

**Non-Goals:**
- Sem ingestão automática do PDF (nenhum parser) — os dados são transcritos manualmente uma vez para um arquivo TypeScript.
- Sem busca, filtro, ordenação de tabela, favoritos ou qualquer interatividade além de expandir seções e abrir links externos.
- Sem suporte a múltiplos relatórios/imóveis nesta versão — um único conjunto de dados fixo.
- Sem autenticação, analytics ou persistência.

## Decisions

**1. Um único componente de página (`ReportPage`) renderizado diretamente, sem usar o `router`.**
O scaffold do `ng new` já criou `app.routes.ts` e `RouterOutlet` em `app.html`, mas como a spec exige página única e não navegação por rotas, `app.html` passa a renderizar `<app-report-page />` diretamente no lugar do `<router-outlet />`. `app.routes.ts` fica vazio (array `[]`) e `provideRouter` é mantido apenas para não quebrar o `app.config.ts` gerado — não é usado para navegar. Alternativa considerada: manter uma rota única `''` → `ReportPage`; rejeitada por adicionar uma camada (router) sem benefício quando não há uma segunda tela.

**2. Dados do relatório como um único arquivo `report-data.ts` tipado, sem serviço/HTTP.**
`src/app/report/report-data.ts` exporta interfaces (`Kpi`, `MarketStat`, `Comparable`, `TargetEstimate`, `BusinessPotential`, `AppendixItem`, etc.) e uma constante `REPORT_DATA` com todo o conteúdo transcrito do PDF (incluindo os links de anúncio do ZAP/Wimoveis já como URLs completas). `ReportPage` importa essa constante diretamente. Alternativa considerada: JSON carregado via `HttpClient`; rejeitada porque adicionaria uma dependência assíncrona (loading/erro) sem necessidade real, já que o dado é estático e compilado junto com o app.

**3. Comparáveis e apêndice exibidos como lista de cards (Angular Material `mat-card`), não como `mat-table` larga.**
Uma tabela com 6–7 colunas (preço, área, quartos, R$/m², observação, fonte) não cabe em ~360px sem rolagem horizontal, o que violaria o cenário "sem rolagem horizontal" da spec. Cada comparável vira um `mat-card` com os campos em pares rótulo/valor empilhados e, quando houver fonte, um botão/link "Ver anúncio original" (`target="_blank" rel="noopener"`). Em telas largas (≥768px), os cards podem ser organizados em grid de 2–3 colunas via CSS Grid — mesma marcação, apenas layout. Alternativa considerada: `mat-table` com contêiner `overflow-x: auto`; rejeitada como solução mobile-first porque delega o problema para rolagem horizontal em vez de resolvê-lo.

**4. Seções organizadas em `mat-accordion` (`mat-expansion-panel`), exceto o resumo de KPIs.**
O resumo de KPIs (nº de anúncios, R$/m², faixa de preço, faixa estimada do imóvel-alvo) fica sempre visível no topo, fora do accordion, em um `mat-card` de destaque logo abaixo de um `mat-toolbar` com o título. As demais seções (Metodologia, Estatísticas de Mercado, Comparáveis, Estimativa do Imóvel-Alvo, Potencial de Negócio, Próximos Passos, Apêndice) viram painéis de um `mat-accordion`, permitindo ao usuário abrir só o que interessa em vez de rolar uma página muito longa no celular. Alternativa considerada: `mat-tab-group`; rejeitada porque abas escondem o conteúdo das outras seções por completo e dificultam abrir "duas coisas ao mesmo tempo" ou usar Ctrl+F/busca do navegador, além de terem pior comportamento de acessibilidade em telas estreitas com muitas abas.

**5. Outliers no apêndice sinalizados com `mat-chip` "Outlier" (cor de aviso), refletindo o destaque âmbar do PDF original.**
Cada `AppendixItem` tem um campo `isOutlier: boolean` (e opcionalmente `outlierReason`); quando verdadeiro, o card exibe um chip de aviso, preservando a mesma sinalização visual do relatório fonte.

**6. Prefixo de seletor e nomenclatura de arquivos seguem o padrão já gerado pelo `ng new`** (prefixo `app`, style guide 2025 — ex.: `report-page.ts`, `report-page.html`, `report-page.scss`, sem sufixo `.component`), para manter consistência com o restante do workspace.

## Risks / Trade-offs

- **[Risco] Transcrição manual do PDF para `report-data.ts` pode introduzir divergências (valores, links) em relação ao relatório original.** → Mitigação: durante a implementação (tasks.md), conferir cada tabela/número do arquivo de dados contra o PDF antes de finalizar; deixar um comentário no topo do arquivo com a data do relatório-fonte (10/09/2026) para rastreabilidade.
- **[Risco] Um novo relatório (outro imóvel ou rodada futura) exigirá reescrever `report-data.ts` manualmente.** → Aceito como trade-off deliberado desta primeira versão (ver Non-Goals); documentar no próprio arquivo que ele é específico deste relatório, para não ser confundido com um formato genérico.
- **[Trade-off] Cards em vez de tabela tradicional tornam comparação lado a lado entre imóveis mais difícil em telas largas.** → Aceitável porque o público-alvo declarado é mobile; em telas largas o grid de cards ainda permite escaneamento rápido, e não há requisito de comparação lado a lado na spec.
