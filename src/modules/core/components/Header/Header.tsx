'use client';

import { useRouter } from 'next/navigation';
import { CaretRight, PixLogo } from '@phosphor-icons/react';

import { AuthLocalNameTypes } from '@/modules/auth';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem(AuthLocalNameTypes.ACCESS_TOKEN);
    router.push('/auth');
  };

  return (
    <div className='navbar navbar-expand-lg bg-body-tertiary sticky-top'>
      <div className='container-fluid'>
        <Link className='navbar-brand' href='/'>
          <PixLogo size={32} />
        </Link>
        <button
          className='btn btn-link text-decoration-none d-flex align-items-center fs-6 fw-medium'
          onClick={handleLogOut}>
          Log Out <CaretRight weight='bold' />
        </button>
      </div>
    </div>
  );
};
export default Header;
