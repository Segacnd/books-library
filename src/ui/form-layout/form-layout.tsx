import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import arrowIconRedirect from '../../assets/images/icons/ArrowIconRestore.svg';
import { authSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import { routeNames } from '../../routing/routs';
import { LoaderComponent } from '../loader/loader';

import styles from './form-layout.module.css';

export const FormLayout = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(authSelector);
  const location = useLocation();

  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    setShowBackButton(location.pathname.includes(routeNames.FORGOT_PASSWORD));
  }, [location]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className={styles.root}>
      <LoaderComponent />
      <h1>Cleverland</h1>
      <div data-test-id='auth' className={styles.innerContentWrapper}>
        {showBackButton && (
          <div className={styles.goBack}>
            <Link to='/auth'>
              <img src={arrowIconRedirect} alt='arrow icon' /> вход в личный кабинет
            </Link>
          </div>
        )}

        <div data-test-id='auth' className={styles.innerContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
