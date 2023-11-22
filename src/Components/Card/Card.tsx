import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  HStack,
} from '@chakra-ui/react';

export default function PostCard() {
  return (
    <Center py={5}>
      <Box
        maxW={'445px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={5}
        overflow={'hidden'}
      >
        <Box bg={'gray.100'} mt={-5} mx={-5} mb={5} pos={'relative'}>
          <Image src="./example.png" alt="Example" />
          <HStack>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              Data
            </Text>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              Category
            </Text>
          </HStack>
        </Box>
        <Stack>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            Boost your conversion rate
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
