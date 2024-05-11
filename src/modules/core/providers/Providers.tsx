'use client';

import { PrivateRouteProvider } from '@/modules/auth';
import { CheckCircle, Info, Warning, X, XCircle } from '@phosphor-icons/react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Providers = ({ children }: React.PropsWithChildren) => (
  <PrivateRouteProvider>
    {children}
    <ToastContainer
      // eslint-disable-next-line react/no-unstable-nested-components
      icon={(type) => {
        switch (type.type) {
          case 'success':
            return <CheckCircle weight='bold' className='h-5 w-5 fill-success-600' />;
          case 'error':
            return <XCircle weight='bold' className='h-5 w-5 fill-red-600' />;
          case 'info':
            return <Info weight='bold' className='h-5 w-5 fill-neutrals-600' />;
          case 'warning':
            return <Warning weight='bold' className='h-5 w-5 fill-amber-600' />;
          default:
            return '👋';
        }
      }}
      toastClassName='bg-neutrals-800 rounded-md text-sm shadow-lg text-neutrals-50 items-center min-h-0'
      style={{
        minHeight: 0,
      }}
      position='bottom-right'
      // eslint-disable-next-line react/no-unstable-nested-components
      closeButton={() => <X weight='bold' className='h-5 w-5 fill-neutrals-300' />}
      theme='dark'
      transition={Slide}
    />
  </PrivateRouteProvider>
);

export default Providers;
