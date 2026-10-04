"use client";

import React from "react";

interface PricingStickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingStickerModal({ isOpen, onClose }: PricingStickerModalProps) {
  if (!isOpen) return null;
  return null;
}
