## Context

Refinamento sobre a capability `market-report-viewer`, já em produção. A página (`ReportPage` em `frontend/src/app/report/`) tem hoje, do topo: toolbar, subtítulo/meta, card de KPIs sempre visível, lista "Imóvel-alvo", nav de âncoras, e o `mat-accordion` de 7 painéis (com "Estimativa do imóvel-alvo" já aberto por padrão, ver mudanças anteriores). Ver `proposal.md` (Why) para a motivação.

Antes de desenhar a solução, a persona `ui-ux-lead` (agente `.claude/agents/ui-ux-lead.md`) foi consultada especificamente sobre este bloco — este design.md aplica as recomendações dessa consulta.

## Goals / Non-Goals

**Goals:**
- O valor estimado e os dados pendentes do proprietário ficam visíveis no primeiro viewport mobile, sem exigir interação.
- Cor e emoji ficam confinados a este bloco novo, sem alterar o tom das demais 7 seções já validadas na auditoria anterior.

**Non-Goals:**
- Não é um formulário funcional (sem inputs, sem submit, sem persistência) — é demonstração de conteúdo, igual ao resto da página.
- Não introduz componente Angular novo — o bloco é template inline em `report-page.html`, consistente com a decisão de não componentizar um bloco de uso único (ver auditoria anterior, item de componentização).
- Não altera o `mat-accordion` nem qualquer uma das 7 seções existentes.

## Decisions

**1. Posição: card novo entre `.kpi-card` e a seção `.target-highlights` — não dentro do accordion.**
Recomendação da consulta com `ui-ux-lead`: o painel "Estimativa do imóvel-alvo" já é o primeiro do accordion e já vem aberto, mas ainda é um bloco denso (cenários + premissas + notas). Um card dedicado logo após os KPIs aparece no primeiro viewport mobile sem exigir rolagem até o accordion, e funciona como ponte entre "quanto vale" (KPI) e "por que ainda é impreciso" (accordion), sem duplicar o conteúdo técnico do painel.

**2. Moldura do valor: frase de resultado + selo de confiança, não repetição literal do KPI.**
Em vez de repetir "R$ 900.000 – R$ 2.200.000 / Estimativa do imóvel-alvo" como no KPI, o callout reformula como frase narrativa (ex.: "Com os dados que já temos, seu imóvel vale entre R$ 900 mil e R$ 2,2 milhões") seguida de um selo curto de confiança (ex.: "Confiança: baixa — falta 1 dado crítico"), que serve de gancho para a lista de dados pendentes logo abaixo, no mesmo card. Alternativa considerada: omitir o valor do callout e só linkar para o KPI — rejeitada porque o pedido explícito é "mostrar o valor de cara" no mesmo bloco que explica o que falta.

**3. Dados pendentes como 3 itens (ícone/emoji + rótulo + explicação curta), sem inputs.**
- 🏗️ Área construída confirmada — é o dado que mais estreita a faixa (hoje é estimada por proporção, responsável pela amplitude R$900mil–R$2,2mi).
- 🛏️ Confirmação dos 9 quartos — hoje é o número informado, não verificado.
- 📋 Mais informações do imóvel — fotos, estado de conservação detalhado, documentação (deixado genérico, como o dono do produto pediu, sem lista fechada).
Fecha com uma chamada humana ("fale com quem te enviou este relatório"), não um botão de submit — coerente com o non-goal de não ser formulário funcional.

**4. Cor: tokens do tema Material 3 já usado, sem paleta nova.**
`background: var(--mat-sys-primary-container)` / `color: var(--mat-sys-on-primary-container)` para o bloco do valor; `background: var(--mat-sys-tertiary-container)` / `color: var(--mat-sys-on-tertiary-container)` para os itens de dado pendente. Deliberadamente **não** usa `--mat-sys-error*` (reservado ao `.warning-note` existente, que comunica "isto é uma limitação/risco" — usar a mesma cor aqui confundiria "convite a colaborar" com "problema"). Duas classes novas em `report-page.scss`: `.estimate-callout` e `.missing-data-item`, seguindo o padrão de reutilização de tokens já visto em `.stat-group--recalculated` e `.outlier-badge`/`.source-link`.

**5. Emoji: 3–4 no total, confinados a este bloco.**
Um emoji por item de dado pendente (🏗️/🛏️/📋) e, opcionalmente, um no título do card (💰 ou 🏠). Nenhum emoji nas demais 7 seções (fora de escopo, e a auditoria anterior já validou o tom atual delas). Cada emoji é marcado `aria-hidden="true"` e acompanhado do rótulo textual, que carrega o significado sozinho — evita que leitor de tela verbalize o emoji no meio da frase e evita que a informação dependa só do emoji.

**6. Estrutura técnica: extensão de dado existente, sem componente novo.**
- `report-data.model.ts`: adiciona a `TargetEstimate` os campos `calloutHeadline: string`, `confidenceNote: string`, `missingData: { icon: string; label: string; detail: string }[]`.
- `report-data.ts`: preenche esses campos com o conteúdo definido no item 3.
- `report-page.html`: novo `<section class="estimate-callout">` entre `.kpi-card` e `.target-highlights`, com um `<h2>` (irmão de "Imóvel-alvo", preservando a hierarquia de heading) e um `@for` sobre `data.targetEstimate.missingData`.
- `report-page.scss`: as duas classes novas do item 4.

## Risks / Trade-offs

- **[Risco] "Mais emoji" pode reduzir a credibilidade analítica de um relatório usado para decisão financeira, se espalhado pela página.** → Mitigação: confinar 100% do uso lúdico a este bloco novo; nenhuma das 7 seções existentes (já validadas na auditoria anterior) recebe emoji ou nova cor.
- **[Trade-off] O valor estimado aparece duas vezes na página (KPI + callout), com textos diferentes.** → Aceito deliberadamente: a consulta de UX considera isso correto (dado-chave deve estar visível sem exigir que o usuário memorize/role até o KPI), desde que a moldura narrativa do callout deixe claro que é o mesmo número, não uma segunda estimativa.
