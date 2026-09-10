"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, GitCompareArrows, LayoutDashboard, MessageSquareText, RadioTower, ShieldAlert } from "lucide-react";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/issues", label: "Issues", icon: ShieldAlert },
  { href: "/feedback", label: "Feedback", icon: MessageSquareText },
  { href: "/telemetry", label: "Telemetry", icon: Activity },
  { href: "/compare", label: "Compare builds", icon: GitCompareArrows },
];

export function Sidebar() {
  const pathname = usePathname();
  return <aside className="flex min-w-0 max-w-full flex-col overflow-hidden border-b border-line bg-sidebar lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
    <div className="flex h-16 items-center gap-3 px-4 lg:h-20 lg:px-5">
      <span className="grid size-9 place-items-center rounded-control bg-accent text-canvas"><RadioTower size={19} strokeWidth={2.4} /></span>
      <div><div className="text-sm font-bold text-ink">Player Issue</div><div className="text-xs text-muted">Intelligence</div></div>
    </div>
    <nav className="flex max-w-full gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:px-3 lg:py-4" aria-label="Primary navigation">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return <Link key={href} href={href} className={`flex min-w-max items-center gap-3 rounded-control px-3 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-surface-raised text-ink" : "text-muted hover:bg-surface hover:text-ink"}`}><Icon size={17} aria-hidden="true" />{label}</Link>;
      })}
    </nav>
    <div className="mx-5 mt-auto hidden border-t border-line py-5 lg:block"><p className="text-xs font-semibold text-muted">Sample workspace</p><p className="mt-1 text-xs text-faint">Darkfront · Production</p></div>
  </aside>;
}
