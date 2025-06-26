
import type { MarketPrices, OhlcData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandlestickChart } from "./candlestick-chart";

interface MarketPriceIndexProps {
  prices: MarketPrices;
  trendData: OhlcData[];
}

export function MarketPriceIndex({ prices, trendData }: MarketPriceIndexProps) {
  return (
    <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <CardTitle>Price Trend Chart</CardTitle>
                <div className="grid grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-0 text-right">
                    <div>
                        <p className="text-sm text-muted-foreground">Low</p>
                        <p className="text-2xl font-bold text-[hsl(var(--chart-2))]">${prices.lowest.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Median</p>
                        <p className="text-2xl font-bold text-[hsl(var(--chart-1))]">${prices.median.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">High</p>
                        <p className="text-2xl font-bold text-destructive">${prices.highest.toFixed(2)}</p>
                    </div>
                 </div>
            </div>
        </CardHeader>
        <CardContent>
          <CandlestickChart data={trendData} />
        </CardContent>
    </Card>
  );
}
