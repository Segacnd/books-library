import { FormButtonTypes } from '../../interfases';

import styles from './form-button.module.css';

export const FormButton = (props: FormButtonTypes) => (
  <button
    className={props.disabled ? `${styles.disabledButton}` : `${styles.button}`}
    type='submit'
    disabled={props.disabled}
    onClick={() => props.handleStep && props.handleStep()}
  >
    {props.value}
  </button>
);
