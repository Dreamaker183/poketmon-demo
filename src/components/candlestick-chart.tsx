
"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { OhlcData } from '@/lib/types';

interface PriceTrendChartProps {
  data: OhlcData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="p-2 bg-card border rounded-lg shadow-sm text-card-foreground">
        <p className="font-bold mb-1">{label}</p>
        <div className="text-sm">
            <span>Price:</span><span className="font-mono ml-2">${data.value.toFixed(2)}</span>
        </div>
      </div>
    );
  }
  return null;
};

export function CandlestickChart({ data }: PriceTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="border rounded-lg h-60 flex items-center justify-center bg-secondary/30">
        <p className="text-muted-foreground">No price data available.</p>
      </div>
    )
  }

  // Use the closing price for the line chart
  const chartData = data.map(d => ({
    date: d.date,
    price: d.ohlc[3] 
  }));

  const domain = [
    Math.min(...chartData.map(d => d.price)) * 0.95,
    Math.max(...chartData.map(d => d.price)) * 1.05
  ];

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
            tickLine={false} 
            axisLine={false} 
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={domain}
            orientation="right"
            tickFormatter={(value) => `$${typeof value === 'number' ? value.toFixed(0) : ''}`}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
            tickLine={false} 
            axisLine={false}
            width={50}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{fill: 'hsla(var(--muted-foreground), 0.1)'}} 
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
