import { SearchBar } from './search-bar';
import { SortBar } from './sort-bar';

import styles from './search-component.module.css';

export const SearchComponent = () => (
  <div className={styles.root}>
    <SearchBar />
    <SortBar />
  </div>
);
