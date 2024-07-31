'use client'


import {Box,  Input,Textarea, Container, Flex,Button,FormControl,FormLabel,Heading} from '@chakra-ui/react'
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
  const [abicontractaddress, setAbicontractaddress] = useState<string>('0x807eBe5cC02C37D3bD9d9e9f20d149024D86b200')
 
  const updateAbistring=(data: { target: { value: string; }; })=>{
    setAbierror("")
    setAbiString(data.target.value.trim())
  }

  const notify = () => toast('Here is your toast.');
  const HandleParseEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{

    
    let abiObj=JSON.parse(abiString);
   
    abiObj=abiObj.filter((element: { type: string; })=>element.type==="function")
    
    setAbiString(abiObj)
    setContractUpLoaded(true)
   
    }catch{
      setAbierror("invalid json")
    }

    }

 
const clearForm=()=>{
  setAbicontractaddress("");
  setAbiString("");
  
  refToElement.current.value = "";

  setContractUpLoaded(false);
  
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
  
  },
  onDisconnect() {
   console.log('Disconnected!')
  },
})
  return (
    <Flex as="main" role="main" direction="column" flex="1" {...props} >
      <Container border='1px' borderColor='gray.300'>
      <Box  w='100%' p={4} color='red'>
      {!iscorrectchain && <p>Wrong Network chose sepoloa</p>}  
      {isDisconnected && <p>Must connect</p>}  
      </Box>   

      <PositionHolder minH="2xl"   color='darkGrey'
      
  fontWeight='bold'
  borderRadius='md'
  bg='white'>
      <FormControl >
  {isConnected && iscorrectchain && <div>
    <Heading as='h4' size='md'>Step 1. upload contract:</Heading>

<div>
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
</div>
<div>
<FormLabel htmlFor="address">Contract Address</FormLabel>
<Input name="address" type="text" value={abicontractaddress} placeholder="0x..." disabled={contractUpLoaded}
onChange={newValue=>setAbicontractaddress(newValue.target.value)}>
</Input>
</div>
{contractUpLoaded ? <Button color='black'  onClick={clearForm}  disabled={!setContractUpLoaded}>Reload
</Button>:<div>
<Button color='black'  onClick={HandleParseEvent}  disabled={!abiString || !address}>submit
</Button>
</div>}
<>
{abiString && Array.isArray(abiString) ? <ContractUI fn={Array.isArray(abiString)} contractAbi={abiString} contractAddress={abicontractaddress}/>:null}
</>
</div>}
</FormControl>  
</PositionHolder>
</Container>
</Flex> 
  );
};