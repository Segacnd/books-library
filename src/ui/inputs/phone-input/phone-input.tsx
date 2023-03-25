import { forwardRef, SyntheticEvent, useState } from 'react';
import InputMask from 'react-input-mask';

import { IInputProps, Input } from '../text-input/input';

interface FocusEvent<T = Element> extends SyntheticEvent<T> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

export const PhoneInput = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { placeholder, inputid, fieldState, errorMessage, onFocus, ...otherProps } = props;
  const [showMask, setShowMask] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setShowMask(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <InputMask
      alwaysShowMask={showMask}
      mask='+375 (99) 999-99-99'
      maskPlaceholder='+375 (xx) xxx-xx-xx'
      onFocus={handleFocus}
      {...otherProps}
    >
      <Input
        ref={ref}
        placeholder={placeholder}
        fieldState={fieldState}
        inputid={inputid}
        errorMessage={errorMessage}
        {...otherProps}
      />
    </InputMask>
  );
});
