
"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { MarketData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MarketIndexCardProps {
  data: MarketData;
  className?: string;
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

export function MarketIndexCard({ data, className }: MarketIndexCardProps) {
  const chartConfig = {
    value: {
      label: "Index",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  const domain = [
    Math.min(...data.trend.map(d => d.value)) * 0.95,
    Math.max(...data.trend.map(d => d.value)) * 1.05
  ];

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Pokemon TCG Market Index</CardTitle>
          <PerformanceIndicator value={data.performance} />
        </div>
        <CardDescription>Overall Performance (Last 30 Days)</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="text-4xl font-bold font-headline">
          {data.indexValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="mt-4 flex-grow w-full">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data.trend}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                 <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                interval="preserveStartEnd"
              />
               <YAxis 
                domain={domain}
                orientation="right"
                tickFormatter={(value) => `${typeof value === 'number' ? value.toLocaleString("en-US", { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : ''}`}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                tickLine={false} 
                axisLine={false}
                width={70}
              />
              <ChartTooltip
                cursor={{fill: 'hsla(var(--muted-foreground), 0.1)'}}
                content={
                    <ChartTooltipContent 
                        indicator="line" 
                        formatter={(value, name, item) => (
                            <>
                                <div className="font-bold">{item.payload.name}</div>
                                <div className="text-sm">
                                    <span>Index:</span>
                                    <span className="font-mono ml-2 font-medium">
                                        {typeof value === 'number' && value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </>
                        )}
                        hideLabel
                    />
                }
              />
              <Area
                dataKey="value"
                type="monotone"
                stroke="var(--color-value)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ChartContainer>
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
