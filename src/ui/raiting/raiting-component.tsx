import { useState } from 'react';

import StarActiveIcon from '../../assets/images/icons/star-active-icon.svg';
import StarIcon from '../../assets/images/icons/star-icon.svg';
import { Rating } from '../../interfases';
import { commentSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

import styles from './raiting-component.module.css';

export const Raiting = ({ rating, upRaiting }: Rating) => {
  const [ratings, setRatings] = useState<number>(rating);
  const { isCommentModalOpen } = useAppSelector(commentSelector);

  const raitinghandler = (index: number) => {
    setRatings(index);
    if (upRaiting) {
      upRaiting(index);
    }
  };

  const raitingStar = (
    <div data-test-id='rating' className={isCommentModalOpen ? styles.raitingInModal : styles.starRating}>
      {[...Array(5)].map((star, index) => {
        /* eslint-disable no-param-reassign */
        // eslint-disable react/no-array-index-key
        index += 1;

        return (
          <button
            type='button'
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => raitinghandler(index)}
          >
            <span className='star' data-test-id='star'>
              <img
                data-test-id={index <= ratings && 'star-active'}
                src={index <= ratings ? StarActiveIcon : StarIcon}
                alt='star'
              />
            </span>
          </button>
        );
      })}
    </div>
  );

  return <div className={styles.root}>{raitingStar}</div>;
};
