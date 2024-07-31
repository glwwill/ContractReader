'use client'
import React, { FC,useState} from 'react';
import {Divider,Box,Heading,Button, Container} from "@chakra-ui/react";
import { Link,Card, CardHeader, CardBody, CardFooter,Center,FormLabel,Input,List,ListItem} from '@chakra-ui/react'
import {useTransactionReceipt,useTransaction,useWaitForTransactionReceipt, type BaseError} from 'wagmi'

import WriteFunctions from "../WriteFunctions"
import ReadFunctions from "../ReadFunctions"
interface JsonAbi{
  name:string // null | undefined
  inputs:  any[] //string |
  stateMutability: string
  }

interface ContractUIProps {
contractAddress:any
contractAbi:any
fn:any
 }

const  ContractUI: FC<ContractUIProps> = ({
  contractAddress,
  contractAbi,
  fn
 }) => {

   
  return (
  <Container>
   <Heading as='h4' size='md'>Step 2 interact with contract</Heading>
   {contractAbi.map((fn:JsonAbi  )=><Container key={fn.name}>
    
 {fn.stateMutability.toLocaleLowerCase().includes("view") ||  fn.stateMutability.toLocaleLowerCase().includes("pure")? 
  <ReadFunctions key={fn.name} fn={fn}  abi={contractAbi} contractAddress={contractAddress}/>:
 <WriteFunctions key={fn.name} fn={fn}  abi={contractAbi} contractAddress={contractAddress}/>}
  <Divider/>
  </Container>
  
   )}
    </Container>
  )
}

export default ContractUI
