
"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { OhlcData } from '@/lib/types';

interface CandlestickChartProps {
  data: OhlcData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const [open, high, low, close] = data.ohlc;
    const isUp = close >= open;
    return (
      <div className="p-2 bg-card border rounded-lg shadow-sm text-card-foreground">
        <p className="font-bold mb-2">{label}</p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
            <span>Open:</span><span className="font-mono text-right">${open.toFixed(2)}</span>
            <span>High:</span><span className="font-mono text-right">${high.toFixed(2)}</span>
            <span>Low:</span><span className="font-mono text-right">${low.toFixed(2)}</span>
            <span>Close:</span><span className="font-mono text-right">${close.toFixed(2)}</span>
            <span>Change:</span><span className={`font-mono text-right ${isUp ? 'text-[hsl(var(--chart-2))]' : 'text-destructive'}`}>{(close - open).toFixed(2)} ({(((close - open) / open) * 100).toFixed(2)}%)</span>
        </div>
      </div>
    );
  }

  return null;
};

// This custom shape is responsible for drawing the candlestick
const Candle = (props: any) => {
  const { x, y, width, height, payload, background } = props;
  const [open, high, low, close] = payload.ohlc;
  const isUp = close >= open;
  
  // A candle is composed of a wick (the high-low line) and a body (the open-close rect)
  const wickColor = isUp ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))';
  const bodyColor = isUp ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))';

  const bodyHeight = Math.max(1, Math.abs(y - background.y));
  const bodyY = isUp ? y + height - bodyHeight : y;

  return (
    <g stroke={wickColor} fill={bodyColor} strokeWidth={1}>
      {/* Wick */}
      <line x1={x + width / 2} y1={background.y + background.height} x2={x + width / 2} y2={background.y} />
      {/* Body */}
      <rect x={x} y={bodyY} width={width} height={bodyHeight} />
    </g>
  );
};


export function CandlestickChart({ data }: CandlestickChartProps) {
  if (!data || data.length === 0) {
    return (
        <div className="border rounded-lg h-60 flex items-center justify-center bg-secondary/30">
            <p className="text-muted-foreground">No price data available.</p>
        </div>
    )
  }

  const domain = [
    Math.min(...data.map(d => d.ohlc[2])) * 0.98,
    Math.max(...data.map(d => d.ohlc[1])) * 1.02
  ];

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
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
          <Bar
            dataKey="ohlc"
            shape={<Candle />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
