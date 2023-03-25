import { memo } from 'react';

import SortAscIcon from '../../assets/images/icons/icon-sort-ascending.svg';
import SortDescIcon from '../../assets/images/icons/icon-sort-descending.svg';
import { SortOrder } from '../../interfases';
import { viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './sort-bar.module.css';

export const SortBar = memo(() => {
  const dispatch = useAppDispatch();
  const { sortType } = useAppSelector(viewerSelector);

  const sortButtonHandle = () => {
    if (sortType === SortOrder.asc) {
      dispatch(viewTypeActions.sortChanger({ sortType: SortOrder.desc }));
    } else {
      dispatch(viewTypeActions.sortChanger({ sortType: SortOrder.asc }));
    }
  };

  return (
    <button data-test-id='sort-rating-button' type='button' className={styles.root} onClick={sortButtonHandle}>
      <img src={sortType === SortOrder.asc ? SortAscIcon : SortDescIcon} alt='sort icon' />
      <span className={styles.sortInput}>По рейтингу</span>
    </button>
  );
});
