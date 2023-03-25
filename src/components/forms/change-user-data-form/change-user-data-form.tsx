import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ChangeDataForm, CurrentUser } from '../../../interfases';
import { changeUserDetailsActions } from '../../../redux/slices/change-user-detail-slice';
import { useAppDispatch } from '../../../redux/store';
import { PasswordInput } from '../../../ui/inputs/password-input/password-input';
import { PhoneInput } from '../../../ui/inputs/phone-input/phone-input';
import { Input } from '../../../ui/inputs/text-input/input';
import { formValidationErrors } from '../form-validation';
import { editUserDetails } from '../form-validation-scheme';

import styles from './change-user-data-form.module.css';

export interface IChangeUserDataFormProps {
  user: CurrentUser;
}

export const ChangeUserDataForm = ({ user }: IChangeUserDataFormProps) => {
  const [disabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, trigger, clearErrors } = useForm<ChangeDataForm>({
    mode: 'all',
    resolver: yupResolver(editUserDetails),
    criteriaMode: 'all',
  });

  const handleEditClick = () => {
    setDisabled((prev) => !prev);
    clearErrors();
  };

  const onSubmit = (data: ChangeDataForm) => {
    dispatch(changeUserDetailsActions.startUpdatingUserDetails({ userDetails: data, userId: user.id }));
    setDisabled(true);
  };

  return (
    <form data-test-id='profile-form' onSubmit={handleSubmit(onSubmit)} className={styles.form} action=''>
      <div className={styles.inputWrapper}>
        <Controller
          name='login'
          control={control}
          defaultValue={user.username}
          render={({ field, fieldState }) => (
            <Input
              triggerValidation={() => trigger('login')}
              fieldState={fieldState}
              disabled={disabled}
              {...field}
              inputid='login'
              placeholder='Логин'
              errorMessage={formValidationErrors.username}
            />
          )}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Controller
          name='password'
          defaultValue=''
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              fieldState={fieldState}
              disabled={disabled}
              triggerValidation={() => trigger('password')}
              inputid='password'
              placeholder='Пароль'
              errorMessage={formValidationErrors.password}
              showValidCheck={false}
            />
          )}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Controller
          name='firstName'
          control={control}
          defaultValue={user.firstName}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              disabled={disabled}
              triggerValidation={() => trigger('firstName')}
              fieldState={fieldState}
              inputid='firstName'
              placeholder='Имя'
            />
          )}
        />
      </div>

      <div className={styles.inputWrapper}>
        <Controller
          name='lastName'
          control={control}
          defaultValue={user.lastName}
          render={({ field, fieldState }) => (
            <Input
              fieldState={fieldState}
              {...field}
              disabled={disabled}
              triggerValidation={() => trigger('lastName')}
              inputid='lastName'
              placeholder='Фамилия'
            />
          )}
        />
      </div>

      <div className={styles.inputWrapper}>
        <Controller
          control={control}
          name='phone'
          defaultValue={user.phone}
          render={({ field, fieldState }) => (
            <PhoneInput
              inputid='phone'
              disabled={disabled}
              triggerValidation={() => trigger('phone')}
              fieldState={fieldState}
              placeholder='Введите телефон'
              {...field}
              errorMessage={formValidationErrors.phone}
            />
          )}
        />
      </div>

      <div className={styles.inputWrapper}>
        <Controller
          name='email'
          control={control}
          defaultValue={user.email}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              disabled={disabled}
              triggerValidation={() => trigger('email')}
              placeholder='E-mail'
              inputid='email'
              fieldState={fieldState}
            />
          )}
        />
      </div>

      <button data-test-id='edit-button' type='button' className={styles.editButton} onClick={handleEditClick}>
        Редактировать
      </button>
      <button data-test-id='save-button' type='submit' className={styles.submitButton} disabled={disabled}>
        сохранить изменения
      </button>
    </form>
  );
};
