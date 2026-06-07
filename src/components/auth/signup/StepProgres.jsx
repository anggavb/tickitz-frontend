import React from 'react';
import { FiCheck } from 'react-icons/fi';

function StepProgres({ step = 1 }) {
  const steps = ['Fill Form', 'Activate', 'Done'];

  return (
    <div className="flex items-start justify-between w-full">
      {steps.map((label, i) => {
        const isCompleted = i + 1 < step;
        const isCurrent = i + 1 === step;

        return (
          <div key={i} className="relative flex flex-col items-center flex-1">
            {/* Garis */}
            {i < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full px-12">
                <div className={`h-[2px] border-t border-dashed ${isCompleted ? 'border-green-500' : 'border-gray-300'}`} />
              </div>
            )}

            {/* Circle */}
            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-primary text-white' : 'bg-gray-300 text-white'
              }`}
            >
              {isCompleted ? <FiCheck size={18} /> : i + 1}
            </div>

            {/* Label */}
            <p className={`mt-3 text-sm ${isCompleted ? 'text-green-500 font-medium' : isCurrent ? 'text-primary font-medium' : 'text-gray-500'}`}>
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default StepProgres;
