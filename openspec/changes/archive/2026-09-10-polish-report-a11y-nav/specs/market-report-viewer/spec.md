## ADDED Requirements

### Requirement: Indicação de link externo para leitores de tela
Todo link de anúncio (nas seções de Comparáveis e de Apêndice) que abre o portal de origem em uma nova aba SHALL comunicar essa abertura em nova aba a tecnologias assistivas (ex.: leitor de tela), além da indicação visual já existente.

#### Scenario: Leitor de tela anuncia abertura em nova aba
- **WHEN** um usuário de leitor de tela foca em um link de anúncio (Comparáveis ou Apêndice)
- **THEN** a tecnologia assistiva anuncia que ativar o link abre o conteúdo em uma nova aba, fora do app

### Requirement: Aviso sobre disponibilidade dos anúncios de terceiros
O sistema SHALL exibir, próximo aos links de anúncio, um aviso informando que os anúncios são de terceiros (portais ZAP/Wimoveis) e podem ter sido removidos ou vendidos desde a coleta dos dados.

#### Scenario: Aviso visível perto dos links de anúncio
- **WHEN** o usuário visualiza uma seção que contém links de anúncio (Comparáveis ou Apêndice)
- **THEN** um aviso é exibido informando que os anúncios são de terceiros e podem não estar mais disponíveis

### Requirement: Navegação rápida entre seções via âncoras
O sistema SHALL oferecer, dentro da mesma página, atalhos de navegação por âncora para cada uma das seções do relatório (Metodologia, Estatísticas de Mercado, Comparáveis, Estimativa do Imóvel-Alvo, Potencial de Negócio, Próximos Passos, Apêndice), sem introduzir rotas do Angular Router nem sair da página única.

#### Scenario: Pular direto para uma seção
- **WHEN** o usuário aciona o atalho de uma seção específica
- **THEN** a página rola até essa seção, sem navegar para uma URL diferente e sem recarregar o app

#### Scenario: Atalhos continuam funcionando com seções fechadas
- **WHEN** o usuário aciona o atalho de uma seção cujo painel do accordion está fechado
- **THEN** o painel correspondente é aberto (ou a página rola até seu cabeçalho, permitindo abri-lo em seguida), em vez de rolar até um conteúdo invisível
