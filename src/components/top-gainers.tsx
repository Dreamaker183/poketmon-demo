import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { CardData } from "@/lib/types";

interface TopGainersProps {
    cards: Pick<CardData, 'name' | 'set' | 'image' | 'monthlyChange'>[];
}

export function TopGainers({ cards }: TopGainersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Gainers</CardTitle>
        <CardDescription>Last 30 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {cards.map((card) => (
            <li key={card.name} className="flex items-center gap-4">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src={card.image} alt={card.name} data-ai-hint="pokemon card" />
                <AvatarFallback>{card.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{card.name}</p>
                <p className="text-sm text-muted-foreground">{card.set}</p>
              </div>
              <div className="font-semibold text-[hsl(var(--chart-2))]">
                +{card.monthlyChange.toFixed(1)}%
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
