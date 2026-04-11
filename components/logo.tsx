"use client";

import { Globe } from "lucide-react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

export function Logo({ className = "", iconSize = 32, textSize = "text-2xl" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe 
        className="text-accent-orange" 
        size={iconSize}
        strokeWidth={2.5} 
      />
      <span className={`text-primary-navy font-extrabold ${textSize} tracking-tight`}>
        WUUS<span className="text-secondary-blue">.</span>
      </span>
    </div>
  );
}
