import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormButton } from '../../ui/form-button/form-button';
import { Input } from '../../ui/inputs/text-input/input';
import { useFormData } from '../forms/context/registration-context';
import { registrationSecondStepSchema } from '../forms/form-validation-scheme';

export interface IFirstStep {
  firstName: string;
  lastName: string;
}

interface FieldState {
  isDirty: boolean;
  invalid: boolean;
}

interface IRegistrationSecondStep {
  increaseStep: () => void;
}

export const RegistrationSecondStep = ({ increaseStep }: IRegistrationSecondStep) => {
  const { handleSubmit, getFieldState, trigger, reset, control, formState } = useForm<IFirstStep>({
    mode: 'all',
    resolver: yupResolver(registrationSecondStepSchema),
    criteriaMode: 'all',
  });

  const isFieldValid = (field: FieldState) => field.isDirty && !field.invalid;

  const firstNameState = getFieldState('firstName', formState);
  const lastNameState = getFieldState('lastName', formState);

  const { setFormValues } = useFormData();
  const onSubmit = (data: IFirstStep) => {
    if (isFieldValid(firstNameState) && isFieldValid(lastNameState)) {
      setFormValues(data);
      increaseStep();
    }
    reset({
      firstName: '',
      lastName: '',
    });
  };

  return (
    <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='firstName'
        control={control}
        defaultValue=''
        render={({ field, fieldState }) => (
          <Input
            {...field}
            triggerValidation={() => trigger('firstName')}
            fieldState={fieldState}
            inputid='firstName'
            placeholder='Имя'
          />
        )}
      />

      <Controller
        name='lastName'
        control={control}
        defaultValue=''
        render={({ field, fieldState }) => (
          <Input
            fieldState={fieldState}
            {...field}
            triggerValidation={() => trigger('lastName')}
            inputid='lastName'
            placeholder='Фамилия'
          />
        )}
      />

      <FormButton value='последний шаг' disabled={!formState.isValid && formState.isDirty} />
    </form>
  );
};
