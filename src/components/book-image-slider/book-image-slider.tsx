import { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import CatIcon from '../../assets/images/icons/cat-icon.svg';
import { useWindowSize } from '../../hooks/use-window-size.hook';
import { Image } from '../../interfases';
import { BASE_URL } from '../../not-env';

import styles from './book-image-slider.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export type BookImageSliderProps = {
  images: Image[];
};

export const BookImageSlider = ({ images }: BookImageSliderProps) => {
  const [activeImgId, setActiveImgId] = useState<number>(0);
  const [width] = useWindowSize();
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const isSingleImg = !images || images.length < 2;

  useEffect(() => {
    if (width < 1000 && !showPagination) {
      setShowPagination(true);
    }
  }, [width, showPagination]);

  return (
    <div
      className={
        isSingleImg ? `${styles.sliderWrapper}  ${styles.singleImageSliderWrapper}` : `${styles.sliderWrapper} `
      }
    >
      <div className={styles.mainImageWrapper} data-test-id={showPagination ? '' : 'slide-big'}>
        <img
          className={`${images ? styles.mainImage : styles.mainIconImage} `}
          src={images ? `${BASE_URL}${images[activeImgId]?.url}` : CatIcon}
          alt='book-cover'
        />
      </div>

      <div className={`${styles.swiperWrapper} ${isSingleImg ? styles.hiddenSwiperWrapper : ''}`}>
        <Swiper
          scrollbar={{
            draggable: true,
          }}
          data-test-id={showPagination ? 'slide-big' : ''}
          pagination={{
            clickable: false,
          }}
          slidesPerView={5}
          spaceBetween={35}
          modules={[Pagination]}
          breakpoints={{
            300: {
              pagination: {
                clickable: true,
              },
              slidesPerView: 1,
            },
            1000: {
              pagination: {
                clickable: false,
              },
              slidesPerView: 5,
            },
          }}
        >
          {images &&
            images.map((el, index) => (
              <SwiperSlide data-test-id='slide-mini' key={el.url} onClick={() => setActiveImgId(index)}>
                <img
                  src={`${BASE_URL}${el.url}`}
                  alt='books preview'
                  className={
                    index === activeImgId ? `${styles.activeImg} swiper-slide-visible` : 'swiper-slide-visible'
                  }
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
