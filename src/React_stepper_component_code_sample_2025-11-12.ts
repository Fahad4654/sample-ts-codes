import React, { useState } from 'react';

interface Step {
  id: number;
  label: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <div>
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(index)}
            disabled={index > currentStep}
            style={{ fontWeight: index === currentStep ? 'bold' : 'normal' }}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div>{steps[currentStep].content}</div>

      <div>
        <button onClick={handlePrev} disabled={currentStep === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;

// Example Usage:

interface StepContentProps {
  stepNumber: number;
}

const StepContent: React.FC<StepContentProps> = ({stepNumber}) => {
  return (
    <div>
      <h3>Step {stepNumber} Content</h3>
      <p>This is the content for step {stepNumber}.</p>
    </div>
  );
};


export const ExampleStepper = () => {
  const steps: Step[] = [
    { id: 1, label: 'Step 1', content: <StepContent stepNumber={1}/> },
    { id: 2, label: 'Step 2', content: <StepContent stepNumber={2}/> },
    { id: 3, label: 'Step 3', content: <StepContent stepNumber={3}/> },
  ];

  return (
    <Stepper steps={steps} />
  );
};