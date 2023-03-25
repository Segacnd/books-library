import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { viewerSelector } from '../../redux/selectors';
import { authActions } from '../../redux/slices/authorization-slice';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { routeNames } from '../../routing/routs';

import styles from './accaunt-modal.module.css';

export const AccountModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { accountModal } = useAppSelector(viewerSelector);

  useEffect(() => {
    dispatch(viewTypeActions.accountModalToggle(false));
  }, [dispatch, location]);

  const closeSession = () => {
    dispatch(viewTypeActions.accountModalToggle(!accountModal));
    dispatch(authActions.logout());
    navigate(routeNames.AUTH);
  };

  return (
    <div className={accountModal ? styles.showModal : styles.hidden}>
      <Link
        data-test-id='profile-button'
        to={routeNames.PROFILE_PAGE}
        onClick={() => dispatch(viewTypeActions.accountModalToggle(!accountModal))}
      >
        Профиль
      </Link>
      <button type='button' onClick={closeSession}>
        Выход
      </button>
    </div>
  );
};
