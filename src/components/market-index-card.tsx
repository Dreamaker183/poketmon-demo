"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";
import type { MarketData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MarketIndexCardProps {
  data: MarketData;
}

const PerformanceIndicator = ({ value }: { value: number }) => {
  const isPositive = value >= 0;
  return (
    <span
      className={cn(
        "flex items-center gap-1 font-semibold",
        isPositive ? "text-[hsl(var(--chart-2))]" : "text-destructive"
      )}
    >
      {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
      {isPositive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
};

export function MarketIndexCard({ data }: MarketIndexCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Pokemon TCG Market Index</CardTitle>
          <PerformanceIndicator value={data.performance} />
        </div>
        <CardDescription>Overall Performance (Last 30 Days)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold font-headline">
          {data.indexValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="h-[120px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trend} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <defs>
                 <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" hideLabel />}
              />
              <Line
                dataKey="value"
                type="monotone"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {data.regional.map((region) => (
                <div key={region.name} className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{region.name}</span>
                        <PerformanceIndicator value={region.performance} />
                    </div>
                    <span className="font-semibold">{region.index.toFixed(2)}</span>
                </div>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">Timeline: Jan '24 to Jan '25</div>
      </CardFooter>
    </Card>
  );
}
