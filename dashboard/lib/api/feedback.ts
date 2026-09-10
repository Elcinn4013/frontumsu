import { apiFetch } from "./client";
import { topics } from "./mock-data";
import type { TopicCluster } from "@/lib/types";

export async function getTopics(): Promise<{ topics: TopicCluster[]; sample: boolean }> {
  try { return { topics: await apiFetch<TopicCluster[]>("/api/feedback/topics"), sample: false }; }
  catch { return { topics, sample: true }; }
}
