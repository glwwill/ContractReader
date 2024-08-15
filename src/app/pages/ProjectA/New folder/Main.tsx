'use client'


import {Box,  Input,Textarea, Container, Flex,Button,FormControl,FormLabel,Heading} from '@chakra-ui/react'
import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
import { PositionHolder } from "../../../components/Layout/PositionHolder";
import React, { MouseEvent, useState,useRef} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {  useAccount} from 'wagmi'
import {useAccountEffect,useChainId} from 'wagmi'



export const Main = (props:any) => {
  const refToElement = useRef<HTMLTextAreaElement>() as any;
 

 
  const HandleParseEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
   
    
   }catch{
  
    }
}

 


  const { address, isConnecting, isDisconnected,isConnected, } = useAccount()
  const chainId = useChainId()
 
let iscorrectchain:boolean;
 if (chainId==11155111) {
  iscorrectchain =true;
 } else {
  iscorrectchain = false;
 }
 

useAccountEffect({
  onConnect(data) {
   //alert(data.address)
  
  },
  onDisconnect() {
   console.log('Disconnected!')
  },
})
  return (
    <Flex as="main" role="main" direction="column" flex="1" {...props} >
      <Container border='1px' borderColor='gray.300'>
      <Box  w='100%' p={4} color='red'>
      
      {!iscorrectchain && 
        <Alert status='error'>
  <AlertIcon />
  <AlertTitle> Wrong Network !</AlertTitle>
  <AlertDescription>Use Sepolia</AlertDescription>
</Alert>
       }  
      {isDisconnected && <Alert status='error'>
        <AlertTitle> Not Connected!</AlertTitle>
        <AlertDescription> Must Connect</AlertDescription></Alert>
        }  
      </Box>   

      <PositionHolder minH="2xl"   color='darkGrey'
      fontWeight='bold'
  borderRadius='md'
  bg='white'>
      
        
<Toaster
  toastOptions={{
    success: {
      style: {
        border: '1px solid #713200',
        background: 'green',
      },
    },
    error: {
      style: {
        border: '1px solid #713200',
        background: 'red',
      },
    },
  }}
/>
  {isConnected && iscorrectchain && <FormControl >
    <Heading as='h4' size='md'>Step 1. Upload Contract:</Heading>




</FormControl>  }

</PositionHolder>

</Container>
</Flex> 
  );
};