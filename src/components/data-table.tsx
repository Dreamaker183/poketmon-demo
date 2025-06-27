
"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowUpDown, Filter } from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
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
  const [filters, setFilters] = React.useState({ rarity: "", set: "" });
  const [pendingFilters, setPendingFilters] = React.useState(filters);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const rarities = React.useMemo(() => [...new Set(data.map((card) => card.rarity))], [data]);
  const sets = React.useMemo(() => [...new Set(data.map((card) => card.set))], [data]);

  const sortedAndFilteredData = React.useMemo(() => {
    let filteredData = [...data].filter(card => {
      const rarityMatch = !filters.rarity || card.rarity === filters.rarity;
      const setMatch = !filters.set || card.set === filters.set;
      return rarityMatch && setMatch;
    });

    if (sortConfig !== null) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [data, filters, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleApplyFilters = () => {
    setFilters(pendingFilters);
    setIsFilterOpen(false);
  }

  const handleClearFilters = () => {
    const clearedFilters = { rarity: "", set: "" };
    setPendingFilters(clearedFilters);
    setFilters(clearedFilters);
    setIsFilterOpen(false);
  }
  
  React.useEffect(() => {
    if (!isFilterOpen) {
        setPendingFilters(filters);
    }
  }, [isFilterOpen, filters]);


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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Card Market Data</CardTitle>
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Cards</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rarity-filter" className="text-right">
                  Rarity
                </Label>
                <Select
                  value={pendingFilters.rarity}
                  onValueChange={(value) => setPendingFilters(prev => ({ ...prev, rarity: value === 'all' ? '' : value }))}
                >
                  <SelectTrigger id="rarity-filter" className="col-span-3">
                    <SelectValue placeholder="Select a rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rarities</SelectItem>
                    {rarities.map(rarity => (
                      <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="set-filter" className="text-right">
                  Set
                </Label>
                <Select
                  value={pendingFilters.set}
                  onValueChange={(value) => setPendingFilters(prev => ({ ...prev, set: value === 'all' ? '' : value }))}
                >
                  <SelectTrigger id="set-filter" className="col-span-3">
                    <SelectValue placeholder="Select a set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sets</SelectItem>
                    {sets.map(set => (
                      <SelectItem key={set} value={set}>{set}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
              <Button onClick={handleApplyFilters}>Apply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              {sortedAndFilteredData.map((card) => {
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
                      <SparklineChart data={card.trendData} color={isPositive ? "hsl(var(--chart-2))]" : "hsl(var(--destructive))"} />
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
