'use client';

import { FC, ReactNode, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { AuthLocalNameTypes } from '../types';

type Props = {
  children: ReactNode;
};

const PrivateRouteProvider: FC<Props> = ({ children }) => {
  const accessToken =
    typeof window !== 'undefined'
      ? localStorage.getItem(AuthLocalNameTypes.ACCESS_TOKEN) || ''
      : '';

  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isUndefinedRoute = /(undefined)/.test(pathname);
  const isPublicRoute = /(api|auth|_next\/static|_next\/image|\/sign-(in|up))/.test(pathname);

  useEffect(() => {
    if (isPublicRoute && accessToken) {
      router.push('/');
      return;
    }
  }, [isPublicRoute, isHomePage, isUndefinedRoute, accessToken, pathname]);

  return children;
};

export default PrivateRouteProvider;
