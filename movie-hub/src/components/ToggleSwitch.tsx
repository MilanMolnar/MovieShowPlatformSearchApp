import React from "react";

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isChecked,
  onToggle,
  label,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {label && (
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
      )}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600">
          <div className="w-6 h-6 bg-white rounded-full shadow peer-checked:translate-x-5 peer-checked:bg-blue-500 transition-transform"></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
