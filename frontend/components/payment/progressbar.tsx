// components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  currentStep: number;  // Current step index (0-based)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = ["Rent details", "Billing", "Payment", "Confirm Payment"];

  return (
    <div className="w-full px-4 py-5 flex justify-center">
      <div className="relative flex items-center justify-between w-full max-w-4xl">
        {/* Line at the back */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 z-0">
          <div className={`h-1 bg-blue-500`} style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
        </div>

        {steps.map((step, index) => (
          <div key={index} className="relative z-10 text-center flex flex-col items-center mt-6">
            {/* Step circle */}
            <div className={`w-8 h-8 bg-white border-2 rounded-full flex items-center justify-center ${index <= currentStep ? 'border-blue-500' : 'border-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            </div>
            
            {/* Label */}
            <div className="text-sm font-medium text-gray-700 mt-2">
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
