"use client";

import { useSupportChat } from "./useSupportChat";

/**
 * Compatibility wrapper around `useSupportChat` for any legacy callers.
 */
export function useAiChat() {
  const support = useSupportChat();

  return {
    messages: support.messages,
    isLoading: support.isLoading,
    error: support.error,
    sendMessage: (content: string) => {
      void support.sendTurn(content);
    },
    cancelMessage: support.cancelTurn,
    resetChat: () => {
      void support.startNewIssueOrConversation();
    },
    setFeedback: (messageId: string, rating: "helpful" | "unhelpful") => {
      void support.submitOutcomeFeedback(messageId, rating);
    },
    support,
  };
}
