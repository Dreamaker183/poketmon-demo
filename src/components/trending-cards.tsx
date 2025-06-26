import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CardData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TrendingCardsProps {
  cards: Pick<CardData, 'name' | 'set' | 'image' | 'monthlyChange'>[];
}

export function TrendingCards({ cards }: TrendingCardsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {cards.map((card) => {
            const isPositive = card.monthlyChange >= 0;
            return (
              <div key={card.name} className="relative group">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={150}
                  height={210}
                  className="rounded-lg shadow-md transition-transform group-hover:scale-105"
                  data-ai-hint="pokemon card"
                />
                <div className="absolute top-2 right-2 p-1 rounded-full bg-background/80">
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-[hsl(var(--chart-2))]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                    <h3 className="text-white text-sm font-bold truncate">{card.name}</h3>
                    <p className="text-white/80 text-xs truncate">{card.set}</p>
                    <p className={cn("font-semibold text-xs", isPositive ? "text-[hsl(var(--chart-2))]" : "text-red-400")}>
                        {isPositive ? '+' : ''}{card.monthlyChange.toFixed(2)}%
                    </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
