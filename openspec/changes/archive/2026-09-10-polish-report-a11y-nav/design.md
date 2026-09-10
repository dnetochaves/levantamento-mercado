## Context

Este é um refinamento de UX sobre a capability `market-report-viewer`, já implementada e em produção (ver `openspec/specs/market-report-viewer/spec.md`). A estrutura atual é: `ReportPage` (`report-page.ts/html/scss`) consumindo `REPORT_DATA` (dados estáticos transcritos do PDF), com um `mat-accordion multi` de 7 painéis. Os itens aqui vêm da auditoria de UX (persona `ui-ux-lead`) rodada nesta sessão, especificamente os pontos P3 que o usuário confirmou incluir: aria-label em links externos, aviso de disponibilidade de anúncios de terceiros, e navegação por âncora entre seções.

## Goals / Non-Goals

**Goals:**
- Leitores de tela avisam que um link de anúncio abre em nova aba, antes de ativá-lo.
- Um aviso visível gerencia a expectativa de que anúncios de terceiros podem já ter sido removidos.
- É possível pular direto para qualquer uma das 7 seções sem depender só de rolagem manual.

**Non-Goals:**
- Não introduz Angular Router nem múltiplas rotas — âncoras são navegação por fragmento (`#id`) dentro da mesma página, mantendo o requisito de página única.
- Não remove nem reescreve conteúdo do relatório em `report-data.ts` — as mudanças são de apresentação/UI, não de dado.
- Não resolve a remoção da data duplicada no rodapé nem outros ajustes de polimento menores discutidos na auditoria — ficam como tarefa de implementação avulsa (ver tasks.md), por não representarem um contrato de comportamento que valha uma requirement própria.

## Decisions

**1. `aria-label` inline em cada link, gerado a partir do dado já existente (`sourceLabel`), em vez de um texto/ícone visível de "abre em nova aba".**
Ex.: `aria-label="Ver anúncio original no {{ c.sourceLabel }}, abre em nova aba"`. Mantém o texto visível do botão como está (não polui visualmente o card) enquanto informa tecnologia assistiva. Alternativa considerada: adicionar um ícone visível "abre externamente" com texto oculto via `cdk-visually-hidden` — mais robusto para usuários videntes que também quisessem essa pista, mas rejeitado por adicionar mais um elemento visual a 35 cards repetidos sem que a auditoria tenha identificado esse público como afetado (o requisito nasceu de uma lacuna de acessibilidade, não de uma queixa visual).

**2. Aviso de disponibilidade como um texto único por seção com links, escrito diretamente no template (`report-page.html`), não em `report-data.ts`.**
É um texto de produto/UX sobre o comportamento de terceiros, não um dado transcrito do relatório-fonte — não pertence ao arquivo que representa o conteúdo do PDF. Reaproveita a classe `.panel-intro` já criada para o contexto de Comparáveis/Apêndice (ver mudança anterior), evitando uma nova classe/estilo. Alternativa considerada: um único aviso global no topo da página (antes do accordion) — rejeitada porque nem toda seção tem links (ex.: Metodologia, Próximos Passos), e um aviso genérico no topo teria menos relação direta com a ação de clicar.

**3. Navegação por âncora com `id` nativo no host de cada `mat-expansion-panel` + uma lista de atalhos (chips simples, não `mat-chip`) logo abaixo do card de KPIs.**
`id="secao-<slug>"` no próprio `<mat-expansion-panel>` funciona porque o cabeçalho do painel (`mat-expansion-panel-header`) permanece visível mesmo com o painel fechado — um `<a href="#secao-comparaveis">` rola até esse cabeçalho e o usuário abre o painel a partir daí, satisfazendo o cenário "atalhos continuam funcionando com seções fechadas" sem precisar de JavaScript para forçar a expansão. Os atalhos usam marcação simples (`<a>` estilizado como pill), não `mat-chip`, repetindo a decisão já tomada para o badge "Outlier" nesta mesma tela (as CSS custom properties do MDC chip não se aplicavam de forma confiável). Alternativa considerada: usar `(click)` + `ExpansionPanel.open()` programático para garantir que o painel abra ao navegar — rejeitada por adicionar estado/lógica ao componente para um ganho marginal (o usuário já vê o cabeçalho e só precisa de mais um toque).

## Risks / Trade-offs

- **[Risco] Adicionar uma linha de atalhos de navegação pode roubar espaço vertical logo no topo, competindo com o card de KPIs (que a auditoria já identificou como a informação mais importante).** → Mitigação: os atalhos ficam *depois* do card de KPIs e da lista de destaques do imóvel-alvo, nunca antes, e usam uma única linha compacta com rolagem horizontal se necessário, não um bloco grande.
- **[Trade-off] O aviso de disponibilidade de anúncios, repetido em duas seções (Comparáveis e Apêndice), adiciona texto que nem todo usuário vai ler.** → Aceito: é uma frase curta (uma linha), consistente com o padrão já usado para o texto de contexto entre as duas listas.
