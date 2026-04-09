'use client';

import { useState, useEffect } from 'react';
import type { Artifact } from '@/lib/ai-chat-types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const AXIS_TICK_STYLE = { fill: '#9ca3af', fontSize: 11 };

const TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: '#1a1a2e',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#fff',
  },
};

interface InlineArtifactProps {
  artifact: Artifact;
  isVisible: boolean;
}

export function InlineArtifact({ artifact, isVisible }: InlineArtifactProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 my-3"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? 'translateY(0) scale(1)'
          : 'translateY(8px) scale(0.98)',
        transition: 'opacity 400ms ease-out, transform 400ms ease-out',
      }}
    >
      {artifact.type === 'bar-chart' && <BarChartArtifact artifact={artifact} />}
      {artifact.type === 'line-chart' && <LineChartArtifact artifact={artifact} />}
      {artifact.type === 'metric-cards' && <MetricCardsArtifact artifact={artifact} />}
      {artifact.type === 'table' && <TableArtifact artifact={artifact} />}
      {artifact.type === 'workflow-steps' && <WorkflowStepsArtifactView artifact={artifact} />}
      {artifact.type === 'invoice-preview' && <InvoicePreviewArtifactView artifact={artifact} />}
    </div>
  );
}

function ArtifactTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
      {children}
    </div>
  );
}

function BarChartArtifact({
  artifact,
}: {
  artifact: Extract<Artifact, { type: 'bar-chart' }>;
}) {
  return (
    <>
      <ArtifactTitle>{artifact.title}</ArtifactTitle>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={artifact.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="name"
            tick={AXIS_TICK_STYLE}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={AXIS_TICK_STYLE}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#8b5cf6">
            {artifact.data.map((entry, index) => (
              <Cell key={index} fill={entry.fill || '#8b5cf6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

function LineChartArtifact({
  artifact,
}: {
  artifact: Extract<Artifact, { type: 'line-chart' }>;
}) {
  return (
    <>
      <ArtifactTitle>{artifact.title}</ArtifactTitle>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={artifact.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey={Object.keys(artifact.data[0] ?? {})[0]}
            tick={AXIS_TICK_STYLE}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={AXIS_TICK_STYLE}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
          {artifact.lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
              dot={false}
              name={line.label || line.key}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function MetricCardsArtifact({
  artifact,
}: {
  artifact: Extract<Artifact, { type: 'metric-cards' }>;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {artifact.cards.map((card, i) => (
        <div
          key={i}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-3"
        >
          <div className="text-[11px] text-gray-500 uppercase tracking-wide">
            {card.label}
          </div>
          <div className="text-lg font-bold text-white mt-1">{card.value}</div>
          {card.delta && (
            <span
              className={`text-[11px] mt-1 inline-flex items-center gap-1 ${
                card.deltaType === 'positive'
                  ? 'text-emerald-400'
                  : card.deltaType === 'negative'
                    ? 'text-rose-400'
                    : 'text-gray-400'
              }`}
            >
              {card.deltaType === 'positive' && '↑'}
              {card.deltaType === 'negative' && '↓'}
              {card.deltaType === 'neutral' && '—'}
              {card.delta}
            </span>
          )}
          {!card.delta && card.deltaType === 'neutral' && (
            <span className="text-[11px] mt-1 inline-flex items-center gap-1 text-gray-400">
              —
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function TableArtifact({
  artifact,
}: {
  artifact: Extract<Artifact, { type: 'table' }>;
}) {
  return (
    <>
      <ArtifactTitle>{artifact.title}</ArtifactTitle>
      <div className="max-h-[300px] overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              {artifact.columns.map((col) => (
                <th
                  key={col}
                  className="text-[11px] uppercase tracking-wide text-gray-400 font-medium px-3 py-2 text-left"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {artifact.rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`border-b border-white/[0.04] ${
                  rowIdx % 2 === 1 ? 'bg-white/[0.02]' : ''
                }`}
              >
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="text-gray-300 px-3 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function WorkflowStepsArtifactView({
  artifact,
}: {
  artifact: Extract<Artifact, { type: 'workflow-steps' }>;
}) {
  const allCompleted = artifact.steps.every((s) => s.status === 'completed');

  const totalDuration = artifact.steps.reduce((sum, s) => {
    if (!s.duration) return sum;
    return sum + parseFloat(s.duration);
  }, 0);

  return (
    <>
      <ArtifactTitle>{artifact.title}</ArtifactTitle>
      <div className="relative">
        {/* Vertical connecting line */}
        <div
          className="absolute left-[9px] top-[10px] w-px"
          style={{ bottom: allCompleted ? 10 : 10 }}
        >
          {artifact.steps.map((step, i) => {
            if (i === artifact.steps.length - 1) return null;
            return (
              <div
                key={i}
                className={`w-full ${
                  step.status === 'completed'
                    ? 'bg-emerald-500/30'
                    : 'bg-white/10'
                }`}
                style={{
                  height: `${100 / (artifact.steps.length - 1)}%`,
                }}
              />
            );
          })}
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {artifact.steps.map((step, i) => (
            <div
              key={i}
              className="relative flex gap-3 animate-workflow-step"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Status icon */}
              <div className="relative z-10 shrink-0 mt-0.5">
                {step.status === 'completed' && (
                  <div className="size-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <span className="text-emerald-400 text-[10px] leading-none">✓</span>
                  </div>
                )}
                {step.status === 'in-progress' && (
                  <div className="size-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                    <span
                      className="block size-2 border border-violet-400 border-t-transparent rounded-full"
                      style={{ animation: 'spin 0.8s linear infinite' }}
                    />
                  </div>
                )}
                {step.status === 'pending' && (
                  <div className="size-5 rounded-full bg-white/5 border border-white/10" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{step.label}</span>
                  {step.duration && (
                    <span className="text-[10px] text-gray-600 ml-auto shrink-0">
                      {step.duration}
                    </span>
                  )}
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 mt-1">
                  <span className="text-[8px]">⚙</span>
                  {step.tool}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {step.description}
                </div>
                {step.result && (
                  <div className="text-[11px] text-emerald-400/80 mt-0.5">
                    → {step.result}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Completion banner */}
        {allCompleted && (
          <div
            className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 mt-3 flex items-center justify-between animate-workflow-step"
            style={{ animationDelay: `${artifact.steps.length * 150}ms` }}
          >
            <span className="text-emerald-400 text-xs">✓ Workflow completed</span>
            <span className="text-emerald-400/60 text-[10px]">
              {totalDuration.toFixed(1)}s total
            </span>
          </div>
        )}
      </div>
    </>
  );
}

function InvoicePreviewArtifactView({
  artifact,
}: {
  artifact: Extract<Artifact, { type: 'invoice-preview' }>;
}) {
  const { invoice } = artifact;
  const isPosted =
    invoice.status.toLowerCase().includes('posted') ||
    invoice.status.toLowerCase().includes('yardi');

  return (
    <>
      <ArtifactTitle>{artifact.title}</ArtifactTitle>
      <div className="bg-white/[0.02] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start px-4 py-3 border-b border-white/[0.06]">
          <div>
            <div className="text-xs font-bold tracking-widest text-gray-500">
              INVOICE
            </div>
            <div className="text-sm font-semibold text-white">{invoice.number}</div>
          </div>
          <div className="text-right flex flex-col items-end gap-1">
            <div className="text-[11px] text-gray-400">{invoice.date}</div>
            {isPosted && (
              <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full">
                {invoice.status}
              </span>
            )}
          </div>
        </div>

        {/* Tenant info */}
        <div className="px-4 py-2">
          <div className="text-sm text-white">{invoice.tenant}</div>
          <div className="text-[11px] text-gray-500">{invoice.building}</div>
        </div>

        {/* Line items */}
        <div>
          {/* Header row */}
          <div className="flex bg-white/[0.03] px-4 py-1.5">
            <span className="flex-1 text-[10px] uppercase tracking-wide text-gray-500 font-medium">
              Description
            </span>
            <span className="w-12 text-center text-[10px] uppercase tracking-wide text-gray-500 font-medium">
              Qty
            </span>
            <span className="w-24 text-right text-[10px] uppercase tracking-wide text-gray-500 font-medium">
              Unit Price
            </span>
            <span className="w-24 text-right text-[10px] uppercase tracking-wide text-gray-500 font-medium">
              Total
            </span>
          </div>
          {/* Body rows */}
          {invoice.lineItems.map((item, i) => {
            const isCredit = item.total.startsWith('-');
            return (
              <div
                key={i}
                className="flex items-center px-4 py-1.5 border-b border-white/[0.03] text-[12px]"
              >
                <span className="flex-1 text-gray-300 truncate pr-2">
                  {item.description}
                </span>
                <span className="w-12 text-center text-gray-300">
                  {item.quantity}
                </span>
                <span
                  className={`w-24 text-right ${isCredit ? 'text-emerald-400' : 'text-gray-300'}`}
                >
                  {item.unitPrice}
                </span>
                <span
                  className={`w-24 text-right ${isCredit ? 'text-emerald-400' : 'text-gray-300'}`}
                >
                  {item.total}
                </span>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="px-4 py-3 border-t border-white/[0.08] space-y-1">
          <div className="flex justify-end gap-8">
            <span className="text-[11px] text-gray-400">Subtotal</span>
            <span className="text-[11px] text-gray-300 w-24 text-right">
              {invoice.subtotal}
            </span>
          </div>
          <div className="flex justify-end gap-8">
            <span className="text-[11px] text-gray-400">Tax</span>
            <span className="text-[11px] text-gray-300 w-24 text-right">
              {invoice.tax}
            </span>
          </div>
          <div className="flex justify-end gap-8 pt-1">
            <span className="text-sm font-bold text-white">Total</span>
            <span className="text-sm font-bold text-white w-24 text-right">
              {invoice.total}
            </span>
          </div>
        </div>

        {/* Footer — posted to */}
        {invoice.postedTo && (
          <div className="px-4 py-2 border-t border-white/[0.04] bg-white/[0.01]">
            <span className="text-[10px] text-gray-500">
              ✓ {invoice.postedTo}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
