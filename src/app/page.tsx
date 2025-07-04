
"use client";

import { useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { MarketIndexCard } from "@/components/market-index-card";
import { TrendingCards } from "@/components/trending-cards";
import { TopGainers } from "@/components/top-gainers";
import { CardSearch } from "@/components/card-search";
import { CardDataTable } from "@/components/data-table";
import type { CardData, MarketData } from "@/lib/types";

const marketData: MarketData = {
  indexValue: 1876.50,
  performance: 2.35,
  trend: [
    { name: "Jan '24", value: 1200 },
    { name: "Feb '24", value: 1300 },
    { name: "Mar '24", value: 1250 },
    { name: "Apr '24", value: 1400 },
    { name: "May '24", value: 1550 },
    { name: "Jun '24", value: 1700 },
    { name: "Jul '24", value: 1800 },
    { name: "Aug '24", value: 1850 },
    { name: "Sep '24", value: 1820 },
    { name: "Oct '24", value: 1900 },
    { name: "Nov '24", value: 1880 },
    { name: "Jan '25", value: 1876.50 },
  ],
  regional: [
    { name: "US Card", performance: -0.50, index: 2010.75 },
    { name: "Japan Card", performance: 3.15, index: 1950.22 },
    { name: "US Vintage", performance: 4.25, index: 1543.80 },
    { name: "Japan Vintage", performance: 1.80, index: 1234.10 },
  ]
};

const trendingCards: Pick<CardData, 'id' | 'name' | 'set' | 'image' | 'monthlyChange'>[] = [
    { id: 'bs-4', name: "Charizard", set: "Base Set", image: "https://placehold.co/150x210.png", monthlyChange: 15.00, },
    { id: 'wbp-1', name: "Pikachu", set: "Wizards Black Star Promos", image: "https://placehold.co/150x210.png", monthlyChange: -5.20, },
    { id: 'bs-10', name: "Mewtwo", set: "Base Set", image: "https://placehold.co/150x210.png", monthlyChange: 8.75, },
];

const topGainers: Pick<CardData, 'id' | 'name' | 'set' | 'image' | 'monthlyChange'>[] = [
    { id: 'bs-2', name: "Blastoise", set: "Base Set", image: "https://placehold.co/100x100.png", monthlyChange: 22.5 },
    { id: 'bs-15', name: "Venusaur", set: "Base Set", image: "https://placehold.co/100x100.png", monthlyChange: 18.7 },
    { id: 'bs-6', name: "Gyarados", set: "Base Set", image: "https://placehold.co/100x100.png", monthlyChange: 15.3 },
];

const generateTrendData = (baseValue: number, fluctuation: number) => 
  Array.from({ length: 12 }, (_, i) => ({ 
    month: `${i + 1}`, 
    value: baseValue + (Math.sin(i) * fluctuation) + (i * fluctuation / 5) 
  }));

const cardTableData: CardData[] = [
  { id: 'bs-4', name: "Charizard", number: "#4/102", image: "https://placehold.co/40x56.png", set: "Base Set", rarity: "Ultra Rare", grade: 9, price: 1200.00, lastTrade: "2024-07-15", monthlyChange: 15.00, trendData: generateTrendData(1000, 200), isHolo: true },
  { id: 'bs-2', name: "Blastoise", number: "#2/102", image: "https://placehold.co/40x56.png", set: "Base Set", rarity: "Ultra Rare", grade: 8, price: 800.00, lastTrade: "2024-07-12", monthlyChange: 22.50, trendData: generateTrendData(700, 100), isHolo: true },
  { id: 'bs-15', name: "Venusaur", number: "#15/102", image: "https://placehold.co/40x56.png", set: "Base Set", rarity: "Rare", grade: 7, price: 600.00, lastTrade: "2024-07-10", monthlyChange: 18.70, trendData: generateTrendData(500, 100), isHolo: true },
  { id: 'wbp-1', name: "Pikachu", number: "#1", image: "https://placehold.co/40x56.png", set: "Wizards Black Star Promos", rarity: "Common", grade: 9, price: 400.00, lastTrade: "2024-06-28", monthlyChange: -5.20, trendData: generateTrendData(450, -50) },
  { id: 'bs-10', name: "Mewtwo", number: "#10/102", image: "https://placehold.co/40x56.png", set: "Base Set", rarity: "Uncommon", grade: 9, price: 200.00, lastTrade: "2024-07-18", monthlyChange: 8.75, trendData: generateTrendData(180, 20), isHolo: true },
  { id: 'bs-6', name: "Gyarados", number: "#6/102", image: "https://placehold.co/40x56.png", set: "Base Set", rarity: "Rare", grade: 10, price: 100.00, lastTrade: "2024-07-05", monthlyChange: 15.30, trendData: generateTrendData(80, 20), isHolo: true },
];

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const filteredCardData = useMemo(() => {
    if (!searchTerm) {
      return cardTableData;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return cardTableData.filter(card =>
      card.name.toLowerCase().includes(lowercasedTerm) ||
      card.set.toLowerCase().includes(lowercasedTerm) ||
      card.number.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <MarketIndexCard data={marketData} className="h-full" />
          </div>
          <div className="lg:col-span-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <TrendingCards cards={trendingCards} />
            <TopGainers cards={topGainers} />
          </div>
        </div>
        <div>
          <CardSearch value={searchTerm} onChange={handleSearchChange} />
        </div>
        <div>
          <CardDataTable data={filteredCardData} />
        </div>
      </main>
    </div>
  );
}


export default function Home() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}
