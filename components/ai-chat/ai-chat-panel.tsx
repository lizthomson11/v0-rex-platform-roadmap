'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import {
  X,
  ArrowUp,
  TrendingUp,
  Calendar,
  Workflow,
  KeyRound,
  FileText,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useAiChat } from '@/hooks/use-ai-chat';
import { ChatMessageBubble } from './chat-message';

const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  Calendar,
  Workflow,
  KeyRound,
  FileText,
};

interface AiChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiChatPanel({ isOpen, onClose }: AiChatPanelProps) {
  const { messages, isStreaming, sendMessage, clearMessages, suggestedPrompts } =
    useAiChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput('');
    sendMessage(text);
  }

  function handlePromptClick(label: string) {
    if (isStreaming) return;
    sendMessage(label);
  }

  const showSuggestions = messages.length <= 1;
  const canSend = input.trim().length > 0 && !isStreaming;

  return (
    <div
      className={`
        fixed z-50 font-[family-name:var(--font-source-sans)]
        bottom-24 right-6 w-[420px] max-w-[calc(100vw-2rem)]
        h-[600px] max-h-[calc(100vh-8rem)]
        max-sm:inset-x-3 max-sm:right-auto max-sm:w-auto max-sm:bottom-20 max-sm:h-[70vh]
        rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl
        shadow-2xl shadow-black/50
        flex flex-col overflow-hidden
        transition-all duration-300 ease-out
        ${isOpen
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-[0.98] pointer-events-none'
        }
      `}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-violet-400" />
          <span className="text-sm font-semibold text-white">Dawkins</span>
          <span className="size-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[11px] text-gray-500">AI Assistant</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Scroll fade */}
      <div className="absolute top-[49px] left-0 right-0 h-6 bg-gradient-to-b from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Suggested prompts */}
      {showSuggestions && (
        <div className="px-4 pb-3">
          <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-2">
            Try asking
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => {
              const Icon = ICON_MAP[prompt.icon];
              return (
                <button
                  key={prompt.id}
                  onClick={() => handlePromptClick(prompt.label)}
                  className="group flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5 text-[11px] text-gray-400 hover:bg-white/[0.08] hover:text-gray-200 hover:border-white/[0.15] cursor-pointer transition-all duration-200"
                >
                  {Icon && <Icon className="size-3" />}
                  {prompt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 border-t border-white/10 shrink-0"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your buildings..."
            disabled={isStreaming}
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!canSend}
            className={`size-8 rounded-lg flex items-center justify-center transition-colors ${
              canSend
                ? 'bg-violet-600 hover:bg-violet-500 text-white'
                : 'bg-white/[0.04] text-gray-600 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
