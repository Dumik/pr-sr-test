import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Providers } from '@/modules/core';
import React from 'react';
import NoSsr from '@/modules/core/components/NoSsr';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SR App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className={inter.className}>
        <NoSsr>
          <Providers>
            <div className='d-flex flex-column justify-content-between '>{children}</div>
          </Providers>
        </NoSsr>
      </body>
    </html>
  );
}
