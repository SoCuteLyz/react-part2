import React from "react";
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
} from '@chakra-ui/react';
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <Box position={'relative'} width="100%">
      <Navbar/>
    </Box>
  )
}

export default Home