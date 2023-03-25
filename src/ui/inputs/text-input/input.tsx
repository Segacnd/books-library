import React, { SyntheticEvent, useState } from 'react';
import { FieldError } from 'react-hook-form';

import { FormHiglight } from '../../../components/forms/highlight-form';

import styles from './input.module.css';

export interface FocusEvent<T = Element> extends SyntheticEvent<T> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}
export interface IInputProps {
  disabled?: boolean;
  fieldState: { isTouched: boolean; invalid: boolean; error?: FieldError; isDirty: boolean };
  placeholder?: string;
  value?: string | number;
  inputid: string;
  type?: string;
  errorMessage?: string;
  requestErrorMessage?: string;
  infoMessage?: string;
  triggerValidation: () => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const [isNameInputActive, setIsInputActive] = useState(false);

  const {
    placeholder,
    fieldState: { invalid, error },
    errorMessage,
    infoMessage,
    triggerValidation,
    onFocus,
    onBlur,
    inputid,
    requestErrorMessage,
    disabled = false,
    ...otherProps
  } = props;

  const errorStatusTest: string[] =
    Object.entries(error?.types || [])
      .filter((entry) => entry[0] !== 'required')
      .map((i) => (Array.isArray(i[1]) ? i[1] : [i[1]]))
      .flat() || [];

  const fieldCheck = invalid && !isNameInputActive;

  const showRequiredError = !!error?.types?.required && !isNameInputActive;

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsInputActive(false);

    if (triggerValidation && inputid) {
      triggerValidation();
    }

    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsInputActive(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <React.Fragment>
      <div className={fieldCheck ? `${styles.errorBorder} ${styles.root}` : `${styles.root}`}>
        <label
          className={isNameInputActive || props.value ? `${styles.active}` : `${styles.label}`}
          htmlFor={props.inputid}
        >
          {placeholder}
        </label>
        <input
          ref={ref}
          type='text'
          autoComplete='off'
          {...otherProps}
          id={props.inputid}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={disabled}
        />
      </div>
      <div
        data-test-id='hint'
        className={fieldCheck || requestErrorMessage ? `${styles.errorMessage} ` : ' supportOrErrorText'}
      >
        {!showRequiredError && !error?.types?.notOneOf && errorMessage && errorStatusTest.length ? (
          <FormHiglight text={errorMessage} query={errorStatusTest} />
        ) : isNameInputActive && !errorMessage ? (
          ''
        ) : (
          error?.message || errorMessage || requestErrorMessage
        )}
      </div>
      {infoMessage && <p className={styles.infoMessage}>{infoMessage}</p>}
    </React.Fragment>
  );
});
