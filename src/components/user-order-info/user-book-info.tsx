import { ActionStatus, UserBookInfoTypes } from '../../interfases';

import styles from './user-book-info.module.css';

export const UserBookInfo = ({
  title,
  subTitle,
  emptyContentText,
  content,
  alertStatus,
  alertText,
  dataTestId,
}: UserBookInfoTypes) => (
  <div data-test-id={dataTestId} className={styles.root}>
    <div className={styles.titleWrapper}>
      <h4>{title}</h4>
      <p>{subTitle}</p>
    </div>
    <div className={styles.contentWrapper}>
      {content ? (
        content
      ) : (
        <div data-test-id='empty-blue-card' className={styles.emptyContentWrapper}>
          <span>{emptyContentText}</span>
        </div>
      )}
      {alertStatus === ActionStatus.error && (
        <div data-test-id='expired' className={styles.errorContentWrapper}>
          {alertText}
        </div>
      )}
    </div>
  </div>
);
