import Lottie from 'lottie-react';

import { isLoadingStatus } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

import loadingAnimation from './loaderAnimation.json';

import styles from './loader.module.css';

export const LoaderComponent = () => {
  const isLayoutLoading = useAppSelector(isLoadingStatus);

  return (
    <div data-test-id='loader' className={isLayoutLoading ? `${styles.loaderWrapper}` : `${styles.hideLoader}`}>
      <Lottie animationData={loadingAnimation} loop={true} />{' '}
    </div>
  );
};
