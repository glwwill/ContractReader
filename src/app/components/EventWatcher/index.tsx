import { FC} from 'react'
import {  Text,Button ,Box,Container,Spinner} from '@chakra-ui/react'
import {  useReadContract } from 'wagmi'
import { publicClient } from './client'
import { useWatchContractEvent } from 'wagmi'
import { Abi} from 'viem';
interface WatchEventProps {
  abi:Abi
  eventName:string
  contractAddress: any
}
// <WatchEvent abi={abi} contractAddress={contractAddress} eventName='pushed'/>
const WatchEvent: FC<WatchEventProps> = ({
  abi,
  eventName,
  contractAddress,
}) => {
  const usdcContractAddress = contractAddress
 

  
  const logs = publicClient.getContractEvents({
    address: usdcContractAddress,
    abi: abi,
    eventName: eventName, 
  })
  return (
    <> 
    <Box>{logs.toString()}</Box>
   
     </>
  )
  
}

export default WatchEvent