'use client'
import { Box, Container } from "@chakra-ui/react";
import { PositionHolder } from "./PositionHolder";

export const Footer = (props:any) => {
  return (
    <Box as="footer"  role="contentinfo" color='darkGrey'
      
    fontWeight='bold'
    borderRadius='md'
    bg='grey' {...props}>
      <Container>
        <PositionHolder minH="20">
          {" "}
         Garyisvegas.com
        </PositionHolder>
      </Container>
    </Box>
  );
};