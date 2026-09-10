export interface Kpi {
  label: string;
  value: string;
  sublabel?: string;
}

export interface MarketStatItem {
  label: string;
  value: string;
}

export interface MarketStatGroup {
  title: string;
  items: MarketStatItem[];
}

export interface ExcludedOutlier {
  price: string;
  area: string;
  pricePerSqm: string;
  reason: string;
}

export interface Comparable {
  price: string;
  area: string;
  bedrooms: number;
  pricePerSqm: string;
  observation?: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface TargetEstimatePremise {
  label: string;
  detail: string;
}

export interface TargetEstimateScenario {
  label: string;
  value: string;
  detail: string;
}

export interface MissingDataItem {
  icon: string;
  label: string;
  detail: string;
}

export interface TargetEstimate {
  premises: TargetEstimatePremise[];
  scenarios: TargetEstimateScenario[];
  calculationNote: string;
  rangeExplanation: string;
  preliminaryWarning: string;
  calloutHeadline: string;
  confidenceNote: string;
  missingData: MissingDataItem[];
}

export interface BusinessPotentialCaution {
  title: string;
  detail: string;
}

export interface BusinessPotential {
  intro: string;
  pros: string[];
  cautions: BusinessPotentialCaution[];
}

export interface AppendixItem {
  price: string;
  totalArea: string;
  bedrooms: number;
  sourceLabel: string;
  sourceUrl: string;
  isOutlier: boolean;
}

export interface MethodologyCriterion {
  label: string;
  value: string;
}

export interface MethodologySource {
  name: string;
  detail: string;
}

export interface Methodology {
  criteria: MethodologyCriterion[];
  sources: MethodologySource[];
  limitations: string[];
}

export interface NextStep {
  order: number;
  text: string;
}

export interface ReportData {
  reportTitle: string;
  reportSubtitle: string;
  reportScope: string;
  reportDate: string;
  reportStatus: string;
  kpis: Kpi[];
  targetPropertyHighlights: string[];
  methodology: Methodology;
  officialMarketStat: MarketStatGroup;
  recalculatedMarketStat: MarketStatGroup;
  recalculatedStatReading: string;
  excludedOutliers: ExcludedOutlier[];
  comparables: Comparable[];
  targetEstimate: TargetEstimate;
  businessPotential: BusinessPotential;
  appendix: AppendixItem[];
  nextSteps: NextStep[];
}
