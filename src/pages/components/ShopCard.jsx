import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter,Heading,Stack,StackDivider,Box,ButtonGroup,Button,Divider } from '@chakra-ui/react'
import axios from 'axios';
import {StarIcon} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const ShopCard = (props) => {
    const navi = useNavigate();
    const onNavi = (id) =>{
        // navi(`"/home/shop/${id}"`)
        console.log('id',id)
    }
    let {id,name,photo} = props;
  return (
    <>
    <Card maxW='sm' h={700} mx={4} my={4}>
  <CardBody>
    <img
    crossOrigin='anonymuos'
      src= {photo}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{name}</Heading>
      <div>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </div>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={() =>{navi("/home/shop",{state:{id:{id}}})}}>
        Visit now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        <StarIcon/>
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
    </>
  )
}

export default ShopCard