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
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link className='navbar-brand' href='/'>
          <PixLogo size={32} />
        </Link>

        <button
          className='btn btn-link text-decoration-none d-flex align-items-center '
          onClick={handleLogOut}>
          Log Out <CaretRight weight='bold' />
        </button>
      </div>
    </nav>
  );
};
export default Header;
