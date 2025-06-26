import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function CardSearch() {
  return (
    <Card>
        <CardContent className="p-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search for specific cards (e.g., Charizard, Pikachu, Base Set...)"
                className="w-full pl-10 py-6 text-base"
                />
            </div>
        </CardContent>
    </Card>
  );
}
