## Purpose

Apresentar, em uma única página web mobile-first, os dados do levantamento de mercado imobiliário (Ilha de Aratuba, Vera Cruz-BA) hoje disponíveis apenas em PDF, para que qualquer usuário consulte as informações pelo celular e acesse rapidamente os anúncios de origem.

## ADDED Requirements

### Requirement: Página única mobile-first
O sistema SHALL apresentar todo o conteúdo do relatório em uma única página (sem navegação entre rotas), com layout otimizado primeiro para largura de tela de celular e adaptado de forma responsiva para telas maiores.

#### Scenario: Acesso em tela de celular
- **WHEN** o usuário abre a página em um viewport de largura mobile (ex.: 360–430px)
- **THEN** todo o conteúdo é legível sem rolagem horizontal, com textos, tabelas e botões dimensionados para toque

#### Scenario: Acesso em tela maior
- **WHEN** o usuário abre a mesma página em um viewport de tablet ou desktop
- **THEN** o layout se adapta (por exemplo, ampliando colunas ou espaçamento) sem quebrar a leitura, permanecendo em uma única página/rota

#### Scenario: Navegação interna por seções
- **WHEN** o usuário quer ir a uma seção específica do relatório (ex.: comparáveis, estimativa)
- **THEN** o sistema permite localizar e expandir/visualizar essa seção dentro da mesma página, sem navegar para uma URL diferente

### Requirement: Sumário executivo com KPIs
O sistema SHALL exibir, em destaque no topo da página, os indicadores do sumário executivo do relatório: quantidade de anúncios levantados, faixa de valor de mercado por m², faixa de preço observada e a faixa de estimativa preliminar do imóvel-alvo.

#### Scenario: Exibição dos KPIs principais
- **WHEN** a página é carregada
- **THEN** os KPIs (nº de anúncios, R$/m² de mercado, faixa de preço observada, faixa estimada do imóvel-alvo) aparecem visíveis próximos ao topo, sem exigir expandir nenhuma seção

### Requirement: Estatísticas de mercado
O sistema SHALL exibir as estatísticas de mercado do relatório: a estatística oficial divulgada pelo portal (valor médio, área média, R$/m² médio) e a estatística recalculada sobre os comparáveis de padrão médio (média, mediana e faixa observada de R$/m²), identificando claramente a qual conjunto de dados cada estatística pertence.

#### Scenario: Diferenciação entre estatística do portal e recalculada
- **WHEN** o usuário visualiza a seção de estatísticas de mercado
- **THEN** consegue distinguir visualmente os valores "oficiais do portal" dos valores "recalculados pelos comparáveis", sem que sejam apresentados como uma única fonte

### Requirement: Tabela de comparáveis com link para o anúncio original
O sistema SHALL exibir a tabela de imóveis comparáveis (preço, área, quartos, R$/m², observação e fonte) e, para cada comparável que possua uma fonte rastreável no relatório, SHALL apresentar um link que abre o anúncio original do portal (ZAP ou Wimoveis) em uma nova aba do navegador.

#### Scenario: Abertura do anúncio original
- **WHEN** o usuário toca/clica no link de um comparável que possui fonte rastreável
- **THEN** o anúncio original do portal é aberto em uma nova aba, mantendo a página do relatório aberta

#### Scenario: Comparável sem link disponível
- **WHEN** um imóvel listado no relatório não possui link de fonte rastreável associado
- **THEN** a linha correspondente é exibida sem um elemento de link clicável, sem quebrar a tabela nem exibir um link inválido

### Requirement: Estimativa preliminar do imóvel-alvo
O sistema SHALL exibir a faixa de estimativa preliminar de valor do imóvel-alvo (cenário conservador e cenário otimista) junto com as premissas usadas no cálculo (quartos, área construída inferida, localização, estado de conservação), deixando explícito que se trata de uma inferência sujeita a revisão.

#### Scenario: Exibição da faixa de estimativa com aviso de natureza preliminar
- **WHEN** o usuário visualiza a seção de estimativa do imóvel-alvo
- **THEN** os dois valores da faixa (conservador e otimista) e as premissas usadas são exibidos, acompanhados de um aviso de que é uma estimativa preliminar sujeita a confirmação de área construída

### Requirement: Potencial de negócio (pousada/hospedagem)
O sistema SHALL exibir a seção de potencial de negócio de hospedagem, incluindo as considerações a favor e os pontos de atenção para due diligence (terreno de marinha, regularização para uso comercial, zoneamento/restrições ambientais, estado de conservação) listados no relatório.

#### Scenario: Exibição dos pontos de atenção
- **WHEN** o usuário visualiza a seção de potencial de negócio
- **THEN** todos os pontos de atenção para due diligence citados no relatório são exibidos de forma legível, sem serem omitidos ou resumidos a ponto de perder o alerta original

### Requirement: Apêndice com a base completa de imóveis
O sistema SHALL exibir a tabela do apêndice com a base completa de imóveis levantados (preço, área total, quartos e fonte), sinalizando visualmente quais linhas foram tratadas como outliers de alto padrão no relatório.

#### Scenario: Sinalização de outliers no apêndice
- **WHEN** o usuário visualiza a tabela do apêndice
- **THEN** os imóveis marcados como outlier no relatório aparecem visualmente diferenciados dos demais (ex.: cor ou rótulo), consistente com o relatório original

### Requirement: Metodologia, fontes e limitações
O sistema SHALL exibir a metodologia (critérios de busca e fontes consultadas) e as limitações declaradas no relatório (ex.: área total vs. área construída, disponibilidade aparente, possível sobreposição entre portais, não constituir laudo NBR 14653).

#### Scenario: Exibição das limitações declaradas
- **WHEN** o usuário visualiza a seção de metodologia
- **THEN** todas as limitações declaradas no relatório original estão presentes e visíveis, sem serem removidas do conteúdo exibido

### Requirement: Próximos passos recomendados
O sistema SHALL exibir a lista de próximos passos recomendados do relatório, na mesma ordem apresentada na fonte.

#### Scenario: Exibição ordenada dos próximos passos
- **WHEN** o usuário visualiza a seção de próximos passos
- **THEN** os passos aparecem numerados na mesma ordem do relatório original
