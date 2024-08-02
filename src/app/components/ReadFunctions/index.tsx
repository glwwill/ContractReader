'use client'
import { Input, Divider} from '@chakra-ui/react'
import { VStack ,Spinner} from '@chakra-ui/react'
import React, {  useState,FC} from 'react';
import { Button,Card, CardHeader, CardBody, CardFooter,Heading ,Box,Stack,StackDivider } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast';
import { Abi, Address } from 'viem';

import ReadingContractWithArgs from "../ReadingContract/ReadingContractWithArgs"
import ReadingContract from  "../ReadingContract/ReadingContract"
interface Elements {
  name: any
  type: string  
}
//whichContract arguments or no arguments
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
   
  
  
 const initalInputVals:any=fn.inputs.reduce((acc:any,input:any)=>({...acc,...{[input.name]:""}}),{});
 const [InputVals, setInputVals] = useState<any>('');
 const [functionName, setFunctionName] = useState<string>('');
 const [whichContract, setWhichContract] = useState<number>(0);

 const [functionArgs, setFunctionArgs] = useState<any>([]);
  

 const UpdateInputVal=(inPutName:any,newValue:any)=>{
   setInputVals({...InputVals,...{[inPutName]:newValue.target.value}})
};

const returnType = (conditionA:string) => {
        conditionA=conditionA.toLowerCase();
        //array return type
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

          toast.error('Must Fill In All Fields.');
          return
        }
     if(contractType==2){
      setFunctionArgs([...Object.values(InputVals)])
     }
     setWhichContract(contractType)
     setFunctionName(fname)
       
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
  <Stack divider={<StackDivider />} spacing='4'></Stack>
<text>
<Input
 colorScheme='orange' 
type={returnType(input.type)}
name={input.name}
value={InputVals[input.name]}
placeholder={input.type}
onChange={newValue=>UpdateInputVal(input.name,newValue)}
/>
</text>
</CardBody>
  ))}
   <CardFooter>
<VStack spacing={6} align='center'>
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
</CardFooter>
</Card>
<p>
</p>
<Divider/>
    </>
  )
}
export default ReadFunctions




