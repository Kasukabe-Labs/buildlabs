"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CircularProgressProps = {
  value: number; // 0 - 100
  size?: number; // in pixels
  strokeWidth?: number;
  className?: string;
};

export function Progress({
  value,
  size = 64,
  strokeWidth = 8,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className={cn("text-secondary", className)}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-primary/20"
        fill="transparent"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-primary transition-all duration-300"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}
