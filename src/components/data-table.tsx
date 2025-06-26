"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowUpDown } from "lucide-react"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CardData } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SparklineChart } from "./sparkline-chart"

interface CardDataTableProps {
  data: CardData[]
}

type SortKey = keyof CardData;

const getGradeBadgeClass = (grade: number) => {
  if (grade >= 10) return "bg-[hsl(var(--chart-1))] text-primary-foreground border-transparent"
  if (grade >= 9) return "bg-[hsl(var(--chart-2))] text-primary-foreground border-transparent"
  if (grade >= 8) return "bg-[hsl(var(--chart-3))] text-primary-foreground border-transparent"
  if (grade >= 7) return "bg-destructive text-destructive-foreground border-transparent"
  return "bg-secondary text-secondary-foreground"
}

export function CardDataTable({ data }: CardDataTableProps) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'price', direction: 'descending' });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ sortKey, children }: { sortKey: SortKey, children: React.ReactNode }) => (
    <TableHead>
      <Button variant="ghost" onClick={(e) => { e.stopPropagation(); requestSort(sortKey); }} className="-ml-4">
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CARD</TableHead>
                <SortableHeader sortKey="set">PACK</SortableHeader>
                <TableHead>RARITY</TableHead>
                <SortableHeader sortKey="grade">GRADE</SortableHeader>
                <SortableHeader sortKey="price">PRICE</SortableHeader>
                <TableHead>LAST TRADE</TableHead>
                <SortableHeader sortKey="monthlyChange">MONTHLY %</SortableHeader>
                <TableHead>3Y TREND</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((card) => {
                const isPositive = card.monthlyChange >= 0;
                return (
                  <TableRow key={card.id} onClick={() => router.push(`/cards/${card.id}`)} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={card.image}
                          alt={card.name}
                          width={40}
                          height={56}
                          className="rounded-sm"
                          data-ai-hint={`${card.name} pokemon`}
                        />
                        <div>
                          <p className="font-medium">{card.name}</p>
                          <p className="text-xs text-muted-foreground">{card.number}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{card.set}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{card.rarity}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getGradeBadgeClass(card.grade)}>{card.grade}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${card.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>{card.lastTrade}</TableCell>
                    <TableCell className={cn(isPositive ? "text-[hsl(var(--chart-2))]" : "text-destructive", "font-medium")}>
                      {isPositive ? '+' : ''}{card.monthlyChange.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <SparklineChart data={card.trendData} color={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
