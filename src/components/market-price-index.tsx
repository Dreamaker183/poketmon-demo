import type { MarketPrices } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface MarketPriceIndexProps {
  prices: MarketPrices;
}

export function MarketPriceIndex({ prices }: MarketPriceIndexProps) {
  return (
    <Card>
        <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                 <h2 className="text-2xl font-semibold">市场价格指数</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div className="text-center">
                    <p className="text-muted-foreground">最低价</p>
                    <p className="text-3xl font-bold text-[hsl(var(--chart-2))]">${prices.lowest.toFixed(2)}</p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground">中间价</p>
                    <p className="text-3xl font-bold text-[hsl(var(--chart-1))]">${prices.median.toFixed(2)}</p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground">最高价</p>
                    <p className="text-3xl font-bold text-destructive">${prices.highest.toFixed(2)}</p>
                </div>
            </div>
            <div className="border rounded-lg h-60 flex items-center justify-center bg-secondary/30">
                <p className="text-muted-foreground">价格走势图</p>
            </div>
        </CardContent>
    </Card>
  );
}
