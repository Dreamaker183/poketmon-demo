
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GradedPrice } from "@/lib/types";

interface GradedPricesProps {
  prices: Omit<GradedPrice, 'trendData'>[];
  marketMedianPrice: number;
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
}

export function GradedPrices({ prices, marketMedianPrice, selectedGrade, onSelectGrade }: GradedPricesProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Prices</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 text-center">
         <Button 
            variant={selectedGrade === 'Market' ? 'default' : 'outline'}
            className={cn("p-4 h-auto flex-col gap-1 shadow-sm", selectedGrade === 'Market' && 'border-primary ring-2 ring-ring')}
            onClick={() => onSelectGrade('Market')}
        >
            <span className={cn("text-sm", selectedGrade !== 'Market' && 'text-muted-foreground' )}>Market</span>
            <span className="font-bold text-lg">${marketMedianPrice.toFixed(2)}</span>
        </Button>
        {prices.map((item) => (
           <Button 
                key={item.grade}
                variant={selectedGrade === item.grade ? 'default' : 'outline'}
                className={cn("p-4 h-auto flex-col gap-1 shadow-sm", selectedGrade === item.grade && 'border-primary ring-2 ring-ring')}
                onClick={() => onSelectGrade(item.grade)}
            >
                <span className={cn("text-sm", selectedGrade !== item.grade && 'text-muted-foreground' )}>{item.grade}</span>
                <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
            </Button>
        ))}
      </div>
    </div>
  );
}
