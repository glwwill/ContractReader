'use client'


import {Box,  Input,Textarea, Container, Flex,Button,FormControl,FormLabel,Heading} from '@chakra-ui/react'
import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
import { PositionHolder } from "./PositionHolder";
import React, { MouseEvent, useState,useRef} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import ContractUI from "../ContractUI"
import {  useAccount} from 'wagmi'
import {useAccountEffect,useChainId} from 'wagmi'



export const Main = (props:any) => {
  const refToElement = useRef<HTMLTextAreaElement>() as any;
 
  const [abiString, setAbiString] = useState<string>('')
  const [abierror, setAbierror] = useState<string>('')
  const [contractUpLoaded, setContractUpLoaded] = useState(false)
  const [abicontractaddress, setAbicontractaddress] = useState<string>('0x4D7610e3BC2DF1e4A116494A80667C900fDA9a79')
 
  const updateAbistring=(data: { target: { value: string; }; })=>{
    setAbierror("")
    setAbiString(data.target.value.trim())
  }

 
  const HandleParseEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
   
    if(!abicontractaddress){
      toast.error('Contract Address is Empty');
      return
    }

    setAbierror("")
    let abiObj=JSON.parse(abiString);
    abiObj=abiObj.filter((element: { type: string; })=>element.type==="function")
    
    setAbiString(abiObj)
    setContractUpLoaded(true)
   }catch{
     toast.error('Invalid Json');
     setAbierror("Invalid Json")
    }
}

 
const clearForm=()=>{
  setAbicontractaddress("");
  setAbiString("");
  refToElement.current.value = "";
  setContractUpLoaded(false);
  setAbierror("")
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
        {abierror.toString()}
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
<FormLabel htmlFor="abi">ABI </FormLabel>
<Textarea 
ref={refToElement}
name="abi"
rows={11}
cols={61}
placeholder="copy paste abi of your contract"
disabled={contractUpLoaded}
onChange={updateAbistring}
></Textarea>

<FormLabel htmlFor="address">Contract Address</FormLabel>
<Input name="address" type="text" value={abicontractaddress} placeholder="0x..." disabled={contractUpLoaded}
onChange={newValue=>setAbicontractaddress(newValue.target.value)}>
</Input>

{contractUpLoaded ? <Button color='black'  onClick={clearForm}  disabled={!setContractUpLoaded}>Reload
</Button>:
<Button color='black'  onClick={HandleParseEvent}  disabled={!abiString || !address}>submit
</Button>
}
<>
{abiString && Array.isArray(abiString) ? <ContractUI fn={Array.isArray(abiString)} contractAbi={abiString} contractAddress={abicontractaddress}/>:null}
</>
</FormControl>  }

</PositionHolder>

</Container>
</Flex> 
  );
};