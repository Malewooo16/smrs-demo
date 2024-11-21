

"use client"

import { ReactNode } from "react";

// Modal.js

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    header : string
  }
const PreviousAdmissionsModal : React.FC<ModalProps> = ({ isOpen, onClose, children, header }) => {
  return (
    <>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-70" onClick={onClose}></div>
  
        {/* Modal content */}
        <div className="relative w-full max-w-2xl mx-auto my-6 p-4 md:p-0">
          <div className="relative flex flex-col bg-teal-600 text-white rounded-lg shadow-lg outline-none focus:outline-none transition-transform duration-300 ease-out transform scale-100">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-400 rounded-t">
              <h3 className="text-xl font-semibold text-white">{header}</h3>
              <button
                className="p-2 text-gray-400 hover:text-teal-400 transition-colors duration-200"
                onClick={onClose}
              >
                <span className="text-2xl font-bold text-white">×</span>
              </button>
            </div>
            
            {/* Body */}
            <div className="py-4 px-6 bg-teal-700 text-gray-300 overflow-y-auto max-h-[80vh]">
              {children}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  
  );
};

export default PreviousAdmissionsModal;

