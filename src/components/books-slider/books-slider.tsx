import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CardsViewType, CurrentUserBook, CurrentUserComment } from '../../interfases';
import { BookPage } from '../../pages/book';
import { commentActions } from '../../redux/slices/comments-slice';
import { getSingleBookActions } from '../../redux/slices/get-single-book';
import { useAppDispatch } from '../../redux/store';
import { ProfileButton } from '../../ui/profile-button/profile-button';

import styles from './book.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface IBooksSliderProps {
  books: CurrentUserBook[];
  comments: CurrentUserComment[];
}

export const BooksSlider = ({ books, comments }: IBooksSliderProps) => {
  const dispatch = useAppDispatch();

  const commentButtonHandler = (event: React.SyntheticEvent, props: { book: CurrentUserBook; commentId?: number }) => {
    const { book, commentId } = props;

    event.stopPropagation();
    dispatch(getSingleBookActions.startFetchingOneBook(book.id));

    dispatch(
      commentActions.modalToggler({
        isCommentModalOpen: true,
        selectedBook: book.id,
        commentId,
      })
    );
  };

  return (
    <div className={styles.swiperWrapper}>
      <Swiper
        scrollbar={{
          draggable: true,
        }}
        className={styles.root}
        spaceBetween={30}
        slidesPerView={4}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          300: {
            pagination: {
              clickable: true,
            },
            slidesPerView: 1,
          },
          500: {
            pagination: {
              clickable: true,
            },
            slidesPerView: 2,
          },
          760: {
            pagination: {
              clickable: true,
            },
            slidesPerView: 3,
          },
          1100: {
            pagination: {
              clickable: true,
            },
            slidesPerView: 4,
          },
        }}
      >
        {books.map((book: CurrentUserBook) => {
          const existedComment = comments.find((el) => el.bookId === book.id);

          return (
            <SwiperSlide key={book.id} data-test-id='history-slide'>
              <BookPage
                button={
                  <ProfileButton
                    dataTestId='history-review-button'
                    text={existedComment ? 'изменить оценку' : 'оставить отзыв'}
                    click={(e) => commentButtonHandler(e, { book, commentId: existedComment?.id })}
                    type={existedComment ? 'secondary' : 'primary'}
                  />
                }
                viewType={CardsViewType.grid}
                book={{ ...book, categories: [] }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
