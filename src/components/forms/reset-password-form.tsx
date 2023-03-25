import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IResetPasswordData, IResetPasswordForm } from '../../interfases';
import { resetPasswordActions } from '../../redux/slices/reset-password-slice';
import { useAppDispatch } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { PasswordInput } from '../../ui/inputs/password-input/password-input';

import { formValidationErrors } from './form-validation';
import { resetPasswordSchema } from './form-validation-scheme';

export const ResetPasswordForm = ({ code }: IResetPasswordForm) => {
  const dispatch = useAppDispatch();
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const { handleSubmit, control, trigger, formState } = useForm<IResetPasswordData>({
    mode: 'all',
    resolver: yupResolver(resetPasswordSchema),
    criteriaMode: 'all',
  });

  const onSubmit = (data: IResetPasswordData) => {
    dispatch(resetPasswordActions.startFetchingResetPassword({ resetRequest: { ...data, code } }));
  };

  return (
    <form data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='password'
        defaultValue=''
        control={control}
        render={({ field, fieldState }) => (
          <PasswordInput
            {...field}
            triggerValidation={() => trigger('password')}
            fieldState={fieldState}
            inputid='password'
            placeholder='Новый пароль'
            errorMessage={formValidationErrors.password}
          />
        )}
      />

      <Controller
        name='passwordConfirmation'
        defaultValue=''
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <PasswordInput
            {...field}
            onFocus={() => {
              setIsPasswordFocus(true);
            }}
            onBlur={() => {
              setIsPasswordFocus(false);
              field.onBlur();
            }}
            triggerValidation={() => trigger('passwordConfirmation')}
            showValidCheck={false}
            fieldState={fieldState}
            inputid='passwordConfirmation'
            placeholder='Повторите пароль'
          />
        )}
      />

      <FormButton
        disabled={formState.errors.passwordConfirmation?.type === 'oneOf' && !isPasswordFocus}
        value='сохранить изменения'
      />
    </form>
  );
};
