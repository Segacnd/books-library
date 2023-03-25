import AvatarIcon from '../../assets/images/default-user-avatar.svg';
import { NORMALIZE_DATE_WITH_YEAR } from '../../constants';
import { Comment } from '../../interfases';
import { BASE_URL } from '../../not-env';
import { Raiting } from '../raiting/raiting-component';

import styles from './review.module.css';

export const Review = ({ createdAt, text, rating, user }: Comment) => {
  const convertedDate = new Date(Date.parse(createdAt.toString()));

  return (
    <div className={styles.root} data-test-id='comment-wrapper'>
      <div className={styles.title}>
        <div className={styles.imgWrapper}>
          <img src={user.avatarUrl ? `${BASE_URL}${user.avatarUrl}` : `${AvatarIcon}`} alt='' />
        </div>
        <div className={styles.userInfoWrapper}>
          <p className={styles.userName} data-test-id='comment-author'>
            {user.firstName} {user.lastName}
          </p>
          <p className={styles.date} data-test-id='comment-date'>
            {NORMALIZE_DATE_WITH_YEAR.format(convertedDate)}
          </p>
        </div>
      </div>
      <Raiting rating={rating} />

      <p className={styles.comment} data-test-id='comment-text'>
        {text}
      </p>
    </div>
  );
};
