export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  artifacts?: Artifact[];
  artifactsVisible?: boolean;
  isStreaming?: boolean;
}

export type Artifact =
  | BarChartArtifact
  | LineChartArtifact
  | MetricCardsArtifact
  | TableArtifact;

export interface BarChartArtifact {
  type: 'bar-chart';
  title: string;
  data: { name: string; value: number; fill?: string }[];
}

export interface LineChartArtifact {
  type: 'line-chart';
  title: string;
  data: Record<string, string | number>[];
  lines: { key: string; color: string; label?: string }[];
}

export interface MetricCardsArtifact {
  type: 'metric-cards';
  cards: {
    label: string;
    value: string;
    delta?: string;
    deltaType?: 'positive' | 'negative' | 'neutral';
  }[];
}

export interface TableArtifact {
  type: 'table';
  title: string;
  columns: string[];
  rows: string[][];
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface AiChatConfig {
  apiUrl: string;
  model: string;
}
