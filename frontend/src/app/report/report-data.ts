import { ReportData } from './report-data.model';

/**
 * Transcrito de `Relatorio_Ilha_Aratuba_Vera_Cruz.pdf` (levantamento de 10/09/2026).
 * Dado estático de um relatório pontual - ver design.md da mudança
 * `add-market-report-viewer` para o racional dessa decisão.
 */
export const REPORT_DATA: ReportData = {
  reportTitle: 'Levantamento de Mercado e Estimativa Preliminar de Valor',
  reportSubtitle: 'Ilha de Aratuba — Vera Cruz (BA)',
  reportScope:
    'Casas à venda na região da Ilha de Aratuba/Vera Cruz-BA, para precificação do imóvel em avaliação.',
  reportDate: '10 de setembro de 2026',
  reportStatus:
    'Preliminar — sujeito a revisão após confirmação de área construída e vistoria.',

  kpis: [
    { label: 'Anúncios de casas identificados', value: '~35', sublabel: '2 portais' },
    { label: 'Valor de mercado por m²', value: 'R$ 1,3–1,6 mil', sublabel: 'Padrão médio, beira-mar' },
    { label: 'Faixa de preço observada', value: 'R$ 250 mil – R$ 990 mil', sublabel: 'Casas padrão médio' },
    { label: 'Estimativa do imóvel-alvo', value: 'R$ 900.000 – R$ 2.200.000', sublabel: 'Condicionada à área construída real' },
  ],

  targetPropertyHighlights: [
    '9 quartos construídos',
    'Posição beira-mar direta (acesso imediato à areia da praia a partir da propriedade)',
    'Estado de conservação baixo (reforma em providência)',
    'Porte considerado grande para o padrão da região',
    'Área construída ainda não informada — estimativa inferida a partir da amostra de mercado',
  ],

  methodology: {
    criteria: [
      { label: 'Localização', value: 'Ilha de Aratuba, Vera Cruz — Bahia' },
      { label: 'Tipo', value: 'Casa' },
      { label: 'Operação', value: 'Venda' },
      { label: 'Faixa de preço', value: 'Não restringida — pesquisa exploratória ampla' },
      { label: 'Características', value: 'Não restringidas — amostra de todo o padrão de mercado local' },
    ],
    sources: [
      {
        name: 'ZAP Imóveis (Nível B — grande portal nacional)',
        detail: '22 casas ativas em Aratuba/Vera Cruz, com estatística própria de mercado divulgada pelo portal',
      },
      {
        name: 'Wimoveis / Imovelweb (Nível B — grande portal nacional)',
        detail: '23 imóveis (casas e terrenos) em Aratuba/Vera Cruz',
      },
      {
        name: 'Marcos Broker Consultoria Imobiliária e Fábio Braga Imóveis (Nível A — sites próprios de imobiliárias locais)',
        detail: 'Comparáveis adicionais de alto padrão, usados como referência de outliers',
      },
    ],
    limitations: [
      'Os valores de "área total" (m² tot.) informados pelos portais nem sempre correspondem à área construída — em vários casos (terrenos acima de 500–900 m²) é provável que reflitam o lote, não a edificação.',
      'Não foi possível confirmar disponibilidade real de cada anúncio no momento da leitura deste relatório — todos os preços refletem o valor publicado na data da coleta e devem ser tratados como "disponibilidade aparente".',
      'Existe sobreposição de anúncios entre portais (o mesmo imóvel pode aparecer mais de uma vez) — não foi feita deduplicação individual por endereço/matrícula nesta rodada.',
      'Este relatório não constitui laudo de avaliação imobiliária (não segue a NBR 14653). É um levantamento de mercado para apoio à tomada de decisão comercial.',
    ],
  },

  officialMarketStat: {
    title: 'Estatística oficial do portal (ZAP Imóveis)',
    items: [
      { label: 'Valor médio de compra de casa', value: 'R$ 480 mil' },
      { label: 'Área média', value: '360 m²' },
      { label: 'Valor médio por m²', value: 'R$ 1,3 mil/m²' },
    ],
  },

  recalculatedMarketStat: {
    title: 'Estatística recalculada (comparáveis com preço + área confirmados, 13 imóveis)',
    items: [
      { label: 'Média', value: 'R$ 1.601/m²' },
      { label: 'Mediana', value: 'R$ 1.500/m²' },
      { label: 'Faixa observada', value: 'R$ 500 – 2.963/m²' },
    ],
  },
  recalculatedStatReading:
    'A faixa de R$ 1.300 a R$ 1.600/m² representa o padrão médio consolidado para casas em condomínio fechado na região, com prêmio adicional (acima de R$ 2.000/m²) para imóveis com acesso direto e exclusivo à praia ("pé na areia") — categoria em que o imóvel-alvo se enquadra pela descrição informada.',

  excludedOutliers: [
    { price: 'R$ 980.000', area: '130 m²', pricePerSqm: '~R$ 7.538', reason: 'Mobiliada, alto padrão' },
    { price: 'R$ 990.000', area: '200 m²', pricePerSqm: '~R$ 4.950', reason: 'Mobiliada, alto padrão' },
    { price: 'R$ 950.000', area: '200 m²', pricePerSqm: '~R$ 4.750', reason: 'Alto padrão' },
    { price: 'R$ 950.000', area: '150 m²', pricePerSqm: '~R$ 6.333', reason: 'Mobiliada, alto padrão' },
    { price: 'R$ 1.100.000', area: '231 m²', pricePerSqm: '~R$ 4.762', reason: 'Alto padrão (Fábio Braga)' },
    { price: 'R$ 3.980.000', area: 'não informada', pricePerSqm: '—', reason: 'Empreendimento de altíssimo padrão (Cond. Ponta da Ilha)' },
  ],

  comparables: [
    {
      price: 'R$ 280.000', area: '360 m²', bedrooms: 3, pricePerSqm: '~778',
      observation: 'Precisa reforma', sourceLabel: 'ZAP #2852837349',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-3-quartos-aratuba-vera-cruz-ba-360m2-id-2852837349/',
    },
    {
      price: 'R$ 320.000', area: '360 m²', bedrooms: 4, pricePerSqm: '~889',
      observation: 'Condomínio', sourceLabel: 'ZAP #2867195759',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-4-quartos-mobiliado-aratuba-vera-cruz-ba-360m2-id-2867195759/',
    },
    {
      price: 'R$ 360.000', area: '720 m²', bedrooms: 5, pricePerSqm: '~500',
      observation: 'Terreno amplo', sourceLabel: 'ZAP #2866446005',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-5-quartos-mobiliado-aratuba-vera-cruz-ba-720m2-id-2866446005/',
    },
    {
      price: 'R$ 380.000', area: '360 m²', bedrooms: 4, pricePerSqm: '~1.056',
      observation: 'Condomínio', sourceLabel: 'ZAP #2869421476',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-4-quartos-mobiliado-aratuba-vera-cruz-ba-360m2-id-2869421476/',
    },
    {
      price: 'R$ 390.000', area: '500 m²', bedrooms: 2, pricePerSqm: '~780',
      observation: 'Condomínio', sourceLabel: 'ZAP #2866614020',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-2-quartos-mobiliado-aratuba-vera-cruz-ba-500m2-id-2866614020/',
    },
    {
      price: 'R$ 430.000', area: '360 m²', bedrooms: 3, pricePerSqm: '~1.194',
      observation: 'Escriturada, Cond. Praia dos Corais', sourceLabel: 'Wimoveis #3036257208',
      sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-3-quartos-2-suites-escriturada-360m2-3036257208.html',
    },
    {
      price: 'R$ 450.000', area: '200 m²', bedrooms: 4, pricePerSqm: '~2.250',
      observation: 'Condomínio', sourceLabel: 'ZAP #2690678064',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-4-quartos-aratuba-vera-cruz-ba-200m2-id-2690678064/',
    },
    {
      price: 'R$ 480.000', area: '300 m²', bedrooms: 3, pricePerSqm: '~1.600',
      observation: 'Condomínio', sourceLabel: 'ZAP #2910739037',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-3-quartos-aratuba-vera-cruz-ba-300m2-id-2910739037/',
    },
    {
      price: 'R$ 495.000', area: '200 m²', bedrooms: 4, pricePerSqm: '~2.475',
      observation: 'Condomínio', sourceLabel: 'ZAP #2892220675',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-4-quartos-mobiliado-aratuba-vera-cruz-ba-200m2-id-2892220675/',
    },
    {
      price: 'R$ 600.000', area: '400 m²', bedrooms: 3, pricePerSqm: '~1.500',
      sourceLabel: 'ZAP #2866468121',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-3-quartos-mobiliado-aratuba-vera-cruz-ba-400m2-id-2866468121/',
    },
    {
      price: 'R$ 800.000', area: '270 m²', bedrooms: 5, pricePerSqm: '~2.963',
      observation: 'Condomínio', sourceLabel: 'ZAP #2683662533',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-5-quartos-aratuba-vera-cruz-ba-270m2-id-2683662533/',
    },
    {
      price: 'R$ 850.000', area: '420 m²', bedrooms: 5, pricePerSqm: '~2.024',
      observation: 'Pé na areia — frente mar (referência mais próxima do perfil do imóvel-alvo)',
      sourceLabel: 'Wimoveis #3034916512',
      sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-pe-na-areia-frente-mar-5-qtos-sendo-2-suites-3034916512.html',
    },
    {
      price: 'R$ 899.000', area: '320 m²', bedrooms: 4, pricePerSqm: '~2.809',
      observation: 'Condomínio', sourceLabel: 'ZAP #2827208554',
      sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-4-quartos-mobiliado-aratuba-vera-cruz-ba-320m2-id-2827208554/',
    },
  ],

  targetEstimate: {
    premises: [
      { label: 'Quartos', detail: '9 (informado)' },
      {
        label: 'Área construída',
        detail:
          'Não informada — estimada por proporção média de área/quarto observada na amostra de comparáveis (≈ 105 m² por quarto), resultando em uma faixa inferida de 700 a 1.200 m² de área construída',
      },
      {
        label: 'Localização',
        detail:
          'Beira-mar direta ("pé na areia") — posicionada na faixa de preço premium da amostra (comparável mais próximo: R$ 850.000 / 420 m² / ~R$ 2.024 por m²)',
      },
      {
        label: 'Estado de conservação',
        detail:
          'Baixo, em reforma — aplicado deságio de conservação, com base no comparável local que precisa de reforma (R$ 778/m²) frente a comparáveis equivalentes em bom estado (R$ 889–1.056/m²), sugerindo deságio de referência na ordem de 20–30%',
      },
    ],
    scenarios: [
      { label: 'Cenário conservador', value: 'R$ 900.000', detail: 'Área menor + deságio máximo de conservação' },
      { label: 'Cenário otimista', value: 'R$ 2.200.000', detail: 'Área maior + prêmio pleno de beira-mar' },
    ],
    calculationNote:
      'Cálculo: área estimada (700–1.200 m²) × R$/m² beira-mar ajustado por estado de conservação (R$ 1.200–1.800/m², após deságio sobre a faixa premium de R$ 1.800–2.500/m² observada em comparáveis de frente-mar em bom estado).',
    rangeExplanation:
      'A amplitude entre R$ 900 mil e R$ 2,2 milhões reflete diretamente a incerteza sobre a área construída — a variável de maior peso no cálculo. Uma vez confirmada a metragem real (mesmo que aproximada, por planta ou medição em campo), a faixa pode ser reduzida para um intervalo de ±15–20%, adequado para negociação.',
    preliminaryWarning:
      'Natureza da estimativa: este é um valor inferido, não um dado confirmado. A área construída real do imóvel ainda não foi informada. Assim que os dados definitivos (área construída, estado detalhado, matrícula) forem recebidos, esta estimativa deve ser recalculada e substitui integralmente a que está aqui.',
  },

  businessPotential: {
    intro:
      'O porte do imóvel (9 quartos) e a posição beira-mar direta são compatíveis com conversão para uso de hospedagem (pousada de pequeno porte). Segue lógica de avaliação por renda operacional, distinta da precificação residencial comparativa usada nas demais seções.',
    pros: [
      'Localização "pé na areia" é o atributo mais valorizado nos comparáveis levantados (prêmio de ~50–100% sobre o padrão médio de R$/m²) — mesmo atributo que mais valoriza uma pousada para hóspedes',
      '9 quartos já construídos reduzem o investimento inicial de expansão, mesmo considerando a reforma necessária',
      'A região de Vera Cruz tem demanda turística consolidada, com acesso por travessia marítima a partir de Salvador',
    ],
    cautions: [
      {
        title: 'Terreno de marinha',
        detail:
          'Imóveis em faixa litorânea no Brasil frequentemente estão sujeitos ao regime de terreno de marinha (bem da União), com pagamento de foro e laudêmio e restrições à transferência plena de propriedade. É essencial verificar a situação registral (matrícula) e se há inscrição junto à Secretaria do Patrimônio da União (SPU) antes de qualquer negociação.',
      },
      {
        title: 'Regularização para uso comercial',
        detail:
          'Operar como pousada exige alvará de funcionamento municipal, cadastro no CADASTUR e, dependendo do porte, adequações de acessibilidade e corpo de bombeiros — o custo dessa regularização deve ser somado ao custo de reforma na avaliação de viabilidade.',
      },
      {
        title: 'Zoneamento e restrições ambientais',
        detail:
          'Áreas de praia podem ter restrições de uso do solo (APA, faixa de preservação permanente) que limitam ou condicionam construção/reforma — a confirmar junto à prefeitura de Vera Cruz.',
      },
      {
        title: 'Estado de conservação',
        detail:
          'Como o imóvel está com conservação baixa, recomenda-se orçar a reforma antes de decidir entre revenda residencial e conversão comercial — os retornos de cada rota dependem diretamente desse custo.',
      },
    ],
  },

  appendix: [
    { price: 'R$ 450.000', totalArea: '400 m²', bedrooms: 5, sourceLabel: 'ZAP #2427754240', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-5-quartos-mobiliado-aratuba-vera-cruz-ba-400m2-id-2427754240/', isOutlier: false },
    { price: 'R$ 390.000', totalArea: '800 m²', bedrooms: 3, sourceLabel: 'ZAP #2791008813', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-3-quartos-mobiliado-aratuba-vera-cruz-ba-800m2-id-2791008813/', isOutlier: false },
    { price: 'R$ 600.000', totalArea: '150 m²', bedrooms: 5, sourceLabel: 'ZAP #2563052407', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-5-quartos-aratuba-vera-cruz-ba-150m2-id-2563052407/', isOutlier: false },
    { price: 'R$ 990.000', totalArea: '200 m²', bedrooms: 4, sourceLabel: 'ZAP #2785179962', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-4-quartos-mobiliado-aratuba-vera-cruz-ba-200m2-id-2785179962/', isOutlier: true },
    { price: 'R$ 350.000', totalArea: '370 m²', bedrooms: 5, sourceLabel: 'ZAP #2869565771', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-5-quartos-mobiliado-aratuba-vera-cruz-ba-370m2-id-2869565771/', isOutlier: false },
    { price: 'R$ 979.999', totalArea: '150 m²', bedrooms: 3, sourceLabel: 'ZAP #2877106798', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-3-quartos-mobiliado-aratuba-vera-cruz-ba-150m2-id-2877106798/', isOutlier: false },
    { price: 'R$ 280.000', totalArea: '240 m²', bedrooms: 2, sourceLabel: 'ZAP #2866490375', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-2-quartos-mobiliado-aratuba-vera-cruz-ba-240m2-id-2866490375/', isOutlier: false },
    { price: 'R$ 950.000', totalArea: '200 m²', bedrooms: 5, sourceLabel: 'ZAP #2884783786', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-5-quartos-aratuba-vera-cruz-ba-200m2-id-2884783786/', isOutlier: true },
    { price: 'R$ 700.000', totalArea: '932 m²', bedrooms: 4, sourceLabel: 'ZAP #2866671768', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-4-quartos-mobiliado-aratuba-vera-cruz-ba-932m2-id-2866671768/', isOutlier: false },
    { price: 'R$ 950.000', totalArea: '150 m²', bedrooms: 5, sourceLabel: 'ZAP #2901087908', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-5-quartos-mobiliado-aratuba-vera-cruz-ba-150m2-id-2901087908/', isOutlier: true },
    { price: 'R$ 359.999', totalArea: '400 m²', bedrooms: 3, sourceLabel: 'ZAP #2827207524', sourceUrl: 'https://www.zapimoveis.com.br/imovel/venda-casa-de-condominio-3-quartos-aratuba-vera-cruz-ba-400m2-id-2827207524/', isOutlier: false },
    { price: 'R$ 980.000', totalArea: '130 m²', bedrooms: 3, sourceLabel: 'Wimoveis #3036290368', sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-com-3-dormitorios-a-venda-130-m-por-r$-3036290368.html', isOutlier: true },
    { price: 'R$ 250.000', totalArea: '600 m² (mobiliada)', bedrooms: 3, sourceLabel: 'Wimoveis #3034834801', sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-mobiliada-3-qtos-sendo-2-suites-escritura-3034834801.html', isOutlier: false },
    { price: 'R$ 350.000', totalArea: '450 m²', bedrooms: 7, sourceLabel: 'Wimoveis #3039850799', sourceUrl: 'https://www.wimoveis.com.br/propriedades/vendo-casa-7quartos-tairu-3039850799.html', isOutlier: false },
    { price: 'R$ 240.000', totalArea: '450 m²', bedrooms: 2, sourceLabel: 'Wimoveis #3039866248', sourceUrl: 'https://www.wimoveis.com.br/propriedades/vendo-casa-2-quartos-tairu-3039866248.html', isOutlier: false },
    { price: 'R$ 500.000', totalArea: '1.000 m²', bedrooms: 6, sourceLabel: 'Wimoveis #2987424584', sourceUrl: 'https://www.wimoveis.com.br/propriedades/02-casas-a-venda-na-praia-de-aratuba-local-fechado-2987424584.html', isOutlier: false },
    { price: 'R$ 500.000', totalArea: '2.000 m²', bedrooms: 4, sourceLabel: 'Wimoveis #3026800936', sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-a-venda-em-berlinque-vera-cruz-3026800936.html', isOutlier: false },
    { price: 'R$ 275.000', totalArea: '575 m² (reformada)', bedrooms: 2, sourceLabel: 'Wimoveis #3002256754', sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-de-condominio-em-tairu-reformada-e-aconchegante-3002256754.html', isOutlier: false },
    { price: 'R$ 650.000', totalArea: '328 m² (área não confirmada)', bedrooms: 4, sourceLabel: 'Wimoveis #3045147678', sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-com-4-dormitorios-150-m-para-venda-aratuba-3045147678.html', isOutlier: false },
    { price: 'R$ 350.000', totalArea: '900 m²', bedrooms: 4, sourceLabel: 'Wimoveis #2967874969', sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-em-condominio-fechado-tairu-itaparica-2967874969.html', isOutlier: false },
    { price: 'R$ 450.000', totalArea: 'não informada', bedrooms: 5, sourceLabel: 'Wimoveis #2952808056', sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-a-venda-em-aratuba-2952808056.html', isOutlier: false },
    { price: 'R$ 250.000', totalArea: 'não confirmada', bedrooms: 3, sourceLabel: 'Wimoveis #3002715024', sourceUrl: 'https://www.wimoveis.com.br/propriedades/casa-em-aratuba-3002715024.html', isOutlier: false },
  ],

  nextSteps: [
    { order: 1, text: 'Confirmar área construída real do imóvel-alvo (planta, IPTU ou medição em campo) — é a variável que mais estreita a faixa de estimativa' },
    { order: 2, text: 'Verificar matrícula e situação registral, incluindo eventual enquadramento como terreno de marinha' },
    { order: 3, text: 'Orçar a reforma necessária, para decidir entre precificação para venda residencial imediata ou investimento com vistas a uso comercial (pousada)' },
    { order: 4, text: 'Revisitar os 3 comparáveis mais próximos do perfil beira-mar (Seção 4: "Pé na areia" e os dois acima de R$ 800.000) para negociação direta de referência de preço com o vendedor/comprador' },
    { order: 5, text: 'Se a demanda por levantamentos como este for recorrente na região, considerar montar um monitoramento automatizado (novos anúncios + variação de preço em Aratuba/Vera Cruz) em vez de repetir a coleta manualmente a cada rodada' },
  ],
};
