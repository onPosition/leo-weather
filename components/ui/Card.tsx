"use client";

import cn from "@/utils/cn";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?:
    | "default"
    | "alert"
    | "weatherFeature"
    | "background"
    | "hourlyIcon";
}

export default function Card({
  children,
  className,
  variant = "default",
  ...props
}: CardProps) {
  const baseStyles = " transition-colors duration-200";

  const variants: Record<string, string> = {
    default: "rounded-4xl",
    alert:
      "rounded-2xl px-4 py-2 bg-card-transparent m-auto w-fit text-sm text-[#C4F67C] mb-2",
    weatherFeature: "bg-card-transparent flex  gap-2 text-xs p-2 rounded-2xl",
    hourlyIcon:
      "flex items-center justify-center bg-card-transparent flex p-2 rounded-xl ",
    background: "rounded-4xl text-white p-4",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
