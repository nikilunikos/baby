"use client";

import { useEffect, useMemo, useState } from "react";
import { Baby, Download, Heart, Search, Sparkles, Star, Trash2, X } from "lucide-react";
import { CATALOGUE_COUNTS, NAMES, ORIGINS, POPULARITIES, type Gender, type NameEntry, type Popularity, originMatches, originSymbol } from "@/data/names";

type Filters = { gender: "all" | Gender; popularities: Popularity[]; origins: string[]; minLength: number; maxLength: number; startsWith: string; endsWith: string; minInternational: number };
type Store = { loved: string[]; maybe: string[]; rejected: string[]; seen: string[]; hiddenGems: boolean };

const STORAGE_KEY = "future-family-state-v1";
const LETTERS = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
const DEFAULT_FILTERS: Filters = { gender: "all", popularities: [], origins: [], minLength: 2, maxLength: 22, startsWith: "", endsWith: "", minInternational: 1 };
const EMPTY: Store = { loved: [], maybe: [], rejected: [], seen: [], hiddenGems: true };

function cn(...classes: Array<string | false | undefined>) { return classes.filter(Boolean).join(" "); }
function norm(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
function len(name: string) { return norm(name).replace(/[^a-z]/g, "").length; }
function add(list: string[], id: string) { return list.includes(id) ? list : [...list, id]; }
function remove(list: string[], id: string) { return list.filter((item) => item !== id); }
function clean(value: unknown) { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; }
function byId(id: string) { return NAMES.find((name) => name.id === id); }
function passes(name: NameEntry, filters: Filters) {
  const text = norm(name.name);
  const nameLength = len(name.name);
  return (filters.gender === "all" || name.gender === filters.gender) &&
    (filters.popularities.length === 0 || filters.popularities.includes(name.popularity)) &&
    (filters.origins.length === 0 || filters.origins.some((origin) => originMatches(name.origin, origin))) &&
    nameLength >= filters.minLength && nameLength <= filters.maxLength &&
    (!filters.startsWith || text.startsWith(norm(filters.startsWith))) &&
    (!filters.endsWith || text.endsWith(norm(filters.endsWith))) &&
    name.international_score >= filters.minInternational;
}
function hiddenScore(name: NameEntry) {
  const rarity = { "Very Rare": 7, Rare: 6, Uncommon: 4, Common: 1, "Very Common": -4 }[name.popularity];
  const shape = len(name.name) >= 4 && len(name.name) <= 8 ? 2 : 0;
  return rarity + shape + name.international_score + (name.hiddenGem ? 8 : 0) + (name.sourceKind === "given" ? 3 : 0);
}
function choose(pool: NameEntry[], seenIds: string[], hidden: boolean, avoid?: string) {
  if (pool.length === 0) return null;
  const seen = new Set(seenIds);
  let available = pool.filter((name) => !seen.has(name.id) && name.id !== avoid);
  if (available.length === 0) available = pool.filter((name) => name.id !== avoid);
  if (hidden) available = [...available].sort((a, b) => hiddenScore(b) - hiddenScore(a)).slice(0, Math.max(18, Math.ceil(available.length * 0.24)));
  return available[Math.floor(Math.random() * available.length)] ?? pool[0];
}
function exportRows(title: string, names: NameEntry[]) {
  return [title, ...names.map((name, index) => `${index + 1}. ${name.name} (${name.gender}) - ${name.origin} - ${name.meaning} - ${name.pronunciation} - ${name.popularity} - ${name.international_score}/10`)].join("\n");
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [store, setStore] = useState<Store>(EMPTY);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);

  const filtered = useMemo(() => NAMES.filter((name) => passes(name, filters)), [filters]);
  const current = currentId ? byId(currentId) ?? null : null;
  const loved = store.loved.map(byId).filter(Boolean) as NameEntry[];
  const maybe = store.maybe.map(byId).filter(Boolean) as NameEntry[];
  const searchResults = useMemo(() => {
    const needle = norm(query.trim());
    if (!needle) return [];
    return NAMES.filter((name) => norm([name.name, name.origin, name.meaning, name.pronunciation, name.popularity].join(" ")).includes(needle)).slice(0, 80);
  }, [query]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Store>;
        setStore({ loved: clean(parsed.loved), maybe: clean(parsed.maybe), rejected: clean(parsed.rejected), seen: clean(parsed.seen), hiddenGems: typeof parsed.hiddenGems === "boolean" ? parsed.hiddenGems : true });
      }
    } finally { setReady(true); }
  }, []);
  useEffect(() => { if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); }, [ready, store]);
  useEffect(() => {
    if (!ready) return;
    if (currentId && filtered.some((name) => name.id === currentId)) return;
    setCurrentId(choose(filtered, store.seen, store.hiddenGems)?.id ?? null);
  }, [ready, filtered, currentId, store.hiddenGems, store.seen]);

  function advance(kind: "love" | "maybe" | "skip") {
    if (!current) return;
    const availableIds = new Set(filtered.map((name) => name.id));
    let next: Store = { ...store, loved: [...store.loved], maybe: [...store.maybe], rejected: [...store.rejected], seen: add(store.seen, current.id) };
    if (kind === "love") next = { ...next, loved: add(next.loved, current.id), maybe: remove(next.maybe, current.id), rejected: remove(next.rejected, current.id) };
    if (kind === "maybe") next = { ...next, maybe: add(next.maybe, current.id), loved: remove(next.loved, current.id), rejected: remove(next.rejected, current.id) };
    if (kind === "skip") next = { ...next, rejected: add(next.rejected, current.id), loved: remove(next.loved, current.id), maybe: remove(next.maybe, current.id) };
    if (filtered.length > 0 && filtered.every((name) => next.seen.includes(name.id))) next = { ...next, seen: next.seen.filter((id) => !availableIds.has(id)) };
    setStore(next);
    setCurrentId(choose(filtered, next.seen, next.hiddenGems, current.id)?.id ?? null);
  }
  function save(id: string, bucket: "loved" | "maybe") {
    setStore((prev) => bucket === "loved" ? { ...prev, loved: add(prev.loved, id), maybe: remove(prev.maybe, id), rejected: remove(prev.rejected, id) } : { ...prev, maybe: add(prev.maybe, id), loved: remove(prev.loved, id), rejected: remove(prev.rejected, id) });
  }
  function removeSaved(id: string, bucket: "loved" | "maybe") { setStore((prev) => ({ ...prev, [bucket]: remove(prev[bucket], id) })); }
  function togglePopularity(popularity: Popularity) { setFilters((prev) => ({ ...prev, popularities: prev.popularities.includes(popularity) ? prev.popularities.filter((item) => item !== popularity) : [...prev.popularities, popularity] })); }
  function toggleOrigin(origin: string) { setFilters((prev) => ({ ...prev, origins: prev.origins.includes(origin) ? prev.origins.filter((item) => item !== origin) : [...prev.origins, origin] })); }
  function exportTxt() {
    const blob = new Blob([["Future Family", "", exportRows("Favorites", loved), "", exportRows("Maybe", maybe)].join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "future-family-names.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  const seenInFilter = store.seen.filter((id) => filtered.some((name) => name.id === id)).length;
  const progress = filtered.length ? Math.round((seenInFilter / filtered.length) * 100) : 0;
  const bigType = current && current.name.length > 18 ? "text-5xl md:text-7xl" : "text-6xl md:text-8xl";

  return <main className="min-h-screen px-4 py-5 text-ink sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <header className="flex flex-col gap-4 border-b border-cocoa/15 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4"><div className="grid h-12 w-12 place-items-center rounded-lg border border-cocoa/20 bg-porcelain shadow-soft"><Baby className="h-6 w-6 text-wine" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">Future Family</p><h1 className="font-serif text-3xl font-semibold sm:text-4xl">Prénoms rares, élégants, mémorables</h1></div></div>
        <div className="flex flex-wrap gap-2"><button onClick={() => setStore((s) => ({ ...s, hiddenGems: !s.hiddenGems }))} className={cn("inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-semibold", store.hiddenGems ? "border-wine bg-wine text-porcelain" : "border-cocoa/20 bg-porcelain text-cocoa")}><Sparkles className="h-4 w-4" />Hidden Gems</button><button onClick={exportTxt} disabled={loved.length + maybe.length === 0} className="inline-flex h-11 items-center gap-2 rounded-lg border border-cocoa/20 bg-porcelain px-4 text-sm font-semibold text-cocoa disabled:opacity-45"><Download className="h-4 w-4" />Export TXT</button></div>
      </header>
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <section className="panel-enter rounded-lg border border-cocoa/15 bg-porcelain/90 p-5 shadow-soft sm:p-7">
          <div className="mb-6 flex flex-wrap justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-cocoa"><span>{filtered.length.toLocaleString("fr-FR")} noms</span><span>{progress}% vus</span></div>
          {current ? <div key={current.id} className="name-enter flex min-h-[560px] flex-col justify-between"><div><div className="mb-8 flex flex-wrap gap-2"><Badge>{originSymbol(current.origin)}</Badge><Badge>{current.gender === "boy" ? "Boy" : "Girl"}</Badge><Badge>{current.popularity}</Badge><Badge>International {current.international_score}/10</Badge></div><h2 className={cn("break-words font-serif font-semibold leading-none", bigType)}>{current.name}</h2><div className="mt-9 grid gap-3 md:grid-cols-3"><Info label="Origin" value={current.origin} /><Info label="Meaning" value={current.meaning} /><Info label="Pronunciation" value={current.pronunciation} /></div></div><div className="mt-10 grid gap-3 sm:grid-cols-3"><Action onClick={() => advance("love")} className="border-wine bg-wine text-porcelain"><Heart className="h-5 w-5" />Love</Action><Action onClick={() => advance("maybe")} className="border-saffron bg-saffron text-porcelain"><Star className="h-5 w-5" />Maybe</Action><Action onClick={() => advance("skip")} className="border-cocoa/25 bg-ivory text-cocoa"><X className="h-5 w-5" />Skip</Action></div></div> : <div className="grid min-h-[520px] place-items-center text-center"><p className="font-serif text-4xl font-semibold">Aucun prénom</p></div>}
        </section>
        <aside className="flex flex-col gap-5">
          <Panel title="Filters"><div className="grid gap-4"><div><Label>Gender</Label><div className="grid grid-cols-3 gap-2">{(["all", "boy", "girl"] as Filters["gender"][]).map((gender) => <button key={gender} onClick={() => setFilters((f) => ({ ...f, gender }))} className={cn("h-10 rounded-lg border text-sm font-semibold", filters.gender === gender ? "border-wine bg-wine text-porcelain" : "border-cocoa/20 bg-ivory text-cocoa")}>{gender === "all" ? "All" : gender === "boy" ? "Boy" : "Girl"}</button>)}</div></div><div><Label>Popularity</Label><div className="grid grid-cols-2 gap-2">{POPULARITIES.map((popularity) => <button key={popularity} onClick={() => togglePopularity(popularity)} className={cn("h-10 rounded-lg border px-2 text-xs font-semibold", filters.popularities.includes(popularity) ? "border-moss bg-moss text-porcelain" : "border-cocoa/20 bg-ivory text-cocoa")}>{popularity}</button>)}</div></div><div className="grid grid-cols-2 gap-3"><Input label="Min length" value={filters.minLength} onChange={(value) => setFilters((f) => ({ ...f, minLength: value }))} /><Input label="Max length" value={filters.maxLength} onChange={(value) => setFilters((f) => ({ ...f, maxLength: value }))} /></div><div className="grid grid-cols-2 gap-3"><Select label="Starts" value={filters.startsWith} onChange={(value) => setFilters((f) => ({ ...f, startsWith: value }))} /><Select label="Ends" value={filters.endsWith} onChange={(value) => setFilters((f) => ({ ...f, endsWith: value }))} /></div><div><div className="mb-2 flex justify-between"><Label>International</Label><span className="text-xs font-semibold text-cocoa">{filters.minInternational}/10</span></div><input type="range" min={1} max={10} value={filters.minInternational} onChange={(event) => setFilters((f) => ({ ...f, minInternational: Number(event.target.value) }))} className="w-full accent-wine" /></div><div><Label>Origin</Label><div className="grid max-h-44 grid-cols-2 gap-2 overflow-auto">{ORIGINS.map((origin) => <button key={origin} onClick={() => toggleOrigin(origin)} className={cn("h-9 rounded-lg border px-2 text-left text-xs font-semibold", filters.origins.includes(origin) ? "border-saffron bg-saffron text-porcelain" : "border-cocoa/20 bg-ivory text-cocoa")}>{originSymbol(origin)} {origin}</button>)}</div></div><button onClick={() => setFilters(DEFAULT_FILTERS)} className="h-10 rounded-lg border border-cocoa/20 bg-ivory text-sm font-semibold text-cocoa">Clear filters</button></div></Panel>
          <Panel title="Search"><div className="relative mb-3"><Search className="absolute left-3 top-3 h-4 w-4 text-cocoa" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, meaning, origin" className="h-11 w-full rounded-lg border border-cocoa/20 bg-ivory pl-9 pr-3 text-sm" /></div><div className="max-h-72 space-y-2 overflow-auto">{searchResults.map((name) => <Row key={name.id} name={name} trailing={<div className="flex gap-1"><Tiny onClick={() => save(name.id, "loved")} active={store.loved.includes(name.id)}><Heart className="h-3.5 w-3.5" /></Tiny><Tiny onClick={() => save(name.id, "maybe")} active={store.maybe.includes(name.id)}><Star className="h-3.5 w-3.5" /></Tiny></div>} />)}</div></Panel>
          <Panel title={`Favorites ${loved.length}`}><List names={loved} empty="No favorites yet" onDelete={(id) => removeSaved(id, "loved")} /></Panel>
          <Panel title={`Maybe ${maybe.length}`}><List names={maybe} empty="No maybes yet" onDelete={(id) => removeSaved(id, "maybe")} /></Panel>
          <div className="rounded-lg border border-cocoa/15 bg-porcelain/70 p-4 text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">{CATALOGUE_COUNTS.boys.toLocaleString("fr-FR")} boys · {CATALOGUE_COUNTS.girls.toLocaleString("fr-FR")} girls · offline</div>
        </aside>
      </section>
    </div>
  </main>;
}

function Badge({ children }: { children: React.ReactNode }) { return <span className="inline-flex h-10 items-center rounded-lg border border-cocoa/15 bg-ivory px-3 text-sm font-semibold text-cocoa">{children}</span>; }
function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border border-cocoa/15 bg-ivory p-4"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">{label}</p><p className="break-words text-sm leading-6">{value}</p></div>; }
function Action({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className: string }) { return <button onClick={onClick} className={cn("inline-flex h-14 items-center justify-center gap-3 rounded-lg border px-5 text-base font-semibold transition", className)}>{children}</button>; }
function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <section className="panel-enter rounded-lg border border-cocoa/15 bg-porcelain/85 p-4 shadow-soft"><h3 className="mb-4 font-serif text-xl font-semibold">{title}</h3>{children}</section>; }
function Label({ children }: { children: React.ReactNode }) { return <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">{children}</div>; }
function Input({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <div><Label>{label}</Label><input type="number" min={2} max={22} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-10 w-full rounded-lg border border-cocoa/20 bg-ivory px-3 text-sm" /></div>; }
function Select({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <div><Label>{label}</Label><select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full rounded-lg border border-cocoa/20 bg-ivory px-3 text-sm"><option value="">Any</option>{LETTERS.map((letter) => <option key={letter} value={letter}>{letter}</option>)}</select></div>; }
function Tiny({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick: () => void }) { return <button onClick={onClick} className={cn("grid h-8 w-8 place-items-center rounded-lg border", active ? "border-wine bg-wine text-porcelain" : "border-cocoa/20 bg-ivory text-cocoa")}>{children}</button>; }
function Row({ name, trailing }: { name: NameEntry; trailing: React.ReactNode }) { return <div className="flex min-h-16 items-center justify-between gap-3 rounded-lg border border-cocoa/15 bg-ivory px-3 py-2"><div className="min-w-0"><div className="flex items-center gap-2"><span className="text-xs font-bold text-cocoa">{originSymbol(name.origin)}</span><p className="truncate font-serif text-lg font-semibold">{name.name}</p></div><p className="truncate text-xs font-medium text-cocoa">{name.origin} · {name.popularity} · {name.international_score}/10</p></div>{trailing}</div>; }
function List({ names, empty, onDelete }: { names: NameEntry[]; empty: string; onDelete: (id: string) => void }) { if (names.length === 0) return <p className="py-3 text-sm text-cocoa">{empty}</p>; return <div className="max-h-64 space-y-2 overflow-auto">{names.map((name) => <Row key={name.id} name={name} trailing={<Tiny onClick={() => onDelete(name.id)}><Trash2 className="h-3.5 w-3.5" /></Tiny>} />)}</div>; }
