import { apiFetch } from "./client";
import { issues as sampleIssues, feedback as sampleFeedback } from "./mock-data";
import type { FeedbackItem, Issue, IssueResult } from "@/lib/types";

export async function getIssues(query = ""): Promise<IssueResult> {
  try { return { issues: await apiFetch<Issue[]>(`/api/issues${query}`), sample: false }; }
  catch { return { issues: sampleIssues, sample: true }; }
}

export async function getIssue(id: string): Promise<{ issue: Issue; evidence: FeedbackItem[]; sample: boolean }> {
  try { return { ...(await apiFetch<{ issue: Issue; evidence: FeedbackItem[] }>(`/api/issues/${id}`)), sample: false }; }
  catch { return { issue: sampleIssues.find((item) => item.id === id) ?? sampleIssues[0], evidence: sampleFeedback, sample: true }; }
}
