import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConfidenceGauge } from "@/components/charts/confidence-gauge";
import { EvidencePanel } from "@/components/issues/evidence-panel";
import { PriorityBadge, StatusBadge } from "@/components/ui/badge";
import { getIssue } from "@/lib/api/issues";
import { getOverviewTrend } from "@/lib/api/telemetry";
import { signed } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Issue evidence" };

export default async function IssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const [{ issue, evidence, sample }, { points }] = await Promise.all([getIssue(id), getOverviewTrend()]);
  return <><Link href="/issues" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft size={16} />Back to issue rundown</Link><header className="rounded-panel bg-surface p-5 sm:p-6"><div className="flex flex-wrap items-center gap-2"><PriorityBadge priority={issue.priority} /><StatusBadge status={issue.status} /><span className="ml-auto text-xs font-semibold text-info">{sample ? "Sample workspace data" : "Live workspace data"}</span></div><div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]"><div><h1 className="max-w-4xl text-3xl font-bold tracking-tight text-ink">{issue.title}</h1><p className="mt-3 max-w-3xl text-base leading-7 text-muted">{issue.summary}</p><div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted"><span>Affected build <strong className="font-mono text-ink">{issue.affectedBuild}</strong></span><span>Segment <strong className="text-ink">{issue.affectedSegment}</strong></span><span>Gameplay impact <strong className="font-mono text-critical">{issue.gameplayImpact}% · {signed(12)}</strong></span></div></div><ConfidenceGauge value={issue.correlationConfidence} /></div></header><div className="mt-5"><EvidencePanel feedback={evidence} trend={points} /></div></>;
}
