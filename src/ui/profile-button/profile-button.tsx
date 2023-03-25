import classNames from 'classnames';

import styles from './profile-button.module.css';

export interface IProfileButtonProps {
  type: 'primary' | 'secondary' | 'disabled';
  click?: (e: React.SyntheticEvent) => void;
  text: string;
  dataTestId?: string;
}

export const ProfileButton = ({ click, text, type, dataTestId }: IProfileButtonProps) => (
  <button
    type='submit'
    data-test-id={dataTestId}
    className={classNames([styles.primary, styles[type]], { [styles.withoutAction]: !click })}
    disabled={type === 'disabled' ? true : false}
    onClick={click}
  >
    {text}
  </button>
);
