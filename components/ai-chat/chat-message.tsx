'use client';

import Image from 'next/image';
import type { ChatMessage } from '@/lib/ai-chat-types';
import { InlineArtifact } from './inline-artifact';

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  if (message.role === 'user') {
    return <UserMessage content={message.content} />;
  }

  return <AssistantMessage message={message} />;
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end font-[family-name:var(--font-source-sans)]">
      <div className="bg-violet-600/80 text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  const showTypingIndicator = message.isStreaming && !message.content;
  const showCursor = message.isStreaming && !!message.content;

  return (
    <div className="flex justify-start gap-2.5 font-[family-name:var(--font-source-sans)]">
      <Image
        src="/images/hqo-profile-pic-x2.png"
        alt="Dawkins"
        width={28}
        height={28}
        className="rounded-full ring-1 ring-white/10 shrink-0 mt-0.5 size-7"
      />

      <div className="max-w-[90%]">
        {showTypingIndicator ? (
          <TypingIndicator />
        ) : (
          <>
            <div className="text-sm text-gray-200 leading-relaxed">
              <FormattedContent content={message.content} />
              {showCursor && (
                <span className="animate-pulse text-violet-400">▊</span>
              )}
            </div>

            {message.artifacts?.map((artifact, i) => (
              <InlineArtifact
                key={i}
                artifact={artifact}
                isVisible={message.artifactsVisible ?? false}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="bg-white/[0.03] rounded-2xl rounded-bl-sm px-4 py-3 inline-flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-gray-400"
          style={{
            animation: 'chat-bounce 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes chat-bounce {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Lightweight markdown-ish formatter.
 * Handles: paragraphs (\n\n), line breaks (\n), bold (**text**), and bullet lists (- / *).
 */
function FormattedContent({ content }: { content: string }) {
  const paragraphs = content.split(/\n\n+/);

  return (
    <>
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n');

        // Check if this paragraph is a list (all non-empty lines start with - or *)
        const nonEmpty = lines.filter((l) => l.trim().length > 0);
        const isList =
          nonEmpty.length > 0 &&
          nonEmpty.every((l) => /^\s*[-*]\s/.test(l));

        if (isList) {
          return (
            <ul key={pIdx} className="list-disc list-inside space-y-1 my-2">
              {nonEmpty.map((line, lIdx) => (
                <li key={lIdx}>
                  <InlineBold text={line.replace(/^\s*[-*]\s+/, '')} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="mb-2 last:mb-0">
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                {lIdx > 0 && <br />}
                <InlineBold text={line} />
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

function InlineBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
