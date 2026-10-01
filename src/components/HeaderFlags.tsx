"use client";

import React from "react";

export function FlagVi({ width = 20, height = 14 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 20"
      style={{ borderRadius: "2px", boxShadow: "0 0 1px rgba(0,0,0,0.3)", flexShrink: 0, display: "inline-block" }}
      aria-hidden="true"
    >
      <rect width="30" height="20" fill="#DA251D" />
      <polygon
        points="15.00,4.00 16.35,8.15 20.71,8.15 17.18,10.71 18.53,14.85 15.00,12.29 11.47,14.85 12.82,10.71 9.29,8.15 13.65,8.15"
        fill="#FFFF00"
      />
    </svg>
  );
}

export function FlagEn({ width = 20, height = 14 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 30"
      style={{ borderRadius: "2px", boxShadow: "0 0 1px rgba(0,0,0,0.3)", flexShrink: 0, display: "inline-block" }}
      aria-hidden="true"
    >
      <clipPath id="uk-flag-clip-shared">
        <rect width="60" height="30" rx="2" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip-shared)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0L60 30M60 0L0 30" stroke="#ffffff" strokeWidth="6" />
        <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30 0v30M0 15h60" stroke="#ffffff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
