'use client'
import React, { FC} from 'react';
import {Divider,Heading, Container} from "@chakra-ui/react";

import ReadFunctions from "../ReadFunctions"
import WriteFunctions from "../WriteFunctions"

interface JsonAbi{
  name:string 
  inputs:  any[] 
  stateMutability: string
  }

interface ContractUIProps {
contractAddress:any
contractAbi:any

 }
//<WriteFunctions key={fn.name} fn={fn}  abi={contractAbi} contractAddress={contractAddress}/>
const  ContractUI: FC<ContractUIProps> = ({
  contractAddress,
  contractAbi,
 }) => {

   
  return (
  <Container>
   <Heading as='h4' size='md'>Step 2 Interact With Contract</Heading>
   {contractAbi.map((fn:JsonAbi  )=><Container key={fn.name}>
    
 {fn.stateMutability.toLocaleLowerCase().includes("view") ||  fn.stateMutability.toLocaleLowerCase().includes("pure")? 
  <ReadFunctions key={fn.name} fn={fn}  abi={contractAbi} contractAddress={contractAddress}/>:""
 }
  <Divider/>
  </Container>
  
   )}
    </Container>
  )
}

export default ContractUI
