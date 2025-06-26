
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Header } from "@/components/header";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const eras = [
  "Scarlet & Violet",
  "Sword & Shield",
  "Sun & Moon",
  "XY",
  "Black & White",
  "Call of Legends",
  "HeartGold SoulSilver",
  "Platinum",
  "Diamond & Pearl",
  "EX Ruby & Sapphire",
  "e-Card",
  "Legendary Collection",
  "Neo",
  "Gym",
  "Base",
];

const allSets = [
    { name: "Destined Rivals", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Journey Together", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Mcdonald's Dragon Discovery", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Prismatic Evolutions", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Surging Sparks", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Stellar Crown", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Trick or Trade 2024", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Shrouded Fable", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Twilight Masquerade", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Temporal Forces", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Paldean Fates", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Paradox Rift", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Pokemon Card 151", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Trick or Trade 2023", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Obsidian Flames", era: "Scarlet & Violet", image: "https://placehold.co/240x140.png" },
    { name: "Rebel Clash", era: "Sword & Shield", image: "https://placehold.co/240x140.png" },
    { name: "Darkness Ablaze", era: "Sword & Shield", image: "https://placehold.co/240x140.png" },
    { name: "Cosmic Eclipse", era: "Sun & Moon", image: "https://placehold.co/240x140.png" },
    { name: "Unified Minds", era: "Sun & Moon", image: "https://placehold.co/240x140.png" },
    { name: "Furious Fists", era: "XY", image: "https://placehold.co/240x140.png" },
    { name: "Next Destinies", era: "Black & White", image: "https://placehold.co/240x140.png" },
    { name: "Call of Legends", era: "Call of Legends", image: "https://placehold.co/240x140.png" },
    { name: "HS Unleashed", era: "HeartGold SoulSilver", image: "https://placehold.co/240x140.png" },
    { name: "HS Undaunted", era: "HeartGold SoulSilver", image: "https://placehold.co/240x140.png" },
    { name: "HS Triumphant", era: "HeartGold SoulSilver", image: "https://placehold.co/240x140.png" },
    { name: "Platinum", era: "Platinum", image: "https://placehold.co/240x140.png" },
    { name: "Rising Rivals", era: "Platinum", image: "https://placehold.co/240x140.png" },
    { name: "Supreme Victors", era: "Platinum", image: "https://placehold.co/240x140.png" },
    { name: "Arceus", era: "Platinum", image: "https://placehold.co/240x140.png" },
    { name: "Diamond & Pearl", era: "Diamond & Pearl", image: "https://placehold.co/240x140.png" },
    { name: "Mysterious Treasures", era: "Diamond & Pearl", image: "https://placehold.co/240x140.png" },
    { name: "Secret Wonders", era: "Diamond & Pearl", image: "https://placehold.co/240x140.png" },
    { name: "Great Encounters", era: "Diamond & Pearl", image: "https://placehold.co/240x140.png" },
    { name: "EX Ruby & Sapphire", era: "EX Ruby & Sapphire", image: "https://placehold.co/240x140.png" },
    { name: "EX Sandstorm", era: "EX Ruby & Sapphire", image: "https://placehold.co/240x140.png" },
    { name: "EX Dragon", era: "EX Ruby & Sapphire", image: "https://placehold.co/240x140.png" },
    { name: "EX Team Magma vs Team Aqua", era: "EX Ruby & Sapphire", image: "https://placehold.co/240x140.png" },
    { name: "Expedition Base Set", era: "e-Card", image: "https://placehold.co/240x140.png" },
    { name: "Aquapolis", era: "e-Card", image: "https://placehold.co/240x140.png" },
    { name: "Skyridge", era: "e-Card", image: "https://placehold.co/240x140.png" },
    { name: "Legendary Collection", era: "Legendary Collection", image: "https://placehold.co/240x140.png" },
    { name: "Neo Genesis", era: "Neo", image: "https://placehold.co/240x140.png" },
    { name: "Neo Discovery", era: "Neo", image: "https://placehold.co/240x140.png" },
    { name: "Neo Revelation", era: "Neo", image: "https://placehold.co/240x140.png" },
    { name: "Neo Destiny", era: "Neo", image: "https://placehold.co/240x140.png" },
    { name: "Gym Heroes", era: "Gym", image: "https://placehold.co/240x140.png" },
    { name: "Gym Challenge", era: "Gym", image: "https://placehold.co/240x140.png" },
    { name: "Base Set", era: "Base", image: "https://placehold.co/240x140.png" },
    { name: "Jungle", era: "Base", image: "https://placehold.co/240x140.png" },
    { name: "Fossil", era: "Base", image: "https://placehold.co/240x140.png" },
    { name: "Base Set 2", era: "Base", image: "https://placehold.co/240x140.png" },
];

export default function SetsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeEra, setActiveEra] = React.useState(eras[0]);
  const sectionRefs = React.useRef<Record<string, HTMLElement | null>>({});

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveEra(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-30% 0px -70% 0px",
      }
    );

    const refs = sectionRefs.current;
    Object.values(refs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(refs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleSidebarClick = (e: React.MouseEvent<HTMLAnchorElement>, era: string) => {
    e.preventDefault();
    const section = sectionRefs.current[era];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveEra(era);
    }
  };

  const filteredSets = allSets.filter((set) =>
    set.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const setsByEra = eras
    .map((era) => ({
      era,
      sets: filteredSets.filter((set) => set.era === era),
    }))
    .filter((group) => group.sets.length > 0);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <div className="flex-1 md:grid md:grid-cols-[280px_1fr]">
        <aside className="hidden md:flex flex-col border-r bg-background">
          <div className="sticky top-16 h-[calc(100vh-4rem)] p-6">
            <h2 className="text-xl font-bold font-headline mb-4">Eras</h2>
            <nav className="flex flex-col gap-1 overflow-y-auto pr-2">
              {eras.map((era) => (
                <a
                  key={era}
                  href={`#${era}`}
                  onClick={(e) => handleSidebarClick(e, era)}
                  className={cn(
                    "p-2 rounded-md text-sm font-medium transition-colors",
                    activeEra === era
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {era}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold font-headline">Sets</h1>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="english" defaultChecked />
                <label
                  htmlFor="english"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border-b-2 border-primary pb-1"
                >
                  English
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="japanese" disabled />
                <label
                  htmlFor="japanese"
                  className="text-sm font-medium leading-none text-muted-foreground/50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Japanese
                </label>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Find a set..."
                  className="w-full md:w-64 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {setsByEra.map(({ era, sets }) => (
              <section
                key={era}
                id={era}
                ref={(el) => { sectionRefs.current[era] = el; }}
                className="scroll-mt-20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="https://placehold.co/40x40.png"
                    width={40}
                    height={40}
                    alt={`${era} logo`}
                    data-ai-hint={`${era} logo`}
                  />
                  <h2 className="text-2xl font-semibold">{era}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sets.map((set) => (
                    <Link href="#" key={set.name} className="group">
                      <div className="overflow-hidden rounded-lg shadow-md transition-transform group-hover:scale-105">
                        <Image
                          src={set.image}
                          alt={set.name}
                          width={240}
                          height={140}
                          className="w-full"
                          data-ai-hint={`${set.name} pokemon set`}
                        />
                      </div>
                      <p className="mt-2 text-center text-sm font-medium text-foreground">
                        {set.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
