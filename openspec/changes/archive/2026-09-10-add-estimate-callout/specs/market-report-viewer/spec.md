## ADDED Requirements

### Requirement: Chamada de destaque com valor estimado e dados pendentes do proprietário
O sistema SHALL exibir, em um bloco de destaque posicionado entre o card de KPIs e a lista de destaques do imóvel-alvo, uma chamada visualmente diferenciada (cor e emoji, dentro do tema Material 3 já usado na página) que reafirma a faixa de valor estimado do imóvel e lista os dados que o proprietário pode fornecer para tornar essa estimativa mais precisa (área construída confirmada, confirmação do número de quartos, e outras informações do imóvel). Este bloco SHALL ser conteúdo estático nesta versão, não um formulário funcional de captura de dados.

#### Scenario: Valor estimado visível sem precisar abrir seções
- **WHEN** a página carrega
- **THEN** o bloco de destaque exibe a faixa de valor estimado do imóvel de forma visível, sem exigir que o usuário expanda nenhum painel do accordion

#### Scenario: Lista dos dados pendentes do proprietário
- **WHEN** o usuário visualiza o bloco de destaque
- **THEN** os itens de dados pendentes (área construída confirmada, confirmação de quartos, mais informações do imóvel) aparecem, cada um com um ícone/emoji, um rótulo curto e uma explicação de por que aquele dado importa para a precisão da estimativa

#### Scenario: Cor e emoji não são a única forma de comunicar a informação
- **WHEN** o usuário não percebe cores (ex.: baixa visão, modo escala de cinza) ou usa leitor de tela
- **THEN** a distinção entre o valor estimado e os dados pendentes continua compreensível por texto e heading próprios, e cada emoji tem um rótulo textual equivalente que carrega o mesmo significado
