
import type { CardDetailsData, OhlcData } from '@/lib/types';

// Helper to generate some random OHLC data
const generateOhlcData = (startPrice: number, days: number): OhlcData[] => {
  const data: OhlcData[] = [];
  let lastClose = startPrice;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    const open = parseFloat((lastClose * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2));
    const close = parseFloat((open * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2));
    const high = parseFloat((Math.max(open, close) * (1 + Math.random() * 0.03)).toFixed(2));
    const low = parseFloat((Math.min(open, close) * (1 - Math.random() * 0.03)).toFixed(2));

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      ohlc: [open, high, low, close]
    });
    lastClose = close;
  }
  return data;
};

const cardDetails: CardDetailsData[] = [
  {
    id: "mewtwo-ex-nd",
    name: "Mewtwo EX",
    set: "Next Destinies",
    image: "https://placehold.co/375x525.png",
    gradedPrices: [
      { grade: "Ungraded", price: 18.50, trendData: generateOhlcData(18.50, 30) },
      { grade: "Grade 1", price: 20.00, trendData: generateOhlcData(20.00, 30) },
      { grade: "Grade 2", price: 22.00, trendData: generateOhlcData(22.00, 30) },
      { grade: "Grade 3", price: 25.00, trendData: generateOhlcData(25.00, 30) },
      { grade: "Grade 4", price: 28.00, trendData: generateOhlcData(28.00, 30) },
      { grade: "Grade 5", price: 32.00, trendData: generateOhlcData(32.00, 30) },
      { grade: "Grade 6", price: 38.00, trendData: generateOhlcData(38.00, 30) },
      { grade: "Grade 7", price: 45.00, trendData: generateOhlcData(45.00, 30) },
      { grade: "Grade 8", price: 60.00, trendData: generateOhlcData(60.00, 30) },
      { grade: "Grade 9", price: 85.00, trendData: generateOhlcData(85.00, 30) },
      { grade: "Grade 9.5", price: 120.00, trendData: generateOhlcData(120.00, 30) },
      { grade: "SGC 10", price: 180.00, trendData: generateOhlcData(180.00, 30) },
      { grade: "CGC 10", price: 190.00, trendData: generateOhlcData(190.00, 30) },
      { grade: "PSA 10", price: 250.00, trendData: generateOhlcData(250.00, 30) },
      { grade: "BGS 10", price: 230.00, trendData: generateOhlcData(230.00, 30) },
      { grade: "BGS 10 Black", price: 500.00, trendData: generateOhlcData(500.00, 30) },
      { grade: "CGC 10 Pristine", price: 450.00, trendData: generateOhlcData(450.00, 30) },
    ],
    marketPrices: {
      lowest: 15.00,
      median: 22.50,
      highest: 35.75,
      trendData: generateOhlcData(22.50, 30),
    },
    tradeRecords: [
      { id: '1', title: "Mewtwo EX - Evolutions", rarity: "Ultra Rare", grade: "PSA 8", price: 30.00, date: "2023-10-22", platform: "eBay" },
      { id: '2', title: "Mewtwo EX - Holo", rarity: "Ultra Rare", grade: "Ungraded", price: 18.50, date: "2023-10-25", platform: "TCGPlayer" },
      { id: '3', title: "Mewtwo EX - Next Destinies", rarity: "Ultra Rare", grade: "PSA 9", price: 25.00, date: "2023-10-26", platform: "eBay" },
      { id: '4', title: "Mewtwo EX Full Art", rarity: "Ultra Rare", grade: "PSA 10", price: 75.00, date: "2023-10-24", platform: "PriceCharting" },
      { id: '5', title: "Mewtwo EX Promo", rarity: "Rare", grade: "BGS 7.5", price: 12.00, date: "2023-10-23", platform: "eBay" },
    ],
  }
];

export const allCardDetails = cardDetails;

export const getCardDetailsById = (id: string): CardDetailsData | undefined => {
    // In a real app, you'd fetch based on ID.
    // For this sample, we have one detailed card (Mewtwo).
    // We'll map known Mewtwo IDs to it, and use it as a fallback for others.
    const mewtwoIds = ["mewtwo-ex-nd", "bs-10", "超梦ex"];
    if (mewtwoIds.includes(id)) {
        return cardDetails.find(card => card.id === "mewtwo-ex-nd");
    }
    // Fallback to show the Mewtwo card for any other clicked card for demonstration purposes.
    return cardDetails.find(card => card.id === "mewtwo-ex-nd");
};
