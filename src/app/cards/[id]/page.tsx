
"use client";

import { useState } from 'react';
import Image from "next/image";
import { notFound } from 'next/navigation';
import { Header } from "@/components/header";
import { GradedPrices } from "@/components/graded-prices";
import { MarketPriceIndex } from "@/components/market-price-index";
import { TradeRecordsTable } from "@/components/trade-records-table";
import { getCardDetailsById } from '@/lib/sample-data';
import type { OhlcData } from '@/lib/types';

export default function CardDetailPage({ params }: { params: { id: string } }) {
  const cardDetails = getCardDetailsById(params.id);

  const [selectedGrade, setSelectedGrade] = useState<string>('Average');

  if (!cardDetails) {
    notFound();
  }

  const chartData = selectedGrade === 'Average'
    ? cardDetails.marketPrices.trendData
    : cardDetails.gradedPrices.find(p => p.grade === selectedGrade)?.trendData ?? [];

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
              <p className="text-lg text-muted-foreground mt-2">Set: {set}</p>
            </div>
            <GradedPrices
              prices={gradedPrices}
              marketMedianPrice={marketPrices.median}
              onSelectGrade={setSelectedGrade}
              selectedGrade={selectedGrade}
            />
          </div>
        </div>

        <MarketPriceIndex prices={marketPrices} trendData={chartData} />

        <TradeRecordsTable records={tradeRecords} />
      </main>
    </div>
  );
}
