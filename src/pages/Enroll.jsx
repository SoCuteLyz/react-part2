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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm,Controller  } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { EnrollFX } from '../services/AuthenService';

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

export default function Enroll() {
  const navi = useNavigate();
  const toast = useToast();

  const schema = yup
    .object().shape({
      name: yup.string().required("กรุณากรอกชื่อ"),
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
      const respone = await EnrollFX(data);
      if (respone) {
        console.log("register", data)
        console.log(respone.data);
        toast({
          title: 'สร้างบัญชี',
          description: respone.data.mesaage,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position:'top'
        })
      }
    } catch (error) {
      toast({
          title: 'Error',
          description: error.data.mesaage,
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
              bgGradient="linear(to-r, pink.400,purple.400,blue.400)"
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
                    bgGradient: 'linear(to-bl, pink.400,purple.400,blue.400)',
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
                bgGradient="linear(to-r, blue.400,pink.400)"
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
            {/* //ไม่ใส่ validate เพราะ chaka ใส่ฟังก์ชัน validate มาให้เลยแต่เราจะใช้ของ useForm ไม่ได้ใช้ของ chaka เราถึงไม่ใช้ validate ของform */}
            <Stack spacing={4}>
              <FormControl isInvalid={errors.name ? true : false}>
                <Input
                {...register("name")}
                placeholder="Firstname"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
                <FormErrorMessage>
                  {errors.name && errors.name?.message}

                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email ? true : false}>
                <Input
                {...register("email")}
                placeholder="firstname@lastname.io"
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
              type='submit'
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, pink.400,purple.400,blue.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, pink.400,purple.400,blue.400)',
                boxShadow: 'xl',
              }}

            >
              Submit
            </Button>
            <Button
              fontFamily={'heading'}
              mt={10}
              w={'60%'}
              bgGradient="linear(to-r, pink.400,purple.400,blue.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, pink.400,purple.400,blue.400)',
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
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

function CompExample() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Alert status='success'>
      <AlertIcon />
      <Box>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your application has been received. We will review your application
          and respond within the next 48 hours.
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  )
}