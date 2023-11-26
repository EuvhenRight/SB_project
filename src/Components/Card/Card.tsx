import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  HStack,
  Card,
  CardBody,
  CardFooter,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { connected } from 'process';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPostData, fetchUploadImage, Post } from '../../Redux/PostSlice';
import { AppDispatch } from '../../Redux/store';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = (props) => {
  const { post } = props;
  const styles = useMultiStyleConfig('Card', { size: 'md', variant: 'custom' });

  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const current_image = post.img_url;

  //   const fetchData = async () => {
  //     try {
  //       const imageUrl = await dispatch(fetchUploadImage(current_image));
  //       console.log(imageUrl);
  //     } catch (error) {
  //       console.error('Error fetching image:', error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, post.img_url]);

  return (
    <Card sx={styles.container}>
      <CardBody sx={styles.body}>
        <Box bg={'gray.100'} mt={-5} mx={-5} mb={5} pos={'relative'}>
          <Image
            src={`${process.env.PUBLIC_URL}/avatarLogo.png`}
            alt="card_image"
            objectFit="cover"
            height="72px"
            width="285px"
          />
          <HStack bgColor={'transparent'}>
            <Text
              color={'white'}
              textTransform={'uppercase'}
              fontSize={'xs'}
              letterSpacing={1.1}
              bg={'transparent'}
            >
              {post.created_at}
            </Text>
            <Text
              color={'white'}
              textTransform={'uppercase'}
              fontSize={'xs'}
              letterSpacing={1.1}
              bg={'transparent'}
            >
              {post.category.name}
            </Text>
          </HStack>
        </Box>
        <CardFooter sx={styles.footer}>
          <Stack spacing="1">
            <Heading
              fontSize={'24px'}
              fontWeight="bold"
              letterSpacing="0"
              lineHeight={'29px'}
            >
              {post.title}
            </Heading>
            <Text fontSize={'12px'} letterSpacing="0" lineHeight={'19px'}>
              {post.content}
            </Text>
          </Stack>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default PostCard;
