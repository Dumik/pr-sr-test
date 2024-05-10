'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeClosed } from '@phosphor-icons/react';

import { InputSizeEnum } from '@/modules/core/ui/Input/Input';
import { Input } from '@/modules/core';
import { AuthLocalNameTypes } from '@/auth/types';
import { useRouter } from 'next/navigation';

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = (data: SignUpFormData) => {
    const accessToken = `user-${data.email}`;

    localStorage.setItem(AuthLocalNameTypes.ACCESS_TOKEN, accessToken);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
      <div className='position-relative pb-4'>
        <Input
          type='email'
          placeholder='Enter email'
          //@ts-ignore
          size={InputSizeEnum.Large}
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && (
          <small className='text-danger position-absolute bottom-0'>{errors.email.message}</small>
        )}
      </div>
      <div className='position-relative pb-4'>
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
      <div className='position-relative pb-4'>
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          //@ts-ignore
          size={InputSizeEnum.Large}
          placeholder='Confirm Password'
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === watch('password') || 'The passwords do not match',
          })}
        />
        <button
          type='button'
          className='btn btn-link position-absolute end-0 top-0'
          onClick={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? <Eye className='mt-2' /> : <EyeClosed className='mt-2' />}
        </button>
        {errors.confirmPassword && (
          <small className='text-danger position-absolute bottom-0'>
            {errors.confirmPassword.message}
          </small>
        )}
      </div>
      <button type='submit' className='btn btn-primary btn-lg mt-1'>
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
