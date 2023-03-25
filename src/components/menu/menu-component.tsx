import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import ArrowIcon from '../../assets/images/icons/arrow-up-icon.svg';
import { useEffectOnce } from '../../hooks/use-effect-once-hook';
import { ActionStatus } from '../../interfases';
import { categoriesSelector, getAllBookSelector, viewerSelector } from '../../redux/selectors';
import { authActions } from '../../redux/slices/authorization-slice';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getCategoriesActions } from '../../redux/slices/get-categories-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { routeNames } from '../../routing/routs';

import styles from './menu.module.css';

export type MenuComponentProps = {
  isBurgerMenu: boolean;
  testIds: string[];
};

export const MenuComponent = ({ isBurgerMenu = false, testIds }: MenuComponentProps) => {
  const { books, status } = useAppSelector(getAllBookSelector);
  const { menuState, burgerState } = useAppSelector(viewerSelector);
  const { categories } = useAppSelector(categoriesSelector);

  const [activeSection, setActiveSection] = useState(1);
  const menuRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const endSession = () => {
    Cookies.remove('jwt');
    authActions.setUserId({ id: undefined });
    dispatch(authActions.logout());
    navigate(routeNames.AUTH);
  };

  const toggleMenu = () => {
    dispatch(viewTypeActions.menuToggle(!menuState));
    setActiveSection(1);
  };

  const isBookSectionSelected = location.pathname.includes(routeNames.BOOKS);

  const booksCounter = (category: string) => books?.filter((el) => el.categories.includes(category)).length;

  useEffect(() => {
    dispatch(viewTypeActions.menuToggle(isBookSectionSelected));
  }, [dispatch, isBookSectionSelected, burgerState]);

  const handleOutsideClick = () => {
    dispatch(viewTypeActions.burgerToggle(false));
  };

  useEffectOnce(() => {
    if (!categories.length) {
      dispatch(getCategoriesActions.startFetchingCategories());
    }
  });

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scroll({ top: 0, behavior: 'smooth' });
    }
  }, [burgerState, menuRef]);

  return (
    <React.Fragment>
      <nav
        data-test-id='burger-navigation'
        aria-hidden='true'
        ref={menuRef}
        className={classNames(styles.root, { [styles.menuOpen]: burgerState, [styles.burgerMenu]: isBurgerMenu })}
      >
        <div className={styles.menuWrapper}>
          <div className={styles.sectionWrapper}>
            <div
              data-test-id={testIds[0]}
              className={classNames(styles.link, { [styles.activePath]: activeSection === 1 })}
              onClick={toggleMenu}
              aria-hidden='true'
            >
              Витрина книг
              <div
                className={
                  menuState ? `${styles.open} ${styles.iconWrapper} ` : `${styles.iconWrapper}  ${styles.close}`
                }
              >
                {status !== ActionStatus.error && <img src={ArrowIcon} alt='toggle menu' />}
              </div>
            </div>
            <ul className={menuState ? `${styles.openList} ` : ` ${styles.closeList}`}>
              <li data-test-id={testIds[1]}>
                <NavLink to='/books/all'>Все книги</NavLink>
              </li>
              {categories &&
                categories.map((el) => (
                  <div className={styles.itemWrapper} key={el.id}>
                    <li data-test-id={`${isBurgerMenu ? 'burger' : 'navigation'}-${el.path}`}>
                      <NavLink onClick={() => setActiveSection(1)} to={`/books/${el.path}`}>
                        {el.name}
                      </NavLink>
                    </li>
                    <span
                      data-test-id={`${isBurgerMenu ? 'burger' : 'navigation'}-book-count-for-${el.path}`}
                      className={styles.bookQuantity}
                    >
                      {booksCounter(el.name)}
                    </span>
                  </div>
                ))}
            </ul>
          </div>

          <Link
            data-test-id={testIds[2]}
            onClick={() => setActiveSection(2)}
            className={classNames(styles.link, {
              [styles.activePath]: isBookSectionSelected,
              [styles.activePath]: activeSection === 2,
            })}
            to='/terms'
          >
            Правила пользования
          </Link>
          <Link
            data-test-id={testIds[3]}
            onClick={() => setActiveSection(3)}
            className={classNames(styles.link, {
              [styles.activePath]: isBookSectionSelected,
              [styles.activePath]: activeSection === 3,
            })}
            to='/contract'
          >
            Договор аферты
          </Link>
        </div>

        <hr className={styles.line} />

        <div className={styles.menuWrapper}>
          <Link className={styles.profileLink} to={routeNames.PROFILE_PAGE}>
            Профиль
          </Link>
          <button
            data-test-id={isBurgerMenu ? 'exit-button' : ''}
            type='button'
            onClick={endSession}
            className={styles.exitButton}
          >
            Выход
          </button>
        </div>
      </nav>

      {isBurgerMenu && burgerState && (
        <div aria-hidden='true' className={styles.bgLayer} onClick={handleOutsideClick} />
      )}
    </React.Fragment>
  );
};
