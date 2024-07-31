'use client'
import { Box, Container,Flex, Spacer,Heading,ButtonGroup} from "@chakra-ui/react";
import { PositionHolder } from "./PositionHolder";
import { SideDrawer} from "../../components/SideDrawer";
export const Navbar = () => {
  return (
  <Flex  minWidth='max-content' alignItems='center' gap='2'  as="nav" role="navigation" bg="#5F6E0C">
  <Box >
    <Heading size='md'>BlockChain Reader</Heading>
    <SideDrawer/>
  </Box>
  <Spacer />
  <ButtonGroup gap='2'>
  <w3m-button />
  <w3m-network-button />
  </ButtonGroup>
</Flex>
   
  );
};