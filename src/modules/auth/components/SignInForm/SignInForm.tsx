'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/modules/core';
import { InputSizeEnum } from '@/modules/core/ui/Input/Input';
import { Eye, EyeClosed } from '@phosphor-icons/react';
import { AuthLocalNameTypes } from '@/auth/types';
import { useRouter } from 'next/navigation';

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: SignInFormData) => {
    const accessToken = `${data.email}`;

    localStorage.setItem(AuthLocalNameTypes.ACCESS_TOKEN, accessToken);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column '>
      <div className='position-relative pb-4'>
        <Input
          type='email'
          placeholder='Email'
          //@ts-ignore
          size={InputSizeEnum.Large}
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && (
          <small className='text-danger position-absolute bottom-0'>{errors.email.message}</small>
        )}
      </div>
      <div className='position-relative pb-4 mt-1  '>
        <Input
          type={showPassword ? 'text' : 'password'}
          //@ts-ignore
          size={InputSizeEnum.Large}
          placeholder='Password'
          {...register('password', { required: 'Password is required' })}
        />
        <button
          type='button'
          className='btn btn-link position-absolute end-0 top-0'
          onClick={togglePasswordVisibility}>
          {showPassword ? <Eye className='mt-2' /> : <EyeClosed className='mt-2' />}
        </button>
        {errors.password && (
          <small className='text-danger position-absolute bottom-0'>
            {errors.password.message}
          </small>
        )}
      </div>
      <button type='submit' className='btn btn-primary btn-lg mt-1'>
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
