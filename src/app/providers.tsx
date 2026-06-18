'use client';

import { useEffect } from 'react';
import { LoginGateProvider } from '@/context/LoginGateContext.jsx';
import { EngagementProvider } from '@/context/EngagementContext.jsx';
import { WatchlistDockProvider } from '@/context/WatchlistDockContext.jsx';
import { ProductTourProvider } from '@/context/ProductTourContext.jsx';
import { initAuthSessionOnLoad } from '@/store/apiStore.js';

export function Providers({ children }) {
  useEffect(() => {
    initAuthSessionOnLoad();
  }, []);

  return (
    <LoginGateProvider>
      <EngagementProvider>
        <WatchlistDockProvider>
          <ProductTourProvider>{children}</ProductTourProvider>
        </WatchlistDockProvider>
      </EngagementProvider>
    </LoginGateProvider>
  );
}
