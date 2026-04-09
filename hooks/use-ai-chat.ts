'use client';

import { useState, useCallback, useRef } from 'react';
import type { ChatMessage } from '@/lib/ai-chat-types';
import { detectArtifacts, SUGGESTED_PROMPTS } from '@/lib/ai-artifact-registry';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Dawkins — HqO's building intelligence assistant. I can help you explore tenant engagement data, operational metrics, access control status, and upcoming platform features. Try one of the suggestions below, or ask me anything about your buildings.",
};

const CHARS_PER_TICK = 4;
const TICK_INTERVAL_MS = 10;
const ARTIFACT_DELAY_MS = 300;

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopStream = useCallback(() => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
  }, []);

  const simulateStreaming = useCallback(
    (assistantId: string, fullText: string) => {
      return new Promise<void>((resolve) => {
        let charIndex = 0;

        streamIntervalRef.current = setInterval(() => {
          charIndex = Math.min(charIndex + CHARS_PER_TICK, fullText.length);
          const revealed = fullText.slice(0, charIndex);

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: revealed } : msg,
            ),
          );

          if (charIndex >= fullText.length) {
            stopStream();
            resolve();
          }
        }, TICK_INTERVAL_MS);
      });
    },
    [stopStream],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      stopStream();

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
      };

      const assistantId = crypto.randomUUID();
      const placeholderMessage: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, placeholderMessage]);
      setIsStreaming(true);

      // Build the conversation history for the API (exclude welcome + placeholder)
      const conversationMessages = [...messages, userMessage]
        .filter((m) => m.id !== 'welcome')
        .map(({ role, content }) => ({ role, content }));

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: conversationMessages, model: 'dawkins' }),
          signal: abortControllerRef.current.signal,
        });

        const data = await response.json();
        const responseContent: string = data.message?.content ?? 'Sorry, I didn\'t get a response. Please try again.';

        // Simulate character-by-character streaming
        await simulateStreaming(assistantId, responseContent);

        // Mark streaming complete
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: responseContent, isStreaming: false }
              : msg,
          ),
        );

        // Detect and inject artifacts after a short delay
        const artifacts = detectArtifacts(responseContent);
        if (artifacts.length > 0) {
          await new Promise((r) => setTimeout(r, ARTIFACT_DELAY_MS));
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, artifacts, artifactsVisible: true }
                : msg,
            ),
          );
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // Request was cancelled — don't show an error
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: 'Request cancelled.', isStreaming: false }
                : msg,
            ),
          );
        } else {
          const errorMessage =
            'Dawkins is currently offline. The GPU instances may need to be started — please try again in a moment.';
          setError(errorMessage);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: errorMessage, isStreaming: false }
                : msg,
            ),
          );
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [isStreaming, messages, simulateStreaming, stopStream],
  );

  const clearMessages = useCallback(() => {
    stopStream();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([WELCOME_MESSAGE]);
    setIsStreaming(false);
    setError(null);
  }, [stopStream]);

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
    suggestedPrompts: SUGGESTED_PROMPTS,
  };
}
