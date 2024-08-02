'use client'
import { Box } from "@chakra-ui/react";

export const PositionHolder = (props:any) => {
  return (
    <Box
      role="presentation"
      display={"flex"}
      justifyContent={"center"}
      {...props}
    />
  );
};