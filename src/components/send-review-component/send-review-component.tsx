import { useEffect, useMemo, useRef, useState } from 'react';

import closeIcon from '../../assets/images/icons/close-action-active-icon.svg';
import { CurrentUserComment, Review } from '../../interfases';
import { commentSelector, currentUserSelector, oneBookSelector } from '../../redux/selectors';
import { commentActions } from '../../redux/slices/comments-slice';
import { currentUserActions } from '../../redux/slices/current-user-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Raiting } from '../../ui/raiting/raiting-component';

import styles from './send-review-component.module.css';

export const SendReview = () => {
  const { isCommentModalOpen, selectedBook } = useAppSelector(commentSelector);
  const { user } = useAppSelector(currentUserSelector);
  const { book } = useAppSelector(oneBookSelector);

  const existedComment = useMemo(
    () => (user?.comments && book ? user.comments.find((c: CurrentUserComment) => c.bookId === book.id) : undefined),
    [user, book]
  );

  const [comment, setComment] = useState('');
  const [selectedRating, setRating] = useState(5);

  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const upRaiting = (elem: number) => {
    setRating(elem);
  };

  const textAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const closeModal = () => {
    dispatch(commentActions.modalToggler({ isCommentModalOpen: false, selectedBook: null }));
  };

  const buttonHandler = () => {
    if (user?.id && selectedBook) {
      const requestData: Review = {
        rating: selectedRating || 1,
        text: comment,
        book: selectedBook.toString(),
        user: user.id.toString(),
      };

      dispatch(commentActions.sendComment({ data: requestData }));
      setComment('');
    }
  };

  useEffect(() => {
    if (existedComment) {
      setRating(existedComment.rating);
      setComment(existedComment.text || '');
    }
  }, [existedComment]);

  useEffect(() => {
    if (isCommentModalOpen) {
      dispatch(currentUserActions.startFetchingUser());
    }
  }, [isCommentModalOpen, dispatch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && event.target instanceof HTMLElement && !menuRef.current.contains(event.target)) {
        dispatch(commentActions.modalToggler({ isCommentModalOpen: false, selectedBook: null }));
      }
    }
    if (isCommentModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, dispatch, isCommentModalOpen]);

  if (!isCommentModalOpen) {
    return null;
  }

  return (
    <div className={isCommentModalOpen ? styles.root : styles.hide} data-test-id={isCommentModalOpen && 'modal-outer'}>
      <div className={styles.reviewWrapper} ref={menuRef} data-test-id='modal-rate-book'>
        <button
          type='button'
          className={styles.closeModalButton}
          onClick={closeModal}
          data-test-id={isCommentModalOpen && 'modal-close-button'}
        >
          <img src={closeIcon} alt='close modal' />
        </button>
        <h3 data-test-id={isCommentModalOpen && 'modal-title'}>
          {existedComment ? 'Хотите изменить оценку?' : 'Оцените книгу'}
        </h3>
        <div>
          <p>Ваша оценка </p>
          <Raiting rating={selectedRating} upRaiting={upRaiting} />
        </div>
        <textarea onChange={textAreaHandler} value={comment} data-test-id='comment' placeholder='Оставить отзыв' />
        <div className={styles.buttonWrapper}>
          <button
            type='button'
            data-test-id='button-comment'
            onClick={buttonHandler}
            className={styles.sendRequestButton}
          >
            Оценить
          </button>
        </div>
      </div>
    </div>
  );
};
