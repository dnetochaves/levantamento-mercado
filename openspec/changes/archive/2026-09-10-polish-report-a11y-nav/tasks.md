## 1. Acessibilidade dos links de anúncio

- [x] 1.1 Adicionar `aria-label` dinâmico (incluindo `sourceLabel` e "abre em nova aba") aos 13 links de "Ver anúncio original" (Comparáveis) e aos 22 links de "Ver anúncio" (Apêndice) em `report-page.html`, e verificar via árvore de acessibilidade (`read_page` ou inspeção do DOM) que os 35 links expõem o `aria-label` esperado — confirmado via script: 35/35 links com `aria-label` contendo "abre em nova aba"

## 2. Aviso de disponibilidade de anúncios de terceiros

- [x] 2.1 Adicionar uma frase de aviso (reaproveitando a classe `.panel-intro`) na seção de Comparáveis e na seção de Apêndice, informando que os anúncios são de terceiros (ZAP/Wimoveis) e podem já ter sido removidos/vendidos, e verificar visualmente que o aviso aparece nas duas seções sem quebrar o layout mobile (375px)

## 3. Navegação por âncoras entre seções

- [x] 3.1 Adicionar um `id` único e estável a cada um dos 7 `mat-expansion-panel` (Metodologia, Estatísticas de Mercado, Comparáveis, Estimativa do Imóvel-Alvo, Potencial de Negócio, Próximos Passos, Apêndice), e verificar no DOM que os 7 ids existem e são únicos — confirmado via script: 7 ids únicos, batendo com os 7 hrefs do nav
- [x] 3.2 Adicionar uma lista de atalhos (links de âncora estilizados como pills, não `mat-chip`) logo abaixo do card de KPIs/destaques do imóvel-alvo, um para cada seção, e verificar visualmente em 375px que a lista não invade o espaço do card de KPIs e não quebra o layout (rolagem horizontal se necessário) — confirmado visualmente: pills em linha única com rolagem horizontal em 375px, sem rolagem em 1280px
- [x] 3.3 Verificar, clicando em pelo menos 2 atalhos com o painel de destino fechado, que a página rola até o cabeçalho correto da seção (visível mesmo fechado) e que o painel pode ser aberto em seguida com um toque — testado com `#secao-metodologia` e `#secao-apendice`: cabeçalho fica visível após o clique no atalho, e um segundo toque expande o painel

## 4. Verificação final

- [x] 4.1 Rodar `npx ng build` em `frontend/` e confirmar que o build de produção completa sem erros nem warnings novos
- [x] 4.2 Rodar `npx ng test --watch=false` e confirmar que os testes continuam passando
- [x] 4.3 Conferir em viewport mobile (375px) e desktop (~1280px) que nada da mudança introduziu rolagem horizontal ou sobreposição de elementos — confirmado via `document.body.scrollWidth <= clientWidth` nos dois viewports
- [x] 4.4 Ajuste avulso combinado no design.md: remover a data duplicada do rodapé (já aparece no cabeçalho), e verificar visualmente que o rodapé não repete a data — rodapé agora mostra só "Relatório de Inteligência Imobiliária · Ilha de Aratuba, Vera Cruz-BA"
