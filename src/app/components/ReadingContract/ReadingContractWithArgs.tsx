import { FC} from 'react'
import {Box,Container,Spinner} from '@chakra-ui/react'
import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
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
      <Alert status='error'>
      <AlertIcon />
      <AlertTitle> Function!</AlertTitle>
      <AlertDescription>Error{error.shortMessage.toString()}</AlertDescription>
    </Alert>
    )

  

  return (
    <Container>
    <Box>{isPending && <Spinner color='red.500' />}</Box>
    <Box textAlign="center">Result: {data?.toString()}</Box>
     </Container>
  )
  
}

export default ReadingContractWithArgs