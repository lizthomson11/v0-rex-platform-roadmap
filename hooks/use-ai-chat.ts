'use client';

import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, Artifact } from '@/lib/ai-chat-types';
import { detectArtifacts, SUGGESTED_PROMPTS } from '@/lib/ai-artifact-registry';
import { detectWorkflow, type WorkflowScript } from '@/lib/ai-workflow-scripts';

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
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowScript | null>(null);
  const [currentNodeKey, setCurrentNodeKey] = useState<string | null>(null);

  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const advanceWorkflowRef = useRef<((w: WorkflowScript, k: string) => void) | null>(null);

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

  // ---- Workflow state machine ----

  const advanceWorkflow = useCallback(
    (workflow: WorkflowScript, nodeKey: string) => {
      const node = workflow.nodes[nodeKey];
      if (!node) return;

      setCurrentNodeKey(nodeKey);
      setIsStreaming(true);

      const assistantId = crypto.randomUUID();
      const placeholderMessage: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      };

      setMessages((prev) => [...prev, placeholderMessage]);

      simulateStreaming(assistantId, node.step.assistantMessage).then(async () => {
        const updates: Partial<ChatMessage> = {
          content: node.step.assistantMessage,
          isStreaming: false,
        };

        // Build artifacts list (workflow step data + explicit artifacts)
        const stepArtifacts: Artifact[] = [];

        if (node.step.workflowStepData) {
          stepArtifacts.push({
            type: 'workflow-steps',
            title: node.step.workflowStepData.label,
            steps: [
              {
                label: node.step.workflowStepData.label,
                description: node.step.workflowStepData.description,
                tool: node.step.workflowStepData.tool,
                status: 'completed' as const,
                result: node.step.workflowStepData.result,
                duration: node.step.workflowStepData.duration,
              },
            ],
          });
        }

        if (node.step.artifacts && node.step.artifacts.length > 0) {
          stepArtifacts.push(...node.step.artifacts);
        }

        if (stepArtifacts.length > 0) {
          await new Promise((r) => setTimeout(r, ARTIFACT_DELAY_MS));
          updates.artifacts = stepArtifacts;
          updates.artifactsVisible = true;
        }

        // Add quick replies if present
        if (node.step.quickReplies && node.step.quickReplies.length > 0) {
          updates.quickReplies = node.step.quickReplies;
          updates.quickRepliesVisible = true;
        }

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantId ? { ...msg, ...updates } : msg)),
        );

        setIsStreaming(false);

        // Handle auto-advance
        if (node.step.autoAdvance && node.autoNext) {
          const delay = node.step.autoAdvanceDelay ?? 1200;
          setTimeout(() => {
            advanceWorkflowRef.current?.(workflow, node.autoNext!);
          }, delay);
        }

        // If no quick replies AND no auto-advance, workflow is complete
        if (!node.step.quickReplies && !node.step.autoAdvance) {
          setActiveWorkflow(null);
          setCurrentNodeKey(null);
        }
      });
    },
    [simulateStreaming],
  );

  // Keep ref in sync for recursive auto-advance calls
  advanceWorkflowRef.current = advanceWorkflow;

  // ---- Send message (workflow-aware) ----

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

      // --- WORKFLOW HANDLING ---

      // Check if we're currently IN a workflow and this message is a quick-reply choice
      if (activeWorkflow && currentNodeKey) {
        const currentNode = activeWorkflow.nodes[currentNodeKey];
        if (currentNode?.next) {
          const matchedReplyId = currentNode.step.quickReplies?.find(
            (qr) => qr.label === trimmed || qr.id === trimmed,
          )?.id;

          const nextKey = matchedReplyId ? currentNode.next[matchedReplyId] : null;

          if (nextKey && activeWorkflow.nodes[nextKey]) {
            // Disable quick replies on previous assistant messages
            setMessages((prev) =>
              prev.map((msg) =>
                msg.quickReplies
                  ? { ...msg, quickReplies: undefined, quickRepliesVisible: false }
                  : msg,
              ),
            );

            // Add user message
            setMessages((prev) => [...prev, userMessage]);

            // Advance the workflow
            advanceWorkflow(activeWorkflow, nextKey);
            return;
          }
        }
      }

      // Check if this message STARTS a new workflow
      const workflow = detectWorkflow(trimmed);
      if (workflow) {
        setMessages((prev) => [...prev, userMessage]);
        setActiveWorkflow(workflow);
        advanceWorkflow(workflow, workflow.entryNode);
        return;
      }

      // --- NORMAL API CHAT (existing behavior) ---

      const assistantId = crypto.randomUUID();
      const placeholderMessage: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, placeholderMessage]);
      setIsStreaming(true);

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
        const responseContent: string =
          data.message?.content ?? "Sorry, I didn't get a response. Please try again.";

        await simulateStreaming(assistantId, responseContent);

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
    [isStreaming, messages, simulateStreaming, stopStream, activeWorkflow, currentNodeKey, advanceWorkflow],
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
    setActiveWorkflow(null);
    setCurrentNodeKey(null);
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
