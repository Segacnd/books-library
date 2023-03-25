import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import arrowIconRegistration from '../../assets/images/icons/arrowIconRegistration.svg';
import { FormStatusModal } from '../../components/forms/form-status-modal';
import { RegistrationForm } from '../../components/forms/registration-form';
import { ActionStatus } from '../../interfases';
import { registrationSelector } from '../../redux/selectors';
import { registrationActions } from '../../redux/slices/registration-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { routeNames } from '../../routing/routs';

import styles from './registration-page.module.css';

export const Registration = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { status, errorStatusCode, registrationData } = useAppSelector(registrationSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const redirectToLogin = useCallback(() => {
    navigate(routeNames.AUTH);
    dispatch(registrationActions.resetData());
  }, [navigate, dispatch]);

  const tryAgain = useCallback(() => {
    if (registrationData) {
      dispatch(registrationActions.startFetchingRegistration({ registrationDetails: registrationData }));
    }
  }, [registrationData, dispatch]);

  const registrationAgain = useCallback(() => {
    setCurrentStep(1);
    dispatch(registrationActions.resetData());
  }, [dispatch]);

  if (status === ActionStatus.success) {
    return (
      <FormStatusModal
        title='Регистрация успешна'
        message='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
        buttonLabel='вход'
        handleButtonClick={redirectToLogin}
      />
    );
  }

  if (status === ActionStatus.error && errorStatusCode === 400) {
    return (
      <FormStatusModal
        title='Данные не сохранились'
        message='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
        buttonLabel='назад к регистрации'
        handleButtonClick={registrationAgain}
      />
    );
  }

  if (status === ActionStatus.error) {
    return (
      <FormStatusModal
        title='Данные не сохранились'
        message='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
        buttonLabel='повторить'
        handleButtonClick={tryAgain}
      />
    );
  }

  const increaseStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.root}>
      <h3>Регистрация</h3>
      <h5>{currentStep} шаг из 3</h5>
      <RegistrationForm currentStep={currentStep} handleStep={increaseStep} />

      <div className={styles.redirectWrapper}>
        <span>Есть учётная запись?</span>
        <Link className={styles.redirectLink} to='/auth'>
          Войти
          <img src={arrowIconRegistration} alt='arrow icon' />
        </Link>
      </div>
    </div>
  );
};
