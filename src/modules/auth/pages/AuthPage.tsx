'use client';
import React, { useState } from 'react';
import { SignInForm, SignUpForm } from '@/auth/components';
import { ArrowLeft, CaretLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const router = useRouter();

  const [authToggle, setAuthToggle] = useState(false);

  const handleToggle = () => {
    setAuthToggle((prevAuthToggle) => !prevAuthToggle);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className='d-grid align-items-center vh-100'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6 col-xl-4'>
          <div className='container-fluid'>
            <button className='btn btn-light mb-3 d-flex align-items-center' onClick={handleGoBack}>
              <CaretLeft weight='bold' /> Back
            </button>
            <div className='card p-4 shadow-sm'>
              <h2 className='mb-4 text-center'>{authToggle ? 'Sign Up' : 'Sign In'}</h2>
              {authToggle ? <SignUpForm /> : <SignInForm />}
              <button
                type='button'
                className='btn btn-link mt-3 text-center'
                onClick={handleToggle}>
                {authToggle ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
