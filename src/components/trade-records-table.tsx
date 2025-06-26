"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { TradeRecord } from "@/lib/types"

interface TradeRecordsTableProps {
  records: TradeRecord[];
}

type SortKey = 'grade' | 'price';

const getGradeValue = (grade: string) => {
    if (grade.toLowerCase() === 'ungraded') return 0;
    const match = grade.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : -1;
};

export function TradeRecordsTable({ records }: TradeRecordsTableProps) {
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...records];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (sortConfig.key === 'grade') {
            aValue = getGradeValue(a.grade);
            bValue = getGradeValue(b.grade);
        } else {
            aValue = a[sortConfig.key];
            bValue = b[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [records, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ sortKey, children }: { sortKey: SortKey, children: React.ReactNode }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => requestSort(sortKey)} className="-ml-4">
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <Card>
        <CardHeader>
            <CardTitle>Trade Records</CardTitle>
        </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">TITLE</TableHead>
              <TableHead>RARITY</TableHead>
              <SortableHeader sortKey="grade">GRADE</SortableHeader>
              <SortableHeader sortKey="price">PRICE</SortableHeader>
              <TableHead>DATE</TableHead>
              <TableHead className="pr-6">PLATFORM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium pl-6">{record.title}</TableCell>
                <TableCell>{record.rarity}</TableCell>
                <TableCell>{record.grade}</TableCell>
                <TableCell className="font-medium">${record.price.toFixed(2)}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell className="pr-6">{record.platform}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center pt-6">
        <Button>查看更多市场数据</Button>
      </CardFooter>
    </Card>
  )
}
