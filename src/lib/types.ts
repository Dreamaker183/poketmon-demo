
export interface OhlcData {
  date: string;
  ohlc: [number, number, number, number]; // Open, High, Low, Close
}

export interface CardData {
  id: string;
  name: string;
  number: string;
  image: string;
  set: string;
  rarity: 'Holo Rare' | 'Rare';
  grade: number;
  price: number;
  lastTrade: string; // YYYY-MM-DD
  monthlyChange: number; // percentage
  trendData: { month: string; value: number }[];
}

export interface MarketData {
  indexValue: number;
  performance: number; // percentage
  trend: { name: string; value: number }[];
  regional: {
    name: string;
    performance: number;
    index: number;
  }[];
}

export interface GradedPrice {
  grade: string;
  price: number;
  trendData: OhlcData[];
}

export interface MarketPrices {
  lowest: number;
  median: number;
  highest: number;
  trendData: OhlcData[];
}

export interface TradeRecord {
  id: string; // for key prop
  title: string;
  rarity: string;
  grade: string;
  price: number;
  date: string; // YYYY-MM-DD
  platform: string;
}

export interface CardDetailsData {
  id: string;
  name: string;
  image: string;
  set: string;
  gradedPrices: GradedPrice[];
  marketPrices: MarketPrices;
  tradeRecords: TradeRecord[];
}
