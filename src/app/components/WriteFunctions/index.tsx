'use client'
import { Link, Text,Input, Divider, Spinner } from '@chakra-ui/react'
import {Stack, HStack, VStack } from '@chakra-ui/react'
import React, {  useState,FC} from 'react';
import { useWriteContract,useReadContract} from 'wagmi'
import {useTransactionReceipt,useTransaction,useWaitForTransactionReceipt, type BaseError} from 'wagmi'
import { Button,Card, CardHeader, CardBody, CardFooter,Heading ,Center,Box} from '@chakra-ui/react'
import { Abi, Address } from 'viem';

import WatchEvent from "../EventWatcher"

interface Elements {
  name: any
  type: string  
}


//function has arguments

interface WriteFunctionsProps {
 abi:Abi
  contractAddress:Address
  fn:any
}

const  WriteFunctions: FC<WriteFunctionsProps> = ({
  abi,
  contractAddress,
  fn
}) => {
   
  const { writeContractAsync, data: hash, writeContract , isPending,error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =useWaitForTransactionReceipt({hash})
  const {data: transactionDetails} = useTransaction({ hash: hash})
  
 const initalInputVals:any=fn.inputs.reduce((acc:any,input:any)=>({...acc,...{[input.name]:""}}),{});
 const [InputVals, setInputVals] = useState<any>('');
 //const [functionName, setFunctionName] = useState<string>('');
 //const { data,isLoading,error:dataerror,refetch } =useReadContract({abi:abi,address:contractAddress,functionName: functionName,args: [...Object.values(InputVals)]})
   

 const UpdateInputVal=(inPutName:any,newValue:any)=>{
   setInputVals({...InputVals,...{[inPutName]:newValue.target.value}})
};
   const etherscanlink:any ="https://sepolia.etherscan.io/tx/"
  
   
   const returnType = (conditionA:string) => {
    conditionA=conditionA.toLowerCase();
    
  if (conditionA.includes(']')) {
    return "text";
  } else if (conditionA.includes('uint')) {
    return "number";
  } else {
    return "text";
  }
}
 return (
    <>

<Card align='center' key={fn.name}>
<CardHeader>
    <Heading size='md'>
      {fn.name}
     
  </Heading>
  </CardHeader>
  
 {fn.inputs.map((input:Elements )=>(
  <CardBody key={fn.name}>
<text>
<Input
 colorScheme='orange' 
type={returnType(input.type)}
name={input.name}
value={InputVals[input.name]}
placeholder={input.type}
onChange={newValue=>UpdateInputVal(input.name,newValue)}
/><></>
</text>


</CardBody>
  ))}
   <CardFooter>
<VStack spacing={4} align='center'>
<Button colorScheme='orange' disabled={isPending} 
onClick={() => 
  writeContractAsync({ 
    abi,
    address: contractAddress,
    functionName: fn.name,
    args: [...Object.values(InputVals)]
})}
>
Submit
</Button>
<text>


<Box>{isConfirming && <div><Spinner color='red.500' />Waiting for confirmation...</div>}</Box>
<Box>{hash && isConfirmed && <div>Transaction confirmed.<Link href={`${etherscanlink}${hash}`}    target="_blank">etherscan</Link></div>}</Box>
<Box>{error && (
       <div>Error: {(error as BaseError).shortMessage || error.message}</div>
     )}</Box>
   </text>  
 </VStack>    
</CardFooter>
</Card>
<Divider/>
    </>
  )
}
export default WriteFunctions




