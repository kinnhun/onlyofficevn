"use client";

import React, { useState } from "react";
import { useAiChat } from "../hooks/useAiChat";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { QuickSuggestions } from "./QuickSuggestions";
import { ChatInput } from "./ChatInput";
import { HandoffModal } from "./HandoffModal";

export function AiAssistantContainer() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    cancelMessage,
    resetChat,
    setFeedback,
  } = useAiChat();

  const [isHandoffOpen, setIsHandoffOpen] = useState(false);

  return (
    <div className="flex flex-col h-[750px] max-h-[85vh] w-full rounded-2xl border border-white/70 bg-white/75 backdrop-blur-2xl shadow-[0_16px_50px_rgba(61,41,0,0.08)] overflow-hidden">
      <ChatHeader
        messageCount={messages.length}
        onReset={resetChat}
        onOpenHandoff={() => setIsHandoffOpen(true)}
      />

      {error && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-200 text-red-700 text-xs text-center font-medium">
          {error}
        </div>
      )}

      <MessageList
        messages={messages}
        isLoading={isLoading}
        onSelectAction={(actionText) => sendMessage(actionText)}
        onFeedback={setFeedback}
      />

      <QuickSuggestions
        disabled={isLoading}
        onSelect={(query) => sendMessage(query)}
      />

      <ChatInput
        isLoading={isLoading}
        onSend={sendMessage}
        onCancel={cancelMessage}
      />

      <HandoffModal
        isOpen={isHandoffOpen}
        onClose={() => setIsHandoffOpen(false)}
      />
    </div>
  );
}
