"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";

function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const build = search.get("build") ?? "1.8.0";
  function update(value: string) { const params = new URLSearchParams(search.toString()); params.set("build", value); router.replace(`${pathname}?${params.toString()}`); }
  return <div className="flex max-w-full flex-wrap items-center gap-2">
    <DateRangePicker />
    <label className="relative"><span className="sr-only">Build version</span><select value={build} onChange={(event) => update(event.target.value)} className="min-h-10 appearance-none rounded-control bg-surface-raised py-2 pl-3 pr-8 text-sm font-semibold text-ink ring-1 ring-inset ring-line"><option>1.8.0</option><option>1.7.9</option><option>1.7.8</option></select><ChevronDown className="pointer-events-none absolute right-2 top-3 text-muted" size={15} /></label>
  </div>;
}

export function Topbar() {
  return <header className="sticky top-0 z-30 flex min-h-16 flex-col items-stretch justify-between gap-3 border-b border-line bg-canvas px-4 py-3 sm:flex-row sm:items-center sm:px-6 lg:px-8"><div className="shrink-0"><p className="text-xs font-bold tracking-[0.14em] text-accent">LIVE BUILD</p><p className="text-sm font-semibold text-ink">Darkfront / Production</p></div><div className="max-w-full overflow-x-auto"><Suspense fallback={<div className="h-10 w-60 rounded-control bg-surface" />}><Filters /></Suspense></div></header>;
}
