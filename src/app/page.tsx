'use client'
import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { Footer } from "./components/Layout/Footer";
import { Main } from "./components/Layout/Main";
import { Navbar } from "./components/Layout/Navbar";
export default function Home() {
  
  return (
   
      <Flex direction="column" flex="1">
        <Head>
          <title>Gary Is Vegas</title>
        </Head>
        <Navbar />
        <Main />
        <Footer />
      </Flex>
  
  );
}