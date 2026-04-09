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
  | TableArtifact
  | WorkflowStepsArtifact
  | InvoicePreviewArtifact;

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

export interface WorkflowStepsArtifact {
  type: 'workflow-steps';
  title: string;
  steps: {
    label: string;
    description: string;
    tool: string;
    status: 'completed' | 'in-progress' | 'pending';
    result?: string;
    duration?: string;
  }[];
}

export interface InvoicePreviewArtifact {
  type: 'invoice-preview';
  title: string;
  invoice: {
    number: string;
    date: string;
    tenant: string;
    building: string;
    lineItems: {
      description: string;
      quantity: number;
      unitPrice: string;
      total: string;
    }[];
    subtotal: string;
    tax: string;
    total: string;
    status: string;
    postedTo?: string;
  };
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
