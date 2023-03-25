import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import ArrowIcon from '../../assets/images/icons/arrow-up-icon.svg';
import { BookImageSlider } from '../../components/book-image-slider';
import { useEffectOnce } from '../../hooks/use-effect-once-hook';
import { ActionStatus, Category } from '../../interfases';
import {
  calendarSelector,
  categoriesSelector,
  currentUserSelector,
  oneBookSelector,
  viewerSelector,
} from '../../redux/selectors';
import { calendarActions } from '../../redux/slices/calendar-slice';
import { commentActions } from '../../redux/slices/comments-slice';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { currentUserActions } from '../../redux/slices/current-user-slice';
import { getSingleBookActions } from '../../redux/slices/get-single-book';
import { useAppSelector } from '../../redux/store';
import { OrderButton } from '../../ui/order-button/order-button';
import { ProfileButton } from '../../ui/profile-button/profile-button';
import { Raiting } from '../../ui/raiting/raiting-component';
import { Review } from '../../ui/review/review';

import styles from './single-page.module.css';

export const SinglePage = () => {
  const { bookId, category } = useParams();
  const { commentsState } = useAppSelector(viewerSelector);
  const { book } = useAppSelector(oneBookSelector);
  const { user } = useAppSelector(currentUserSelector);
  const { categories } = useAppSelector(categoriesSelector);
  const { orderStatus } = useAppSelector(calendarSelector);
  const bookIdRef = useRef(bookId);

  const dispatch = useDispatch();
  const selectedCategoryName = (): Category | undefined => {
    if (category && category === 'all') {
      return { id: 0, path: 'all', name: 'Все книги' };
    }

    return categories.find((el) => el.path === category);
  };

  const checkComment = book?.comments && book?.comments.find((el) => el.user.commentUserId === user?.id);

  const changecommentsState = () => {
    dispatch(viewTypeActions.commentToggle(!commentsState));
  };

  const commentButtonHandler = useCallback(() => {
    if (book && book.id) {
      dispatch(
        commentActions.modalToggler({
          isCommentModalOpen: true,
          selectedBook: book.id,
          commentId: checkComment?.id,
        })
      );
    }
  }, [checkComment, book, dispatch]);

  useEffect(() => {
    if (bookIdRef.current !== bookId) {
      dispatch(getSingleBookActions.startFetchingOneBook(Number(bookId)));
    }
  }, [bookId, bookIdRef, dispatch]);

  useEffectOnce(() => {
    dispatch(currentUserActions.startFetchingUser());
    dispatch(getSingleBookActions.startFetchingOneBook(Number(bookId)));
  });

  useEffect(() => {
    if (orderStatus === ActionStatus.success) {
      dispatch(getSingleBookActions.startFetchingOneBook(Number(bookId)));
      dispatch(calendarActions.resetStatus());
    }
  }, [orderStatus, dispatch, bookId]);

  return (
    <div>
      <div className={styles.crumb}>
        <Link data-test-id='breadcrumbs-link' to={`/books/${selectedCategoryName()?.path}`}>
          {selectedCategoryName()?.name}
        </Link>
        <b>/</b>
        <span data-test-id='book-name'>{book?.title || ''}</span>
      </div>

      {book && (
        <React.Fragment>
          <div className={styles.aboutWrapper}>
            <div
              className={` ${styles.image} ${styles.bookCoverWrapper} ${
                !book.images || book.images.length < 2 ? styles.withoutImageSlider : ''
              }`}
            >
              <BookImageSlider images={book.images} />
            </div>

            <h3 data-test-id='book-title' className={styles.title}>
              {book.title}
            </h3>
            <h5 className={`${styles.author} ${styles.bookAuthor}`}>
              {book.authors}, {book.issueYear}
            </h5>
            <div className={`${styles.button} ${styles.buttonWrapper}`}>
              <OrderButton
                booking={book.booking}
                delivery={book.delivery}
                userId={user?.id.toString()}
                bookId={book.id}
              />
            </div>

            <p className={`${styles.description} ${styles.bookDescription}`}>
              <span className={styles.subTitle}>О книге</span>
              {book.description}
            </p>
          </div>
          <div className={styles.additionlDetailsWrapper}>
            <h5>Рейтинг</h5>
            <hr className={styles.line} />
            <div className={styles.raitingWrapper}>
              <div className={styles.raiting}>
                {book.rating ? (
                  <React.Fragment>
                    <Raiting rating={book.rating} />
                    <span>{book.rating}</span>
                  </React.Fragment>
                ) : (
                  'еще нет оценок'
                )}
              </div>
            </div>
            <h5>Подробная информация</h5>
            <hr className={styles.line} />

            <div className={styles.detailedInfo}>
              <table>
                <tbody>
                  <tr>
                    <td>Издательство</td>
                    <td>{book.publish}</td>
                  </tr>

                  <tr>
                    <td>Год издания</td>
                    <td>{book.issueYear}</td>
                  </tr>

                  <tr>
                    <td>Страниц</td>
                    <td>{book.pages}</td>
                  </tr>

                  <tr>
                    <td>Переплёт</td>
                    <td>{book.cover}</td>
                  </tr>

                  <tr>
                    <td>Формат</td>
                    <td>{book.format}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <tbody>
                  <tr>
                    <td>Жанр</td>
                    <td>{book.categories}</td>
                  </tr>

                  <tr>
                    <td>Вес</td>
                    <td>{book.weight}г.</td>
                  </tr>

                  <tr>
                    <td>ISBN</td>
                    <td>{book.ISBN}</td>
                  </tr>

                  <tr>
                    <td>Изготовитель</td>
                    <td>{book.producer}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.reviews} data-test-id='reviews'>
              <h5>
                Отзывы <span className={styles.reviewsCount}>{book?.comments?.length || 0}</span>{' '}
                <button
                  data-test-id='button-hide-reviews'
                  onClick={changecommentsState}
                  className={
                    commentsState ? `${styles.open} ${styles.iconWrapper} ` : `${styles.iconWrapper}  ${styles.close}`
                  }
                  type='button'
                >
                  <img src={ArrowIcon} alt='arrow icon' />
                </button>
              </h5>
              <hr className={styles.line} />
              <div className={styles.reviewWrapper}>
                {commentsState &&
                  book.comments
                    ?.slice()
                    .sort(
                      (comment1, comment2) =>
                        new Date(comment2.createdAt).getTime() - new Date(comment1.createdAt).getTime()
                    )
                    .map((el) => <Review key={el.id} {...el} />)}
              </div>
            </div>

            <div data-test-id='button-rating' className={styles.buttonWrapper}>
              <ProfileButton
                dataTestId='button-rate-book'
                text={checkComment ? 'изменить оценку' : 'оценить книгу'}
                click={commentButtonHandler}
                type={checkComment ? 'secondary' : 'primary'}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
