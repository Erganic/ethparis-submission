'use client'

import React from 'react'
import ForceGraph from './ForceGraphWrapper'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Header from '../Components/Header'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  sepolia
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export default function Home() {

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID || "" }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
  const client = new ApolloClient({
    uri: 'https://sepolia.easscan.org/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
    <ApolloProvider client={client}>
      <main>
        <Header></Header>
        <ForceGraph></ForceGraph>
      </main>
    </ApolloProvider>
    </RainbowKitProvider>
    </WagmiConfig>
  )
}
