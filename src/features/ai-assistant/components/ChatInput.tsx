"use client";

import React, { useState, useRef } from "react";
import { Button, Tooltip } from "antd";
import {
  PictureOutlined,
  SendOutlined,
  StopOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { AttachmentPreviewBar } from "./AttachmentPreviewBar";
import { ImageConsentNotice } from "./ImageConsentNotice";
import { ImageRedactionModal } from "./ImageRedactionModal";
import type { PendingClientAttachment } from "../hooks/useSupportChat";
import type { AttachmentRoleTag } from "../types/support.types";

type ChatInputProps = {
  onSend: (message: string) => Promise<boolean> | void;
  onCancel?: () => void;
  isLoading: boolean;
  onOpenHandoff?: () => void;
  pendingAttachments?: PendingClientAttachment[];
  onAddFiles?: (files: FileList | File[]) => void;
  onRemoveAttachment?: (localId: string) => void;
  onRetryAttachment?: (localId: string) => void;
  onChangeRoleTag?: (localId: string, roleTag: AttachmentRoleTag) => void;
  onReplaceEditedFile?: (localId: string, editedFile: File) => void;
  showConsentPrompt?: boolean;
  consentPolicyVersion?: string;
  onAcceptConsent?: () => void;
  onDeclineConsent?: () => void;
  visionEnabled?: boolean;
  fileInputRefExternal?: React.RefObject<HTMLInputElement | null>;
  compact?: boolean;
};

export function ChatInput({
  onSend,
  onCancel,
  isLoading,
  onOpenHandoff,
  pendingAttachments = [],
  onAddFiles,
  onRemoveAttachment,
  onRetryAttachment,
  onChangeRoleTag,
  onReplaceEditedFile,
  showConsentPrompt = false,
  consentPolicyVersion = "v1.0-2026-10-29",
  onAcceptConsent,
  onDeclineConsent,
  visionEnabled = true,
  fileInputRefExternal,
  compact = false,
}: ChatInputProps) {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [editingItem, setEditingItem] =
    useState<PendingClientAttachment | null>(null);

  const isComposingRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const internalFileRef = useRef<HTMLInputElement>(null);
  const fileInputRef = fileInputRefExternal || internalFileRef;

  const readyCount = pendingAttachments.filter(
    (p) => p.status === "ready"
  ).length;
  const busyUploading = pendingAttachments.some(
    (p) => p.status === "uploading" || p.status === "awaiting_consent"
  );
  const isOverLimit = text.length > 4000;
  const canSubmit =
    (Boolean(text.trim()) || readyCount > 0) &&
    !isOverLimit &&
    !isLoading &&
    !busyUploading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const draft = text;
    const result = await onSend(draft);
    if (result !== false) {
      setText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (isComposingRef.current) return;
      e.preventDefault();
      void handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, compact ? 96 : 132)}px`;
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (!onAddFiles) return;
    const items = e.clipboardData?.items;
    if (!items) return;
    const imageFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image/")) {
        const f = item.getAsFile();
        if (f) imageFiles.push(f);
      }
    }
    if (imageFiles.length > 0) {
      e.preventDefault();
      onAddFiles(imageFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!onAddFiles) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!onAddFiles) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        padding: compact ? "10px 14px" : "14px 18px",
        borderTop: "1px solid #f0f0f0",
        backgroundColor: isDragging ? "#fff7ed" : "#ffffff",
        flexShrink: 0,
        transition: "background-color 0.2s ease",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {showConsentPrompt && onAcceptConsent && onDeclineConsent && (
          <ImageConsentNotice
            isOpen={showConsentPrompt}
            policyVersion={consentPolicyVersion}
            onAccept={onAcceptConsent}
            onDecline={onDeclineConsent}
          />
        )}

        {pendingAttachments.length > 0 &&
          onRemoveAttachment &&
          onRetryAttachment &&
          onChangeRoleTag && (
            <AttachmentPreviewBar
              items={pendingAttachments}
              onRemove={onRemoveAttachment}
              onRetry={onRetryAttachment}
              onEditImage={(item) => setEditingItem(item)}
              onChangeRoleTag={onChangeRoleTag}
              compact={compact}
            />
          )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files && onAddFiles) {
              onAddFiles(e.target.files);
            }
            e.target.value = "";
          }}
        />

        {/* Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#ffffff",
            border: isDragging ? "2px solid #ea580c" : "1px solid #d1d5db",
            borderRadius: "20px",
            padding: "4px 8px 4px 10px",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            boxShadow: isDragging ? "0 0 0 3px rgba(234, 88, 12, 0.15)" : "none",
          }}
        >
          {onAddFiles && (
            <Tooltip
              title={
                visionEnabled
                  ? "Đính kèm ảnh màn hình (hoặc dán Ctrl+V)"
                  : "Đính kèm ảnh cho phiếu kỹ thuật viên"
              }
            >
              <Button
                type="text"
                shape="circle"
                size="small"
                disabled={isLoading || pendingAttachments.length >= 3}
                icon={<PictureOutlined style={{ fontSize: "17px", color: "#6b7280" }} />}
                onClick={() => fileInputRef.current?.click()}
                style={{ flexShrink: 0 }}
              />
            </Tooltip>
          )}

          {onOpenHandoff && !compact && (
            <Tooltip title="Chuyển sang kỹ thuật viên Mercy Tech">
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CustomerServiceOutlined style={{ fontSize: "16px", color: "#6b7280" }} />}
                onClick={onOpenHandoff}
                style={{ flexShrink: 0 }}
              />
            </Tooltip>
          )}

          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onCompositionStart={() => {
              isComposingRef.current = true;
            }}
            onCompositionEnd={() => {
              isComposingRef.current = false;
            }}
            placeholder={
              compact
                ? "Mô tả vấn đề hoặc dán ảnh (Ctrl+V)..."
                : "Mô tả vấn đề đang gặp hoặc dán ảnh chụp màn hình (Ctrl+V)..."
            }
            aria-label="Nội dung câu hỏi hỗ trợ kỹ thuật ONLYOFFICE"
            rows={1}
            disabled={isLoading}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              resize: "none",
              backgroundColor: "transparent",
              fontSize: compact ? "12.5px" : "13.5px",
              color: "#111827",
              lineHeight: "1.45",
              padding: "4px 2px",
              minHeight: "26px",
              maxHeight: "100px",
              fontFamily: "inherit",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
            {isLoading && onCancel ? (
              <Button
                size="small"
                danger
                icon={<StopOutlined />}
                onClick={onCancel}
                style={{
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "12px",
                  height: "30px",
                }}
              >
                Hủy
              </Button>
            ) : (
              <Button
                type="primary"
                shape="circle"
                size="middle"
                disabled={!canSubmit}
                icon={<SendOutlined style={{ fontSize: "13px" }} />}
                onClick={() => void handleSubmit()}
                style={{
                  background: canSubmit ? "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)" : undefined,
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                }}
              />
            )}
          </div>
        </div>

        {!compact && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "11px",
              color: "#6b7280",
              padding: "0 4px",
            }}
          >
            <span>
              <strong>Enter</strong> gửi · <strong>Shift + Enter</strong> xuống dòng · Dán ảnh <strong>Ctrl + V</strong>
            </span>
            <span style={{ fontFamily: "monospace", color: isOverLimit ? "#dc2626" : undefined, fontWeight: isOverLimit ? 700 : undefined }}>
              {text.length} / 4.000
            </span>
          </div>
        )}
      </div>

      <ImageRedactionModal
        isOpen={Boolean(editingItem)}
        file={editingItem?.file || null}
        onClose={() => setEditingItem(null)}
        onApply={(editedFile) => {
          if (editingItem && onReplaceEditedFile) {
            onReplaceEditedFile(editingItem.localId, editedFile);
          }
        }}
      />
    </div>
  );
}
