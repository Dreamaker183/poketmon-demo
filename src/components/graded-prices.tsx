import type { GradedPrice } from "@/lib/types";

interface GradedPricesProps {
  prices: GradedPrice[];
}

export function GradedPrices({ prices }: GradedPricesProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Graded Prices</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
        {prices.map((item) => (
          <div key={item.grade} className="p-4 border bg-card rounded-lg hover:bg-secondary transition-colors cursor-pointer shadow-sm">
            <p className="text-sm text-muted-foreground">{item.grade}</p>
            <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
