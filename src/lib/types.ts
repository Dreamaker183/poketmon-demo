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
