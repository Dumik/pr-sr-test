'use client';

import { useRouter } from 'next/navigation';
import { CodepenLogo, SignOut, TextIndent, User } from '@phosphor-icons/react';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';

import { AuthLocalNameTypes } from '@/modules/auth';
import { Input } from '@/core/ui';
import { useBreakpoint } from '@/core/hooks';

type HeaderProps = {
  onChangeSearch: (value: string) => void;
  toggleSidebar?: () => void;
  searchValue: string;
};

const Header = ({ onChangeSearch, searchValue, toggleSidebar }: HeaderProps) => {
  const router = useRouter();
  const mobileScreen = useBreakpoint('sm');
  const smallScreen = useBreakpoint('xs');

  const handleLogOut = () => {
    localStorage.removeItem(AuthLocalNameTypes.ACCESS_TOKEN);
    router.push('/auth');
  };

  const userEmail =
    typeof window !== 'undefined'
      ? localStorage.getItem(AuthLocalNameTypes.ACCESS_TOKEN) || ''
      : '';

  return (
    <div className='navbar navbar-expand-lg bg-body-tertiary sticky-top'>
      <div className='container-fluid'>
        <div>
          {mobileScreen ? (
            <button className='btn btn-lick text-decoration-none me-2 ' onClick={toggleSidebar}>
              <TextIndent size={32} />
            </button>
          ) : null}
          <Link className='navbar-brand' href='/'>
            <CodepenLogo size={32} className='text-primary' />
          </Link>
        </div>
        {!smallScreen && (
          <div className='d-flex col-sm-6 col-md-6'>
            <Input
              type='search'
              placeholder='Search'
              className='form-control '
              aria-label='Search'
              value={searchValue}
              onChange={(e) => {
                onChangeSearch(e.target.value);
              }}
            />
          </div>
        )}
        <Dropdown>
          <Dropdown.Toggle variant='link' id='dropdown-basic' className='text-decoration-none'>
            <User size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className='px-3 pb-1 border-bottom'>{userEmail}</div>
            <Dropdown.Item onClick={handleLogOut}>
              Log Out <SignOut weight='bold' />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {smallScreen && (
        <div className='d-flex col-12 py-2 px-4'>
          <Input
            type='search'
            placeholder='Search'
            className='form-control '
            aria-label='Search'
            value={searchValue}
            onChange={(e) => {
              onChangeSearch(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
