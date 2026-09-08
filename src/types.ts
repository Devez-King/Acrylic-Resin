export interface Manufacturer {
  rank: number;
  name: string;
  country: string;
  marketShare: number; // percentage
  revenueUsdMillion: number;
  keyBrands: string[];
  strengths: string;
  solidVsSolutionFocus: string;
}

export interface ApplicationDemand {
  id: string;
  nameKo: string;
  nameEn: string;
  share: number; // percentage
  marketSize2024: number; // in USD Million
  cagr: number; // percentage
  keyDrivers: string;
  dominantType: 'Solid' | 'Solution/Emulsion' | 'Both';
}

export interface ResinTypeComparison {
  type: string;
  marketShare: number; // percentage
  marketSizeUsdMillion: number;
  cagr: number;
  vocLevel: 'Very Low' | 'Medium' | 'High';
  priceIndex: 'High ($$$)' | 'Medium ($$)' | 'Low ($)';
  primaryApplications: string[];
  advantages: string[];
  disadvantages: string[];
}

export interface RegionMarket {
  region: string;
  countries: string;
  marketSize2024: number; // USD Million
  marketSize2030: number; // USD Million
  cagr: number;
  keyGrowthDrivers: string;
  regulatoryEnvironment: string;
}

export interface DataSourceInfo {
  institution: string;
  reportTitle: string;
  publishedYear: string;
  confidenceScore: string;
  scope: string;
  urlRef: string;
}
