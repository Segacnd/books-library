import { IRegForm } from '../../interfases';
import { RegistrationFirstStep } from '../registration-steps/registration-first-step';
import { RegistrationSecondStep } from '../registration-steps/registration-second-step';
import { RegistrationThirdStep } from '../registration-steps/registration-third-step';

import { RegistrationFormProvider } from './context/registration-context';

export const RegistrationForm = ({ currentStep, handleStep }: IRegForm) => {
  const steps = [
    <RegistrationFirstStep increaseStep={handleStep} />,
    <RegistrationSecondStep increaseStep={handleStep} />,
    <RegistrationThirdStep />,
  ];

  return (
    <RegistrationFormProvider>
      <div>{steps[currentStep - 1]}</div>
    </RegistrationFormProvider>
  );
};
