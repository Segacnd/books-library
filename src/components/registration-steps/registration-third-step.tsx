import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { registrationActions } from '../../redux/slices/registration-slice';
import { useAppDispatch } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { PhoneInput } from '../../ui/inputs/phone-input/phone-input';
import { Input } from '../../ui/inputs/text-input/input';
import { useFormData } from '../forms/context/registration-context';
import { formValidationErrors } from '../forms/form-validation';
import { registrationThirdStepSchema } from '../forms/form-validation-scheme';

export interface IFirstStep {
  phone: string;
  email: string;
}

interface FieldState {
  isDirty: boolean;
  invalid: boolean;
}

export const RegistrationThirdStep = () => {
  const { data: formData } = useFormData();
  const dispatch = useAppDispatch();

  const { handleSubmit, getFieldState, trigger, reset, control, formState } = useForm<IFirstStep>({
    mode: 'all',
    resolver: yupResolver(registrationThirdStepSchema),
    criteriaMode: 'all',
  });

  const isFieldValid = (field: FieldState) => field.isDirty && !field.invalid;

  const phoneState = getFieldState('phone', formState);
  const emailState = getFieldState('email', formState);

  const onSubmit = (data: IFirstStep) => {
    if (isFieldValid(phoneState) && isFieldValid(emailState)) {
      dispatch(registrationActions.startFetchingRegistration({ registrationDetails: { ...formData, ...data } }));
    }
    reset({
      phone: '',
      email: '',
    });
  };

  return (
    <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='phone'
        defaultValue=''
        render={({ field, fieldState }) => (
          <PhoneInput
            inputid='phone'
            triggerValidation={() => trigger('phone')}
            fieldState={fieldState}
            placeholder='Введите телефон'
            {...field}
            errorMessage={formValidationErrors.phone}
          />
        )}
      />

      <Controller
        name='email'
        control={control}
        defaultValue=''
        render={({ field, fieldState }) => (
          <Input
            {...field}
            triggerValidation={() => trigger('email')}
            placeholder='E-mail'
            inputid='email'
            fieldState={fieldState}
          />
        )}
      />

      <FormButton value='зарегистрироваться' disabled={!formState.isValid && formState.isDirty} />
    </form>
  );
};
