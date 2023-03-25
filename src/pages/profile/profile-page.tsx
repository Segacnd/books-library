import React, { ChangeEvent, useEffect } from 'react';

import defaultUserImg from '../../assets/images/default-user-avatar.svg';
import changeUserImage from '../../assets/images/icons/Change_User_Image.svg';
import { BooksSlider } from '../../components/books-slider/books-slider';
import { ChangeUserDataForm } from '../../components/forms/change-user-data-form/change-user-data-form';
import { UserBookInfo } from '../../components/user-order-info/user-book-info';
import { isDateGreaterThanToday, isDateLessThanToday, NORMALIZE_DATE } from '../../constants';
import { useEffectOnce } from '../../hooks/use-effect-once-hook';
import { ActionStatus, CardsViewType } from '../../interfases';
import { BASE_URL } from '../../not-env';
import { calendarSelector, changeAvatarSelector, currentUserSelector } from '../../redux/selectors';
import { calendarActions } from '../../redux/slices/calendar-slice';
import { changeAvatarActions } from '../../redux/slices/change-avatar-slice';
import { currentUserActions } from '../../redux/slices/current-user-slice';
import { getAllBookActions } from '../../redux/slices/get-all-books-slice';
import { getCategoriesActions } from '../../redux/slices/get-categories-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ProfileButton } from '../../ui/profile-button/profile-button';
import { BookPage } from '../book';

import styles from './profile-page.module.css';

export const EroorMessage = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <React.Fragment>
    <h4>{title}</h4>
    <p>{subtitle}</p>
  </React.Fragment>
);

export const ProfilePage = () => {
  const { user } = useAppSelector(currentUserSelector);
  const { status } = useAppSelector(changeAvatarSelector);
  const { orderStatus } = useAppSelector(calendarSelector);

  const dispatch = useAppDispatch();

  const convertedDate = user?.delivery?.dateHandedTo ? new Date(Date.parse(user?.delivery?.dateHandedTo)) : new Date();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user) {
      dispatch(changeAvatarActions.startFetchingAvatar({ file: e.target.files[0], userId: user.id }));
    }
  };

  const handleCancelOrder = (event: React.SyntheticEvent) => {
    event.stopPropagation();

    if (user?.booking.id) {
      dispatch(calendarActions.startDeleteOrderFetch({ bookingId: user.booking.id }));
    }
  };

  useEffectOnce(() => {
    dispatch(currentUserActions.startFetchingUser());
    dispatch(getCategoriesActions.startFetchingCategories());
    dispatch(getAllBookActions.startFetchingAllBooks());
  });

  useEffect(() => {
    if (status === ActionStatus.success || orderStatus) {
      dispatch(currentUserActions.startFetchingUser());
    }
  }, [dispatch, status, orderStatus]);

  return (
    <section className={styles.root}>
      <div data-test-id='profile-avatar' className={styles.uImageNameWrapper}>
        <div className={styles.imageWrapper}>
          <input type='file' onChange={handleFileChange} className={styles.hiddenInput} id='uploadFile' />
          <label className={styles.userAvatar} htmlFor='uploadFile'>
            <img
              onError={({ currentTarget }) => {
                // eslint-disable-next-line no-param-reassign
                currentTarget.onerror = null;
                // eslint-disable-next-line no-param-reassign
                currentTarget.src = defaultUserImg;
              }}
              className={user?.avatar ? styles.nonscaleImage : ''}
              src={(user?.avatar && `${BASE_URL}${user?.avatar}`) || defaultUserImg}
              alt='userImage'
            />
          </label>

          <label htmlFor='uploadFile' className={styles.changeImage}>
            <img src={changeUserImage} alt='change user avatar' />
          </label>
        </div>
        <div className={styles.uNameWrapper}>
          <p className={styles.uName}>{user?.firstName}</p>
          <p className={styles.uName}>{user?.lastName}</p>
        </div>
      </div>
      <div className={styles.changeDataWrapper}>
        <div className={styles.wrapperTitle}>
          <h4>Учетные данные</h4>
          <p>Здесь вы можете отредактировать информацию о себе</p>
        </div>
        <div className={styles.changeDataForm}>{user && <ChangeUserDataForm user={user} />}</div>
      </div>
      <UserBookInfo
        content={
          user?.booking?.book ? (
            <BookPage
              button={
                <ProfileButton
                  dataTestId='cancel-booking-button'
                  text='отменить бронь'
                  click={handleCancelOrder}
                  type='primary'
                />
              }
              viewType={CardsViewType.column}
              book={{ ...user?.booking?.book, categories: [] }}
            />
          ) : null
        }
        alertStatus={
          user?.booking?.dateOrder && isDateLessThanToday(user.booking.dateOrder)
            ? ActionStatus.error
            : ActionStatus.init
        }
        alertText={
          <EroorMessage
            title={'Дата бронирования\nкниги истекла'}
            subtitle={'через 24 часа книга будет\nдоступна всем'}
          />
        }
        title='Забронированная книга'
        subTitle='Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь'
        emptyContentText={'Забронируйте книгу\nи она отобразится'}
      />
      <UserBookInfo
        content={
          user?.delivery?.book ? (
            <BookPage
              button={<ProfileButton text={`возврат ${NORMALIZE_DATE.format(convertedDate)}`} type='disabled' />}
              viewType={CardsViewType.column}
              book={{ ...user?.delivery?.book, categories: [] }}
            />
          ) : null
        }
        alertStatus={
          user?.delivery?.dateHandedTo && !isDateGreaterThanToday(user.delivery.dateHandedTo)
            ? ActionStatus.error
            : ActionStatus.init
        }
        alertText={<EroorMessage title={'Вышел срок\nпользования книги'} subtitle='Верните книгу, пожалуйста' />}
        title='Книга которую взяли'
        subTitle='Здесь можете просмотреть информацию о книге и узнать сроки возврата'
        emptyContentText={'Прочитав книгу,\nона отобразится в истории'}
      />
      <UserBookInfo
        dataTestId='history'
        content={
          user?.history?.books ? <BooksSlider comments={user?.comments || []} books={user.history.books} /> : null
        }
        title='История'
        subTitle='Список прочитанных книг'
        emptyContentText={'Вы не читали книг\nиз нашей библиотеки'}
      />
    </section>
  );
};
