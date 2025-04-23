"use client"

import { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="w-full relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className="absolute text-center w-full top-full left-1/2 -translate-x-1/2 mt-2 text-sm bg-principal/80 text-white p-2 rounded z-10"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
