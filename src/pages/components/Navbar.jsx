import { Box, Flex, Spacer, Button, IconButton, useColorMode,Menu,MenuButton,Avatar,MenuList,MenuItem,MenuDivider, Center } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import './Navbar.css'
import { logOut } from "../../services/AuthenService";
import React, { useState,useEffect} from 'react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [data, setData] = useState([]);

  useEffect(() => {
    const Data = localStorage.getItem('userdata');
    if (Data) {
      setData(JSON.parse(Data));
    }
  }, []);

  return (
    <Box>
    <Flex p={4} bg="teal.500" color="white" width="100%">
      <Box>
        {/* Home Button */}
        <Button variant="ghost">Home</Button>
        {/* Shop Button */}
        <Button variant="ghost" ml={4} mr={4} >Shop</Button>
      </Box>
      <Spacer />
      <Box>
        {/* Logout Button */}
        <Button onClick={() => logOut()} variant="outline">Logout</Button>
      </Box>
      <Box ml={2} mr={50}>
        {/* Color Mode Toggle */}
        <IconButton
          aria-label="Toggle Color Mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
        </Box>
        {/* ///////ชื่อโปรไฟล์////////*/}
        <Box mr={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <div className={colorMode === "light" ? "light-mode" : "dark-mode"}>{data.name}</div>
          <div className={colorMode === "light" ? "light-mode" : "dark-mode"}>{data.role}</div>
        </Box>
      </Flex>
      </Box>
  );
};

export default Navbar;