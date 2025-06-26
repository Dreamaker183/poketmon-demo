"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { CardData } from "@/lib/types";

interface SparklineChartProps {
  data: CardData['trendData'];
  color: string;
}

export function SparklineChart({ data, color }: SparklineChartProps) {
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} >
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
