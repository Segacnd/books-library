import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginForm } from '../../interfases';
import { authSelector } from '../../redux/selectors';
import { authActions } from '../../redux/slices/authorization-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { PasswordInput } from '../../ui/inputs/password-input/password-input';
import { Input } from '../../ui/inputs/text-input/input';

import { loginSchema } from './form-validation-scheme';

import styles from './auth.module.css';

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const { errorStatusCode } = useAppSelector(authSelector);

  const { handleSubmit, formState, control, trigger, reset } = useForm<LoginForm>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
    criteriaMode: 'all',
  });

  const onSubmit = (data: LoginForm) => {
    dispatch(authActions.startFetchingAuth({ authDetails: data }));
    reset({
      identifier: data.identifier,
      password: data.password,
    });
  };

  return (
    <form
      data-test-id='auth-form'
      onSubmit={handleSubmit(onSubmit)}
      className={errorStatusCode === 400 ? styles.incorrectLogin : ''}
    >
      <Controller
        name='identifier'
        control={control}
        defaultValue=''
        render={({ field, fieldState }) => (
          <Input
            triggerValidation={() => trigger('identifier')}
            fieldState={fieldState}
            {...field}
            inputid='identifier'
            placeholder='Логин'
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        defaultValue=''
        render={({ field, fieldState }) => (
          <PasswordInput
            fieldState={fieldState}
            triggerValidation={() => trigger('password')}
            {...field}
            inputid='password'
            placeholder='Пароль'
            showValidCheck={false}
          />
        )}
      />

      {errorStatusCode === 400 ? (
        <div>
          <p data-test-id='hint' className={styles.errorText}>
            Неверный логин или пароль!
          </p>
          <Link className={styles.redirectLink} to='/forgot-pass'>
            Восстановить?
          </Link>
        </div>
      ) : (
        <Link className={styles.redirectToForgot} to='/forgot-pass'>
          Забыли логин или пароль?
        </Link>
      )}

      <FormButton disabled={!formState.isValid && formState.isDirty} value='вход' />
    </form>
  );
};
