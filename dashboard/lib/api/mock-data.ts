import type { BuildMetric, FeedbackItem, Issue, TelemetryEvent, TopicCluster, TrendPoint } from "@/lib/types";

export const issues: Issue[] = [
  { id: "iss-boss-04", title: "Boss 4 shield loop blocks progression", summary: "Failure and session quits rise together after the 1.8.0 shield timing change.", category: "GAMEPLAY_BALANCE", priority: "CRITICAL", status: "INVESTIGATING", priorityScore: 96, gameplayImpact: 38, feedbackMentions: 1842, feedbackGrowth: 71, correlationConfidence: 92, deathRateChange: 34, retryRateChange: 22, quitRateChange: 18, affectedBuild: "1.8.0", affectedSegment: "New Android players", sparkline: [12, 18, 22, 31, 48, 72, 96] },
  { id: "iss-economy-17", title: "Upgrade economy stalls at tier 7", summary: "Resource sinks outpace earn rate for non-payers after day five.", category: "ECONOMY", priority: "HIGH", status: "OPEN", priorityScore: 82, gameplayImpact: 24, feedbackMentions: 9830, feedbackGrowth: 44, correlationConfidence: 87, deathRateChange: 4, retryRateChange: -9, quitRateChange: 13, affectedBuild: "1.8.0", affectedSegment: "Day 5–8 non-payers", sparkline: [34, 39, 37, 51, 60, 68, 82] },
  { id: "iss-match-09", title: "Squad matchmaking exceeds target wait", summary: "Four-player parties in EU evening hours see a sharp queue-time regression.", category: "MATCHMAKING", priority: "HIGH", status: "VALIDATING", priorityScore: 76, gameplayImpact: 19, feedbackMentions: 6210, feedbackGrowth: 29, correlationConfidence: 81, deathRateChange: 0, retryRateChange: 11, quitRateChange: 9, affectedBuild: "1.7.9", affectedSegment: "EU squads of four", sparkline: [42, 46, 45, 58, 63, 75, 72] },
  { id: "iss-onboard-12", title: "Crafting tutorial prompt is missed", summary: "Players dismiss the prompt before the required inventory action.", category: "ONBOARDING", priority: "MEDIUM", status: "OPEN", priorityScore: 61, gameplayImpact: 12, feedbackMentions: 3140, feedbackGrowth: 18, correlationConfidence: 74, deathRateChange: 2, retryRateChange: 7, quitRateChange: 5, affectedBuild: "1.8.0", affectedSegment: "First-session console players", sparkline: [24, 26, 31, 38, 43, 47, 52] },
  { id: "iss-audio-03", title: "Dialogue mix dips during co-op combat", summary: "Voice channel is masked by effects in two arena encounters.", category: "AUDIO", priority: "LOW", status: "RESOLVED", priorityScore: 28, gameplayImpact: 5, feedbackMentions: 860, feedbackGrowth: -12, correlationConfidence: 58, deathRateChange: 0, retryRateChange: -2, quitRateChange: -1, affectedBuild: "1.7.9", affectedSegment: "Headset users in co-op", sparkline: [38, 36, 35, 32, 29, 26, 22] }
];

export const trend: TrendPoint[] = [
  { date: "Sep 04", feedback: 420, telemetry: 12, build: "1.7.9" }, { date: "Sep 05", feedback: 510, telemetry: 14, build: "1.7.9" }, { date: "Sep 06", feedback: 580, telemetry: 16, build: "1.7.9" }, { date: "Sep 07", feedback: 740, telemetry: 19, build: "1.8.0" }, { date: "Sep 08", feedback: 920, telemetry: 25, build: "1.8.0" }, { date: "Sep 09", feedback: 1180, telemetry: 31, build: "1.8.0" }, { date: "Sep 10", feedback: 1360, telemetry: 34, build: "1.8.0" }
];

export const feedback: FeedbackItem[] = [
  { id: "f1", source: "STEAM", excerpt: "The fourth timing changed after the I updated; every shield phase resets before the opening.", sentiment: "NEGATIVE", build: "1.8.0", createdAt: "18 min ago" },
  { id: "f2", source: "DISCORD", excerpt: "Our whole group quit after nine attempts. The visual cue and the damage window do not match.", sentiment: "NEGATIVE", build: "1.8.0", createdAt: "42 min ago" },
  { id: "f3", source: "REDDIT", excerpt: "On 1.7.9 this phase felt strict but fair; 1.8.0 looks one beat shorter.", sentiment: "MIXED", build: "1.8.0", createdAt: "1 hr ago" },
  { id: "f4", source: "SUPPORT", excerpt: "Android player reports repeated freeze-frame deaths immediately after shield break.", sentiment: "NEGATIVE", build: "1.8.0", createdAt: "2 hr ago" }
];

export const topics: TopicCluster[] = [
  { id: "t1", label: "Boss shield timing", mentions: 18432, growth: 71, sentimentScore: -82, sources: ["STEAM", "DISCORD", "REDDIT"] },
  { id: "t2", label: "Tier 7 resource wall", mentions: 9830, growth: 44, sentimentScore: -64, sources: ["STEAM", "SUPPORT"] },
  { id: "t3", label: "Squad queue latency", mentions: 6210, growth: 29, sentimentScore: -48, sources: ["DISCORD", "REDDIT"] },
  { id: "t4", label: "Crafting tutorial", mentions: 3140, growth: 18, sentimentScore: -31, sources: ["SUPPORT", "STEAM"] },
  { id: "t5", label: "Photo mode controls", mentions: 2270, growth: 12, sentimentScore: 46, sources: ["REDDIT", "DISCORD"] }
];

export const telemetryEvents: TelemetryEvent[] = [
  { event: "boss_failed", current: 34.2, change: 34, unit: "%", points: trend },
  { event: "session_quit", current: 18.4, change: 18, unit: "%", points: trend.map((p) => ({ ...p, telemetry: Math.max(4, p.telemetry - 8) })) },
  { event: "boss_retry", current: 42.8, change: 22, unit: "%", points: trend.map((p) => ({ ...p, telemetry: p.telemetry + 9 })) }
];

export const buildMetrics: BuildMetric[] = [
  { metric: "Failure rate", buildA: 19.4, buildB: 34.2, unit: "%", delta: 76, favorable: "down" },
  { metric: "Quit rate", buildA: 10.8, buildB: 18.4, unit: "%", delta: 70, favorable: "down" },
  { metric: "Completion rate", buildA: 68.7, buildB: 51.3, unit: "%", delta: -25, favorable: "up" },
  { metric: "Median retries", buildA: 2.8, buildB: 4.6, unit: "×", delta: 64, favorable: "down" }
];
