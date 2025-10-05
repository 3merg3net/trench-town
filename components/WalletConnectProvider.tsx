'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';

const PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'trench-town-dev';

export default function WalletConnectProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Use base-sepolia for dev by default
  const TARGET = (process.env.NEXT_PUBLIC_CHAIN || 'base-sepolia').toLowerCase();

  const chains = useMemo(
    () => (TARGET === 'base' ? [base] : [baseSepolia, base]),
    [TARGET]
  );

  const config = useMemo(
    () =>
      getDefaultConfig({
        appName: 'Trench Town',
        projectId: PROJECT_ID,
        chains,
        ssr: true,
      }),
    [chains]
  );

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#1E90FF',
            borderRadius: 'large',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}





