'use client'
import { HamburgerIcon } from '@chakra-ui/icons'
import {Menu,MenuButton,MenuList,MenuItem,} from '@chakra-ui/react'
import React from 'react';
import Link from 'next/link'
export const SideDrawer = () => {
  return (
    <>
    <Menu>
  <MenuButton><HamburgerIcon/></MenuButton>
  <MenuList>
    <MenuItem as='a' href='/pages/ProjectA/'>
      Link 1
    </MenuItem>
    <MenuItem as='a' href='#'>
      Link 2
    </MenuItem>
  </MenuList>
</Menu>
  </>
   
  );
};