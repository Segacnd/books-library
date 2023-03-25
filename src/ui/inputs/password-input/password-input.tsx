import React, { useState } from 'react';

import EyeCloseIcon from '../../../assets/images/icons/Eye_close.svg';
import EyeOpenIcon from '../../../assets/images/icons/Eye_open.svg';
import CorrectPassIcon from '../../../assets/images/icons/ValidePassIcon.svg';
import { IInputProps, Input } from '../text-input/input';

import styles from './password-input.module.css';

export interface IPasswordInput extends IInputProps {
  showValidCheck?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, IPasswordInput>((props, ref) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const { placeholder, fieldState, value, showValidCheck = true, ...otherProps } = props;

  const showPass = () => {
    setIsHidden((prev: boolean) => !prev);
  };

  return (
    <div className={styles.root}>
      <Input
        {...otherProps}
        value={value}
        fieldState={fieldState}
        placeholder={placeholder}
        ref={ref}
        type={isHidden ? 'password' : 'text'}
      />
      {!fieldState.invalid && fieldState.isDirty && showValidCheck && (
        <div data-test-id='checkmark' className={styles.showHideApprove}>
          <img src={CorrectPassIcon} alt='' />
        </div>
      )}
      {value && (
        <div
          data-test-id={isHidden ? 'eye-closed' : 'eye-opened'}
          onClick={showPass}
          aria-hidden='true'
          className={styles.showHidePass}
        >
          <img src={isHidden ? EyeCloseIcon : EyeOpenIcon} alt='' />
        </div>
      )}
    </div>
  );
});
