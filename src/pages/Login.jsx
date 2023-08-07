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
  useToast,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm,Controller  } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { LoginFX } from '../services/AuthenService';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

export default function Login() {
  const navi = useNavigate();
  const toast = useToast();

  const schema = yup
    .object().shape({
      email: yup.string().required("กรุณากรอกอีเมลล์").email("รูปแบบต้องมี @"),
      password: yup.string().required('กรุณาป้อนรหัสผ่าน').min(8, "กรุณากรอกให้ครบจำนวน 8 ตัว หรือมากกว่า ")
    });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onsubmit = async (data) => {
    try {
      const respone = await LoginFX(data);
      if (respone) {
        console.log(respone.data)
        console.log("key",respone.data.access_token)
        if (respone.data.access_token) {
          localStorage.setItem("token",JSON.stringify(respone.data.access_token))
          toast({
            title: 'Login',
            description: `อายุบัญชีของคุณ : ${respone.data.expires_in} วัน`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          })

          navi("/home");
        }
      }
      
    } catch (error) {
      console.log(error)
      toast({
          title: 'Error',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position:'bottom'
        })
    }
  }
  
  
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Senior web designers{' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, blue.400,purple.400)"
              bgClip="text">
              &
            </Text>{' '}
            Full-Stack Developers
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, blue.400,purple.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Join our team
              <Text
                as={'span'}
                bgGradient="linear(to-r, blue.400,purple.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              We’re looking for amazing engineers just like you! Become a part
              of our rockstar engineering team and skyrocket your career!
            </Text>
          </Stack>
          <Box as={'form'} mt={4} onSubmit={handleSubmit(onsubmit)} noValidate>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.email ? true : false}>
                <Input
                  {...register("email")}
                placeholder="email"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                type='email'
              />
                <FormErrorMessage>
                  {errors.email && errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={errors.password ? true : false}>
                <Input
                  {...register("password")}
                placeholder="Password "
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                type='password'
              />
                <FormErrorMessage>
                  {errors.password && errors.password?.message}
                </FormErrorMessage>
              </FormControl>
              
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, blue.400,purple.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, blue.400,purple.400)',
                boxShadow: 'xl',
              }}
              type='submit'
            >
              Login
            </Button>
            <Button
              fontFamily={'heading'}
              mt={10}
              w={'60%'}
              bgGradient="linear(to-r, blue.400,purple.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, blue.400,purple.400)',
                boxShadow: 'xl',
              }}
              onClick={()=>{navi("/")}}
            >
              Go back
              </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="126.5" cy="155" r="101.5" fill="#4299E1" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
    </Icon>
  );
};