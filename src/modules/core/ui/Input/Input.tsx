import React, { forwardRef, InputHTMLAttributes, ForwardedRef } from 'react';

export enum InputSizeEnum {
  Small = 'sm',
  Large = 'lg',
}

type InputProps = {
  size?: InputSizeEnum;
  icon?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, size, icon, ...props }, ref) => {
    const inputGroupClass = size ? `input-group-${size}` : '';
    const inputClass = size ? `form-control form-control-${size}` : 'form-control';

    return (
      <div className={`input-group ${inputGroupClass}`}>
        <input type={type} placeholder={placeholder} ref={ref} className={inputClass} {...props} />
        {icon && (
          <span className='input-group-text' id='basic-addon2'>
            {icon}
          </span>
        )}
      </div>
    );
  },
);

export default Input;
