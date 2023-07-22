'use client'

import React from 'react'
import ForceGraph from './ForceGraphWrapper'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Header from '../Components/Header'

export default function Home() {
  const client = new ApolloClient({
    uri: 'https://sepolia.easscan.org/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <main>
        <Header></Header>
        <ForceGraph></ForceGraph>
      </main>
    </ApolloProvider>
  )
}
