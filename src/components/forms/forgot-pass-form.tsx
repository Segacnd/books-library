import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ActionStatus, MailForm } from '../../interfases';
import { forgorPasswordSelector } from '../../redux/selectors';
import { forgotPasswordActions } from '../../redux/slices/forgot-pass-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { Input } from '../../ui/inputs/text-input/input';

import { forgotPasswordSchema } from './form-validation-scheme';

export const ForgotPassForm = () => {
  const { status } = useAppSelector(forgorPasswordSelector);
  const dispatch = useAppDispatch();
  const requestErrorMessage = status === ActionStatus.error ? 'error' : '';

  const { handleSubmit, control, formState, trigger } = useForm<MailForm>({
    mode: 'all',
    resolver: yupResolver(forgotPasswordSchema),
    criteriaMode: 'all',
  });

  const onSubmit = (data: MailForm) => {
    dispatch(forgotPasswordActions.startFetchingForgotPassword(data));
  };

  return (
    <form data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState }) => (
          <Input
            triggerValidation={() => trigger('email')}
            fieldState={fieldState}
            requestErrorMessage={requestErrorMessage}
            {...field}
            placeholder='Email'
            inputid='email'
            infoMessage='На это email будет отправлено письмо с инструкциями по восстановлению пароля'
          />
        )}
      />

      <FormButton disabled={!formState.isValid && formState.isDirty} value='восстановить' />
    </form>
  );
};
