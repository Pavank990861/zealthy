'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : isActive
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-700 text-gray-400 border border-gray-600'
                }`}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
}
