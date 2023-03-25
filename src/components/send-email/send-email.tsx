import { Link } from 'react-router-dom';

import ArrowRegistrationIcon from '../../assets/images/icons/arrowIconRegistration.svg';
import { ActionStatus } from '../../interfases';
import { forgorPasswordSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import { ForgotPassForm } from '../forms/forgot-pass-form';
import { FormStatusModal } from '../forms/form-status-modal';

import styles from './send-email.module.css';

export const SendEmail = () => {
  const { status } = useAppSelector(forgorPasswordSelector);

  if (status === ActionStatus.success) {
    return (
      <FormStatusModal
        title='Письмо выслано'
        message='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
      />
    );
  }

  return (
    <div className={styles.root}>
      <h3>Восстановление пароля</h3>
      <ForgotPassForm />
      <div className={styles.redirectWrapper}>
        <span>Нет учётной записи?</span>
        <Link className={styles.redirectLink} to='/registration'>
          Регистрация
          <img src={ArrowRegistrationIcon} alt='arrow icon' />
        </Link>
      </div>
    </div>
  );
};
