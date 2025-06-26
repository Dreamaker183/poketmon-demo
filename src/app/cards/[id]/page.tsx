import Image from "next/image";
import { Header } from "@/components/header";
import { GradedPrices } from "@/components/graded-prices";
import { MarketPriceIndex } from "@/components/market-price-index";
import { TradeRecordsTable } from "@/components/trade-records-table";
import type { CardDetailsData } from "@/lib/types";

const cardDetails: CardDetailsData = {
  name: "超梦ex",
  set: "Next Destinies",
  image: "https://placehold.co/375x525.png",
  gradedPrices: [
    { grade: "Ungraded", price: 18.50 },
    { grade: "Grade 7", price: 30.00 },
    { grade: "Grade 8", price: 45.00 },
    { grade: "Grade 9", price: 70.00 },
    { grade: "Grade 10", price: 150.00 },
  ],
  marketPrices: {
    lowest: 15.00,
    median: 22.50,
    highest: 35.75,
  },
  tradeRecords: [
    { id: '1', title: "Mewtwo EX - Evolutions", rarity: "Holo Rare", grade: "PSA 8", price: 30.00, date: "2023-10-22", platform: "eBay" },
    { id: '2', title: "Mewtwo EX - Holo", rarity: "Ultra Rare", grade: "Ungraded", price: 18.50, date: "2023-10-25", platform: "TCGPlayer" },
    { id: '3', title: "Mewtwo EX - Next Destinies", rarity: "Ultra Rare", grade: "PSA 9", price: 25.00, date: "2023-10-26", platform: "eBay" },
    { id: '4', title: "Mewtwo EX Full Art", rarity: "Ultra Rare", grade: "PSA 10", price: 75.00, date: "2023-10-24", platform: "PriceCharting" },
    { id: '5', title: "Mewtwo EX Promo", rarity: "Rare", grade: "BGS 7.5", price: 12.00, date: "2023-10-23", platform: "eBay" },
  ],
};

export default function CardDetailPage({ params }: { params: { id: string } }) {
  // In a real app, we'd fetch data based on params.id
  const { name, set, image, gradedPrices, marketPrices, tradeRecords } = cardDetails;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 space-y-8 p-4 md:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex justify-center items-start">
            <Image
              src={image}
              alt={`Image of ${name}`}
              width={375}
              height={525}
              className="rounded-lg shadow-lg"
              data-ai-hint="mewtwo pokemon card"
            />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-5xl font-bold font-headline">{name}</h1>
              <p className="text-lg text-muted-foreground mt-2">Pack: {set}</p>
            </div>
            <GradedPrices prices={gradedPrices} />
          </div>
        </div>
        
        <MarketPriceIndex prices={marketPrices} />
        
        <TradeRecordsTable records={tradeRecords} />
      </main>
    </div>
  );
}
