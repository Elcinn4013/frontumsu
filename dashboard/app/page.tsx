import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TrendChart } from "@/components/charts/trend-chart";
import { IssueCard } from "@/components/issues/issue-card";
import { IssueTable } from "@/components/issues/issue-table";
import { PageHeader } from "@/components/layout/page-header";
import { ScoreRibbon } from "@/components/layout/score-ribbon";
import { getIssues } from "@/lib/api/issues";
import { getOverviewTrend } from "@/lib/api/telemetry";

export default async function OverviewPage() {
  const [{ issues, sample }, { points }] = await Promise.all([getIssues(), getOverviewTrend()]);
  return <>
    <PageHeader title="Issue control room" description="Prioritized player-impact signals across feedback and gameplay telemetry." actions={<p className="rounded-control bg-info-surface px-3 py-2 text-xs font-semibold text-info">{sample ? "Sample workspace data" : "Live workspace data"}</p>} />
    <ScoreRibbon metrics={[{ label: "Active critical issues", value: "4", delta: "+1 issue", direction: "up", tone: "critical", period: "vs prior 7 days" }, { label: "Average correlation confidence", value: "86%", delta: "+6 pts", direction: "up", tone: "accent", period: "vs prior period" }, { label: "Feedback volume", value: "38.4k", delta: "+71%", direction: "up", tone: "critical", period: "vs prior 7 days" }]} />
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(24rem,.95fr)]"><IssueCard issue={issues[0]} /><section className="min-w-0 overflow-hidden rounded-panel bg-surface p-5"><div className="flex items-start justify-between gap-4"><div><h2 className="text-base font-bold text-ink">Feedback vs telemetry signal</h2><p className="mt-1 text-sm text-muted">Mentions and death / quit rate moved together <span className="text-critical">+0.92 correlation</span></p></div><span className="font-mono text-xs text-high">BUILD CUT · SEP 07</span></div><div className="mt-4 rounded-control bg-surface-sunken p-2"><TrendChart data={points} compact /></div></section></div>
    <section className="mt-5 overflow-hidden rounded-panel bg-surface"><header className="flex items-center justify-between border-b border-line px-5 py-4"><div><h2 className="text-base font-bold text-ink">Top priority issues</h2><p className="mt-1 text-sm text-muted">Ranked by player impact, growth, and correlation confidence.</p></div><Link href="/issues" className="inline-flex items-center gap-2 text-sm font-bold text-accent-strong hover:text-accent">Open issue queue <ArrowUpRight size={16} /></Link></header><IssueTable issues={issues.slice(0, 4)} /></section>
  </>;
}
