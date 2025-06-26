
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
      <h2 className="text-2xl font-semibold mb-4">Graded Prices</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 text-center -mx-4 px-4">
         <Button 
            variant={selectedGrade === 'Market' ? 'default' : 'outline'}
            className={cn("p-4 h-auto flex-col gap-1 shadow-sm flex-shrink-0 w-32", selectedGrade === 'Market' && 'border-primary ring-2 ring-ring')}
            onClick={() => onSelectGrade('Market')}
        >
            <span className={cn("text-sm", selectedGrade !== 'Market' && 'text-muted-foreground' )}>Market</span>
            <span className="font-bold text-lg">${marketMedianPrice.toFixed(2)}</span>
        </Button>
        {prices.map((item) => (
           <Button 
                key={item.grade}
                variant={selectedGrade === item.grade ? 'default' : 'outline'}
                className={cn("p-4 h-auto flex-col gap-1 shadow-sm flex-shrink-0 w-32", selectedGrade === item.grade && 'border-primary ring-2 ring-ring')}
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
