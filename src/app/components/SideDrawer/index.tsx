'use client'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import React, { MouseEvent, useState,ChangeEvent,FocusEvent} from 'react';
import Link from 'next/link'
export const SideDrawer = () => {
  return (
    <>
    <Menu>
  <MenuButton>Open menu</MenuButton>
  <MenuList>
    <MenuItem as='a' href='/pages"'>
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