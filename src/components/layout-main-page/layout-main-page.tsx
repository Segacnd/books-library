import { Outlet } from 'react-router-dom';

import { BURGER_MENU_BREAKPOINT } from '../../constants';
import { useWindowSize } from '../../hooks/use-window-size.hook';
import { MenuComponent } from '../menu';

import styles from './layout-main-page.module.css';

export const LayoutMainPage = () => {
  const [width] = useWindowSize();

  return (
    <div className={styles.root} data-test-id='main-page'>
      {width >= BURGER_MENU_BREAKPOINT && (
        <MenuComponent
          isBurgerMenu={false}
          testIds={['navigation-showcase', 'navigation-books', 'navigation-terms', 'navigation-contract']}
        />
      )}

      <Outlet />
    </div>
  );
};
