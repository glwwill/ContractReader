'use client'
import { Link, Text,Input, Divider, useToast} from '@chakra-ui/react'
import {Stack, HStack, VStack ,Spinner} from '@chakra-ui/react'
import React, {  useState,FC} from 'react';
import { useWriteContract,useReadContract} from 'wagmi'
import {useTransactionReceipt,useTransaction,useWaitForTransactionReceipt, type BaseError} from 'wagmi'
import { Button,Card, CardHeader, CardBody, CardFooter,Heading ,Center,Box} from '@chakra-ui/react'
import { Abi, Address } from 'viem';

import ReadingContractWithArgs from "../ReadingContract/ReadingContractWithArgs"
import ReadingContract from  "../ReadingContract/ReadingContract"
interface Elements {
  name: any
  type: string  
}

interface ReadFunctionsProps {
 abi:Abi
  contractAddress:Address
  fn:any
}

const  ReadFunctions: FC<ReadFunctionsProps> = ({
  abi,
  contractAddress,
  fn
}) => {
   
  const toast = useToast()
  const toastIdRef = React.useRef()

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
  }
  
 const initalInputVals:any=fn.inputs.reduce((acc:any,input:any)=>({...acc,...{[input.name]:""}}),{});
 const [InputVals, setInputVals] = useState<any>('');
 const [functionName, setFunctionName] = useState<string>('');
 const [whichContract, setWhichContract] = useState<number>(0);

 const [functionArgs, setFunctionArgs] = useState<any>([]);
  

 const UpdateInputVal=(inPutName:any,newValue:any)=>{
   setInputVals({...InputVals,...{[inPutName]:newValue.target.value}})
};


  
   //
  
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

      const FetchContract = (fname:string,args:number,contractType:number) => {
        const argnumber:number=[...Object.values(InputVals)].length
        if(args!==argnumber){
          //alert("must fill in all fields")

          toast({
            title: 'Input error',
            description: "must fill in all fields.",
            status: 'warning',
            duration: 9000,
            isClosable: true,
          })
          return
        }
     if(contractType==2){
      setFunctionArgs([...Object.values(InputVals)])
     }
     setWhichContract(contractType)
     setFunctionName(fname)
     //alert([...Object.values(InputVals)])
     
      //alert(argnumber)
       
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

<text>
{fn.inputs.length==0? <>
 
 <Box textAlign="center">
  { whichContract===1? <ReadingContract  abi={abi}
  functionName={functionName}
  contractAddress={contractAddress} />
: ""}
 </Box>
 <Box textAlign="center">
  <Button colorScheme='blue' onClick={() =>FetchContract(fn.name,fn.inputs.length,1) }>  Submit</Button>
  </Box>
  </>

  :
  <>
  
  <Box textAlign="center"> 
{ whichContract===2 ? 
  <ReadingContractWithArgs  abi={abi}
  functionName={functionName}
  functionArgs={functionArgs}
  contractAddress={contractAddress} />: 
""
}
</Box>
  <Box textAlign="center">
  <Button colorScheme='blue' onClick={() =>FetchContract(fn.name,fn.inputs.length,2) }>  Submit</Button>
  </Box>
  </>
 }
</text>  
 </VStack>    
</CardFooter>
</Card>
<p>
</p>
<Divider/>
    </>
  )
}
export default ReadFunctions




