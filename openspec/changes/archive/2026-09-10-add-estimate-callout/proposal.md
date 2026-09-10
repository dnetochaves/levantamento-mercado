## Why

Hoje, para entender "quanto vale o imóvel" e "o que falta para essa conta ficar mais certa", o proprietário precisa ler o card de KPIs e depois abrir o painel de Estimativa do accordion. O dono do produto quer que isso fique visível de cara, de forma sucinta, colorida e com emoji — não como mudança no relatório em si, mas como uma chamada adicional pensada para o proprietário do imóvel, que é quem vai fornecer os dados que faltam (área construída confirmada, confirmação de quartos, e outras informações do imóvel) para refinar a estimativa.

## What Changes

- Novo bloco de destaque ("callout") entre o card de KPIs e a lista "Imóvel-alvo", reafirmando a faixa de valor estimado com uma moldura mais narrativa (não repete literalmente o texto do KPI) e listando os dados pendentes do proprietário, cada um com ícone/emoji, rótulo curto e explicação de por que importa.
- Uso de cor dentro do tema Material 3 já existente (`primary-container` para o valor, `tertiary-container` para os itens pendentes) e de 3–4 emojis, confinados a esse bloco novo — nenhuma outra seção do relatório é alterada.
- Não é um formulário funcional de captura de dados nesta versão — é conteúdo estático, na mesma linha do restante da página.

## Capabilities

### New Capabilities
(nenhuma)

### Modified Capabilities
- `market-report-viewer`: adiciona um requisito de chamada de destaque com o valor estimado e os dados pendentes do proprietário, incluindo o cuidado de que cor/emoji não sejam a única forma de comunicar a informação.

## Impact

- Código afetado: `frontend/src/app/report/report-data.model.ts` (novos campos em `TargetEstimate`), `report-data.ts` (conteúdo do callout), `report-page.html` (novo bloco) e `report-page.scss` (duas classes novas, reaproveitando tokens do tema).
- Nenhuma mudança nas demais seções do relatório (Metodologia, Estatísticas, Comparáveis, Potencial de Negócio, Próximos Passos, Apêndice) nem no accordion existente.
- Sem novo componente Angular — o bloco é parte do `ReportPage` já existente, seguindo a decisão de design já tomada (evitar componentização prematura para um bloco de uso único).
