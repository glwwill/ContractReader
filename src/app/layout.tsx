
import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'


import { cookieToInitialState } from 'wagmi'

import { config } from './config'
import Web3ModalProvider from './context'
import { ChakraProvider } from '@chakra-ui/react'
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}


export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
     
      <ChakraProvider>
        <Web3ModalProvider initialState={initialState}>  {children}</Web3ModalProvider>
        </ChakraProvider>
    
      </body>
    </html>
  )
}

