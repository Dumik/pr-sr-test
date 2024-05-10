import React, { forwardRef, InputHTMLAttributes, ForwardedRef } from 'react';

export enum InputSizeEnum {
  Small = 'sm',
  Large = 'lg',
}

type InputProps = {
  size?: InputSizeEnum;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, size, ...props }, ref) => {
    const inputClass = size ? `form-control form-control-${size}` : 'form-control';

    return (
      <div className='form-group'>
        <input type={type} className={inputClass} placeholder={placeholder} ref={ref} {...props} />
      </div>
    );
  },
);

export default Input;
