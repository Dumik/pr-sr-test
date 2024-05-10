'use client';

import { PrivateRouteProvider } from '@/modules/auth';

const Providers = ({ children }: React.PropsWithChildren) => (
  <PrivateRouteProvider>{children}</PrivateRouteProvider>
);

export default Providers;
