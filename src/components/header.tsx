'use client'

import Link from "next/link";
import { Flame, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./theme-toggle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";

export function Header() {
  const navLinks = [
    { name: "Mainpage", href: "/" },
    { name: "Sets", href: "/sets" },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultSearchValue = searchParams.get('q') ?? '';

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
        params.set('q', searchQuery);
    } else {
        params.delete('q');
    }

    const queryString = params.toString();

    if (pathname === '/') {
      router.push(`/?${queryString}`, { scroll: false });
    } else {
      router.push(`/?${queryString}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Flame className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold font-headline text-foreground">PokeValue</span>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial" onSubmit={handleSearchSubmit}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              key={defaultSearchValue}
              name="search"
              type="search"
              placeholder="Search cards..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              defaultValue={defaultSearchValue}
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
