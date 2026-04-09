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
