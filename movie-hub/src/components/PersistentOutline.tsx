import React from "react";

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface PersistentOutlineProps {
  position: Position;
  scaleFactor: number;
}

export const PersistentOutline: React.FC<PersistentOutlineProps> = ({
  position,
  scaleFactor,
}) => {
  // Calculate adjusted top and left to keep the element centered
  const adjustedTop = position.top - (position.height * (scaleFactor - 1)) / 2;
  const adjustedLeft = position.left - (position.width * (scaleFactor - 1)) / 2;

  return (
    <div
      className="
        absolute transition-all duration-300 ease-in-out pointer-events-none
        border-[15px] border-gray-400 bg-gray-400
        dark:border-gray-700 dark:bg-gray-700
        rounded-[0.675rem]
        z-[-10]"
      style={{
        top: `${adjustedTop}px`,
        left: `${adjustedLeft}px`,
        width: `${position.width * scaleFactor}px`,
        height: `${position.height * scaleFactor}px`,
      }}
    />
  );
};
