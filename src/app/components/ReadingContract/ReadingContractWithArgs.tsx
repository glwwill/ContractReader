import { FC} from 'react'
import {  Text,Button ,Box,Container,Spinner} from '@chakra-ui/react'
import {  useReadContract } from 'wagmi'
import { Abi} from 'viem';
interface ReadingContractWithArgsProps {
  abi:Abi
  functionName:string
  functionArgs:any[]
  contractAddress: any
}

const ReadingContractWithArgs: FC<ReadingContractWithArgsProps> = ({
  abi,
  functionName,
  functionArgs,
  contractAddress,
}) => {
const { data,error,isPending,refetch} = useReadContract({abi,address:contractAddress,functionName: functionName,args :functionArgs})

  
  if (error)
    return (
      <div>
      <Box><div>Error</div></Box>
     </div>
    )

  

  return (
    <>
    <Box>{isPending && <div><Spinner color='red.500' />loading</div>}</Box>
    <Box textAlign="center">Result: {data?.toString()}</Box>
     </>
  )
  
}

export default ReadingContractWithArgs