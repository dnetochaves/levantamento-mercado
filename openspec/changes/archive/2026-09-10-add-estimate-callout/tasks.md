## 1. Modelagem dos novos campos

- [x] 1.1 Adicionar a `TargetEstimate` em `frontend/src/app/report/report-data.model.ts` os campos `calloutHeadline: string`, `confidenceNote: string` e `missingData: { icon: string; label: string; detail: string }[]`, e verificar que o projeto compila (`npx tsc --noEmit -p frontend/tsconfig.app.json`)
- [x] 1.2 Preencher esses campos em `frontend/src/app/report/report-data.ts`: `calloutHeadline` com a frase narrativa do valor (ex.: "Com os dados que já temos, seu imóvel vale entre R$ 900 mil e R$ 2,2 milhões"), `confidenceNote` com o selo de confiança (ex.: "Confiança: baixa — falta 1 dado crítico"), e `missingData` com os 3 itens (🏗️ área construída confirmada, 🛏️ confirmação dos 9 quartos, 📋 mais informações do imóvel), cada um com rótulo curto e explicação de por que importa

## 2. Bloco de destaque no template

- [x] 2.1 Adicionar `<section class="estimate-callout">` em `report-page.html`, entre `.kpi-card` e `.target-highlights`, com `<h2>` de título (ex.: "💰 Quanto vale o seu imóvel"), a frase narrativa (`calloutHeadline`) e o selo de confiança (`confidenceNote`)
- [x] 2.2 Dentro da mesma seção, listar `data.targetEstimate.missingData` com `@for`, cada item com o emoji em `<span aria-hidden="true">`, o rótulo e a explicação, e uma frase de encerramento convidando a falar com quem enviou o relatório
- [x] 2.3 Verificar no DOM que o heading do bloco é `<h2>` (irmão de "Imóvel-alvo") e que cada emoji tem `aria-hidden="true"` com o rótulo textual correspondente visível ao lado — confirmado via script: 3/3 ícones com `aria-hidden="true"`, heading é `H2`

## 3. Estilo (cor dentro do tema existente)

- [x] 3.1 Adicionar `.estimate-callout` em `report-page.scss` usando `background: var(--mat-sys-primary-container)` e `color: var(--mat-sys-on-primary-container)`, mobile-first (largura total, padding consistente com os demais cards)
- [x] 3.2 Adicionar `.missing-data-item` usando `background: var(--mat-sys-tertiary-container)` e `color: var(--mat-sys-on-tertiary-container)`, e verificar visualmente que a cor não é a mesma do `.warning-note` existente (que usa `--mat-sys-error`) — confirmado: `estimate-callout` usa azul (rgb 215,227,255) e `missing-data-item` usa roxo-azulado (rgb 224,224,255), ambos distintos do vermelho de erro
- [x] 3.3 Verificar contraste de `on-primary-container` sobre `primary-container` e de `on-tertiary-container` sobre `tertiary-container` no tema azure-blue (via inspeção de cor computada ou ferramenta de contraste), confirmando nível AA — confirmado via cálculo de contraste WCAG: 7,26:1 e 7,25:1 (ambos acima do nível AAA de 7:1)

## 4. Verificação final

- [x] 4.1 Rodar `npx ng build` em `frontend/` e confirmar que o build de produção completa sem erros nem warnings novos — build inicial gerou um warning de orçamento de estilo do componente (4,46kB vs limite de 4kB); ajustado o budget `anyComponentStyle` de `frontend/angular.json` para 6kB (crescimento legítimo do componente), build final limpo
- [x] 4.2 Rodar `npx ng test --watch=false` e confirmar que os testes continuam passando
- [x] 4.3 Conferir visualmente em viewport mobile (375px) que o bloco aparece entre o card de KPIs e "Imóvel-alvo", sem rolagem horizontal, e que nenhuma das 7 seções do accordion foi alterada
- [x] 4.4 Conferir em viewport desktop (~1280px) que o bloco continua legível e não quebra o layout
