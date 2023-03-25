import { memo, useCallback, useRef, useState } from 'react';

import CloseActiveIcon from '../../assets/images/icons/close-action-active-icon.svg';
import SearchActiveIcon from '../../assets/images/icons/search-action-active-icon.svg';
import SearchIcon from '../../assets/images/icons/search-action-icon.svg';
import { searchInputActions } from '../../redux/slices/search-input-slice';
import { useAppDispatch } from '../../redux/store';

import styles from './search-bar.module.css';

export const SearchBar = memo(() => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [inFocus, setInFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchInputActions.inputValueCHanger({ query: event.target.value }));
    },
    [dispatch]
  );

  const openMenuIcon = () => {
    setInFocus(true);
    setOpen((prev) => !prev);
  };

  const inputToggle = () => {
    setOpen(false);
    setInFocus(false);
  };

  return (
    <div className={styles.root}>
      <button
        data-test-id='button-search-open'
        type='button'
        className={`${styles.inputToggler} `}
        onClick={openMenuIcon}
      >
        <img src={SearchIcon} alt='search icon' />
      </button>
      <div
        className={
          isOpen ? `${styles.searchInputWrapper} ${styles.open}` : `${styles.searchInputWrapper} ${styles.close}`
        }
      >
        <div className={`${styles.iconWrapper} ${styles.left}`}>
          <img src={inFocus ? SearchActiveIcon : SearchIcon} alt='search icon' />
        </div>

        <input
          data-test-id='input-search'
          ref={inputRef}
          className={styles.searchInput}
          type='text'
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          onChange={changeHandler}
          placeholder='Поиск книги или автора…'
        />
        {inFocus || isOpen ? (
          <div
            data-test-id='button-search-close'
            onClick={inputToggle}
            aria-hidden='true'
            className={`${styles.iconWrapper} ${styles.right}`}
          >
            <img src={CloseActiveIcon} alt='close search bar' />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
});
