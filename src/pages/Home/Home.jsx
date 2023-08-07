import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  FormControl,
  FormErrorMessage,
  Alert,
  useToast,
  ChakraProvider,
  Center,
} from '@chakra-ui/react';
import Navbar from "../components/Navbar";
import { Wrap, WrapItem } from '@chakra-ui/react'
import ShopCard from "../components/ShopCard"
import axios from "axios";

const Home = () => {
  const [shop,setShop] = useState([{}]);

  useEffect(() => {
  axios.get('http://api_oh.udvc.ac.th/shop').then(
    response => {
      setShop(response.data.data)
    }
  )
  },[]);
  const warpItem = shop.map((item)=>
  <WrapItem key={item.id}>
    <Flex>
    <ShopCard id={item.id} name={item.name} photo={item.photo} />
    </Flex>
  </WrapItem>
  )
  return (
    <Box position={'relative'} width="100%">
      <Navbar/>
      <rightSidebar/>
      
      <Wrap>
        {warpItem}
      </Wrap>
    </Box>
  )
}

export default Home