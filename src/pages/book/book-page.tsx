import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import CatIcon from '../../assets/images/icons/cat-icon.svg';
import { BookPreview, CardsViewType } from '../../interfases';
import { BASE_URL } from '../../not-env';
import { currentUserSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import { OrderButton } from '../../ui/order-button/order-button';
import { Raiting } from '../../ui/raiting/raiting-component';

import { Higlight } from './highlight';

import styles from './book-page.module.css';

export type BookPageProps = {
  book: BookPreview;
  currentCategory?: string;
  button?: JSX.Element;
  viewType: CardsViewType;
};

export const BookPage = ({ book, currentCategory, button, viewType }: BookPageProps) => {
  const { user } = useAppSelector(currentUserSelector);

  const navigate = useNavigate();
  const bookImage = typeof book.image === 'string' ? book.image : book.image?.url;

  const goToSinglePage = (id: number) => {
    navigate(`/books/${currentCategory || 'all'}/${id}`);
  };

  return (
    <div
      data-test-id='card'
      className={viewType === CardsViewType.grid ? `${styles.bookPageSmall}` : `${styles.bookPageBig}`}
      onClick={() => {
        goToSinglePage(book.id);
      }}
      aria-hidden='true'
    >
      <div className={styles.imgWrapper}>
        <img
          className={classNames({ [styles.iconBookCover]: !bookImage })}
          src={bookImage ? `${BASE_URL}${bookImage}` : CatIcon}
          alt=''
        />
      </div>

      <div className={styles.infoWrapper}>
        <div className={`${styles.title}`}>
          <p>
            <Higlight text={book.title} />
          </p>
        </div>

        <div className={styles.author}>
          {book.authors &&
            book.authors.map((el) => (
              <span className={styles.authorName} key={el}>
                {el}
              </span>
            ))}
          <span>{book.issueYear}</span>
        </div>

        <div className={styles.raiting}>
          {book.rating ? (
            <div>
              <Raiting rating={book.rating} />
            </div>
          ) : (
            'еще нет оценок'
          )}
        </div>
        <div className={`${styles.buttonWrapper} orderButtonWrapper`}>
          {button ? (
            button
          ) : (
            <OrderButton
              booking={book.booking}
              delivery={book.delivery}
              userId={user?.id.toString()}
              bookId={book.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};
