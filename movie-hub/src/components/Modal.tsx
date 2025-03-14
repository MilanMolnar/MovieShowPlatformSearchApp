import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Keep the modal mounted until the exit animation completes
  const [shouldRender, setShouldRender] = useState(isOpen);
  // Internal state to trigger the transition on mount
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Delay to allow mounting before starting the transition
      setTimeout(() => {
        setAnimateIn(true);
      }, 10);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        animateIn ? "opacity-100" : "opacity-0"
      } bg-black bg-opacity-50`}
      onClick={onClose}>
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-xl w-full transform transition-all duration-300 ease-in-out ${
          animateIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
