import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ActionStatus, ResetPasswordType } from '../../interfases';
import { resetPasswordSelector } from '../../redux/selectors';
import { resetPasswordActions } from '../../redux/slices/reset-password-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { routeNames } from '../../routing/routs';
import { FormStatusModal } from '../forms/form-status-modal';
import { ResetPasswordForm } from '../forms/reset-password-form';

import styles from './reset-password.module.css';

export const ResetPassword = ({ code }: ResetPasswordType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status, resetData } = useAppSelector(resetPasswordSelector);

  const redirectToLogin = useCallback(() => {
    navigate(routeNames.AUTH);
    dispatch(resetPasswordActions.resetData());
  }, [navigate, dispatch]);

  const tryAgain = useCallback(() => {
    if (resetData && code) {
      dispatch(resetPasswordActions.startFetchingResetPassword({ resetRequest: { ...resetData, code } }));
    }
  }, [resetData, code, dispatch]);

  if (status === ActionStatus.success) {
    return (
      <FormStatusModal
        title='Новые данные сохранены'
        message='Зайдите в личный кабинет, используя свои логин и новый пароль'
        buttonLabel='вход'
        handleButtonClick={redirectToLogin}
      />
    );
  }

  if (status === ActionStatus.error) {
    return (
      <FormStatusModal
        title='Данные не сохранились'
        message='Что-то пошло не так. Попробуйте ещё раз'
        buttonLabel='повторить'
        handleButtonClick={tryAgain}
      />
    );
  }

  return (
    <div className={styles.root}>
      <h3>Восстановление пароля</h3>
      <ResetPasswordForm code={code} />

      <div className={styles.infoWrapper}>
        <span>После сохранения войдите в библиотеку, используя новый пароль</span>
      </div>
    </div>
  );
};
