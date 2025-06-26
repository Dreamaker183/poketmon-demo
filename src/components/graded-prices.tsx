
"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { GradedPrice } from "@/lib/types";

interface GradedPricesProps {
  prices: Omit<GradedPrice, 'trendData'>[];
  marketMedianPrice: number;
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
}

const standardGradeOrder = [
    "Ungraded", "Grade 1", "Grade 2", "Grade 3", "Grade 4", 
    "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 9.5", "Grade 10"
];

const premiumGradeNames = [
    "SGC 10", "CGC 10", "PSA 10", "BGS 10", "BGS 10 Black", "CGC Pristine"
];

export function GradedPrices({ prices, marketMedianPrice, selectedGrade, onSelectGrade }: GradedPricesProps) {
    const standardPrices = prices.filter(p => standardGradeOrder.includes(p.grade))
                                 .sort((a, b) => standardGradeOrder.indexOf(a.grade) - standardGradeOrder.indexOf(b.grade));
    
    const premiumPrices = prices.filter(p => premiumGradeNames.includes(p.grade))
                                .sort((a, b) => premiumGradeNames.indexOf(a.grade) - premiumGradeNames.indexOf(b.grade));

    const selectedStandardIndex = standardGradeOrder.indexOf(selectedGrade);

    const handleSliderChange = (value: number[]) => {
        const newGrade = standardGradeOrder[value[0]];
        if (newGrade) {
            onSelectGrade(newGrade);
        }
    };
    
    const getPriceForGrade = (grade: string) => {
        const priceInfo = prices.find(p => p.grade === grade);
        return priceInfo ? `$${priceInfo.price.toFixed(2)}` : '-';
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Graded Prices</h2>
            <div className="space-y-4">
                <Button 
                    variant={selectedGrade === 'Average' ? 'default' : 'outline'}
                    className={cn("p-4 h-auto w-full flex justify-between items-center shadow-sm text-left", selectedGrade === 'Average' && 'border-primary ring-2 ring-ring')}
                    onClick={() => onSelectGrade('Average')}
                >
                    <span className="text-base font-medium">Average Price</span>
                    <span className="font-bold text-lg">${marketMedianPrice.toFixed(2)}</span>
                </Button>

                <div className="p-4 border rounded-lg bg-card shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                         <span className={cn("text-base font-medium", selectedStandardIndex === -1 && 'text-muted-foreground')}>
                            {selectedStandardIndex !== -1 ? selectedGrade : 'Select a Grade'}
                        </span>
                        <span className={cn("font-bold text-lg", selectedStandardIndex === -1 && 'text-muted-foreground')}>
                            {selectedStandardIndex !== -1 ? getPriceForGrade(selectedGrade) : ''}
                        </span>
                    </div>
                    <Slider
                        min={0}
                        max={standardGradeOrder.length - 1}
                        step={1}
                        value={selectedStandardIndex !== -1 ? [selectedStandardIndex] : [0]}
                        onValueChange={handleSliderChange}
                        disabled={standardPrices.length === 0}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Ungraded</span>
                        <span>Grade 10</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {premiumPrices.map((item) => (
                       <Button 
                            key={item.grade}
                            variant={selectedGrade === item.grade ? 'default' : 'outline'}
                            className={cn("p-2 h-auto flex-col gap-1 shadow-sm w-full", selectedGrade === item.grade && 'border-primary ring-2 ring-ring')}
                            onClick={() => onSelectGrade(item.grade)}
                        >
                            <span className={cn("text-xs", selectedGrade !== item.grade && 'text-muted-foreground' )}>{item.grade}</span>
                            <span className="font-bold text-sm">${item.price.toFixed(2)}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
