'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { AiChatPanel } from './ai-chat-panel';

export function AiChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AiChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title="Chat with Dawkins"
        className={`
          fixed bottom-6 right-6 z-50
          size-14 rounded-full
          flex items-center justify-center
          transition-all duration-300
          ${isOpen
            ? 'bg-white/10 hover:bg-white/15 border border-white/20'
            : 'bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-600/25'
          }
        `}
      >
        {/* Attention pulse ring — only when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />
        )}

        <span
          className={`relative transition-transform duration-300 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        >
          {isOpen ? (
            <X className="size-6 text-white" />
          ) : (
            <MessageCircle className="size-6 text-white" />
          )}
        </span>
      </button>
    </>
  );
}
