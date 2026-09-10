import type { Metadata } from "next";
import { Suspense } from "react";
import { IssueFilters } from "@/components/issues/issue-filters";
import { IssueTable } from "@/components/issues/issue-table";
import { PageHeader } from "@/components/layout/page-header";
import { getIssues } from "@/lib/api/issues";

export const metadata: Metadata = { title: "Issues" };

export default async function IssuesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams; const { issues, sample } = await getIssues();
  const value = (key: string) => typeof params[key] === "string" ? params[key] : undefined;
  let filtered = issues.filter((issue) => (!value("category") || issue.category === value("category")) && (!value("priority") || issue.priority === value("priority")) && (!value("status") || issue.status === value("status")) && (!value("build") || issue.affectedBuild === value("build")));
  const sort = value("sort") ?? "priorityScore";
  filtered = [...filtered].sort((a, b) => sort === "feedbackGrowth" ? b.feedbackGrowth - a.feedbackGrowth : sort === "confidence" ? b.correlationConfidence - a.correlationConfidence : b.priorityScore - a.priorityScore);
  return <><PageHeader title="Issue rundown" description="Filter and rank correlated player issues for triage, validation, and release review." actions={<span className="text-xs font-semibold text-info">{sample ? "Sample workspace data" : "Live workspace data"}</span>} /><Suspense><IssueFilters /></Suspense><section className="mt-5 overflow-hidden rounded-panel bg-surface"><header className="flex items-center justify-between border-b border-line px-5 py-4"><h2 className="font-bold text-ink">{filtered.length} issues in view</h2><p className="font-mono text-xs text-muted">sorted by {sort}</p></header>{filtered.length ? <IssueTable issues={filtered} /> : <div className="p-10 text-center"><p className="font-semibold text-ink">No issues match these filters.</p><p className="mt-2 text-sm text-muted">Clear one or more filters to restore the rundown.</p></div>}</section></>;
}
