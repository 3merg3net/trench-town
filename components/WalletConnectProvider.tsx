'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { useMemo } from 'react'

const base = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://mainnet.base.org'] } },
  blockExplorers: { default: { name: 'BaseScan', url: 'https://basescan.org' } },
}

const baseSepolia = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://sepolia.base.org'] } },
  blockExplorers: { default: { name: 'BaseScan', url: 'https://sepolia.basescan.org' } },
}

export default function WalletConnectProvider({ children }: { children: React.ReactNode }) {
  const TARGET = (process.env.NEXT_PUBLIC_TARGET || 'base-sepolia').toLowerCase()
  const chain = useMemo(() => (TARGET === 'base' ? base : baseSepolia), [TARGET])

  const { chains, publicClient } = configureChains(
    [chain] as any,
    [jsonRpcProvider({ rpc: () => ({ http: chain.rpcUrls.default.http[0] }) })] as any
  )

  const { connectors } = getDefaultWallets({
    appName: 'Trench Town',
    projectId: 'trench-town',
    chains,
  })

  const config = createConfig({ autoConnect: true, connectors, publicClient })
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}






