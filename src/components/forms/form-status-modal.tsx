import { IFormStatusModal } from '../../interfases';

import styles from './form-status-modal.module.css';

export const FormStatusModal = ({ title, message, buttonLabel, handleButtonClick }: IFormStatusModal) => (
  <div data-test-id='status-block' className={styles.root}>
    <h4>{title}</h4>
    <p>{message}</p>

    {buttonLabel && handleButtonClick && (
      <button className={styles.modalButton} type='button' onClick={handleButtonClick}>
        {buttonLabel}
      </button>
    )}
  </div>
);
