import { FC} from 'react'
import { Box,Container,Spinner} from '@chakra-ui/react'
import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
import {  useReadContract } from 'wagmi'
import { Abi} from 'viem';
interface ReadingContractProps {
  abi:Abi
  functionName:string
  contractAddress: any
}

const ReadingContract: FC<ReadingContractProps> = ({
  abi,
  functionName,
  contractAddress,
}) => {
const { data,error,isPending,refetch} = useReadContract({abi,address:contractAddress,functionName: functionName})

  
if (error)
    return (
      <Alert status='error'>
      <AlertIcon />
      <AlertTitle> Function!</AlertTitle>
      <AlertDescription>Error{error.shortMessage.toString()}</AlertDescription>
    </Alert>
  )

  

  return (
    <Container> 
    <Box>{isPending && <><Spinner color='red.500' />LOADING</>}</Box>
    <Box textAlign="center">Result: {data?.toString()}</Box>
     </Container>
  )
  
}

export default ReadingContract