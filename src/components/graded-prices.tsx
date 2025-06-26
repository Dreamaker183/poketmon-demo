
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

const gradesToShow = [
    "Grade 7", 
    "Grade 8", 
    "Grade 9", 
    "SGC 10", 
    "CGC 10", 
    "PSA 10", 
    "BGS 10", 
    "BGS 10 Black", 
    "CGC 10 Pristine"
];

export function GradedPrices({ prices, marketMedianPrice, selectedGrade, onSelectGrade }: GradedPricesProps) {
    
    const getPriceForGrade = (grade: string) => {
        const priceInfo = prices.find(p => p.grade === grade);
        return priceInfo ? `$${priceInfo.price.toFixed(2)}` : null;
    }

    const averageButton = { grade: 'Average', displayName: 'Average Price', price: `$${marketMedianPrice.toFixed(2)}` };
    const gradeButtons = gradesToShow.map(grade => ({ grade, displayName: grade, price: getPriceForGrade(grade) }));

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Graded Prices</h2>
            <div className="flex flex-col gap-2">
                 <Button
                    key={averageButton.grade}
                    variant={selectedGrade === averageButton.grade ? 'default' : 'outline'}
                    className={cn(
                        "p-2 h-auto flex-col gap-1 shadow-sm w-full",
                        selectedGrade === averageButton.grade && 'border-primary ring-2 ring-ring'
                    )}
                    onClick={() => onSelectGrade(averageButton.grade)}
                >
                    <span className={cn("text-xs", selectedGrade !== averageButton.grade && 'text-muted-foreground')}>
                        {averageButton.displayName}
                    </span>
                    <span className="font-bold text-sm">{averageButton.price}</span>
                </Button>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {gradeButtons.map((item) => (
                        item.price && (
                            <Button 
                                key={item.grade}
                                variant={selectedGrade === item.grade ? 'default' : 'outline'}
                                className={cn(
                                    "p-2 h-auto flex-col gap-1 shadow-sm w-full", 
                                    selectedGrade === item.grade && 'border-primary ring-2 ring-ring'
                                )}
                                onClick={() => onSelectGrade(item.grade)}
                            >
                                <span className={cn("text-xs", selectedGrade !== item.grade && 'text-muted-foreground' )}>
                                    {item.displayName}
                                </span>
                                <span className="font-bold text-sm">{item.price}</span>
                            </Button>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
