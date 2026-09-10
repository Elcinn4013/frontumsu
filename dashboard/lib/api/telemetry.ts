import { apiFetch } from "./client";
import { buildMetrics, telemetryEvents, trend } from "./mock-data";
import type { BuildMetric, TelemetryEvent, TrendPoint } from "@/lib/types";

export async function getOverviewTrend(): Promise<{ points: TrendPoint[]; sample: boolean }> {
  try { return { points: await apiFetch<TrendPoint[]>("/api/telemetry/trend"), sample: false }; }
  catch { return { points: trend, sample: true }; }
}

export async function getTelemetry(): Promise<{ events: TelemetryEvent[]; sample: boolean }> {
  try { return { events: await apiFetch<TelemetryEvent[]>("/api/telemetry/metrics"), sample: false }; }
  catch { return { events: telemetryEvents, sample: true }; }
}

export async function compareBuilds(a: string, b: string): Promise<{ metrics: BuildMetric[]; sample: boolean }> {
  try { return { metrics: await apiFetch<BuildMetric[]>(`/api/telemetry/compare?buildA=${a}&buildB=${b}`), sample: false }; }
  catch { return { metrics: buildMetrics, sample: true }; }
}
